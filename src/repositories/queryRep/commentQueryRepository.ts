import {CommentDtoType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {CommentModel} from "../../db/Schema/commentSchema";
import {likeStatusRepository} from "../likeStatusRepository";

export const commentQueryRepository = {
    async findCommentByUserIdAndCommentId(id: string, userId: string): Promise<CommentDtoType | null> {
        const comment = await CommentModel.findOne({id: id})
        if (!comment) return  null

        const likesCount = await likeStatusRepository.getLikesCount(id, 'Like')
        const dislikesCount = await likeStatusRepository.getDislikesCount(id, 'Dislike')
        const myStatus = await likeStatusRepository.getLikeStatus(id, userId)

        return  {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: comment.createdAt,
                likesInfo: {
                    likesCount: likesCount,
                    dislikesCount: dislikesCount,
                    myStatus: myStatus ? myStatus.type : "None"
                }
            }
    },

    async findCommentById(id: string): Promise<CommentDtoType | null> {
        const comment = await CommentModel.findOne({id: id})
        if (!comment) return  null

        const likesCount = await likeStatusRepository.getLikesCount(id, 'Like')
        const dislikesCount = await likeStatusRepository.getDislikesCount(id, 'Dislike')

        const commentDto: CommentDtoType = {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: "None"
            }
        }
        return commentDto

    },
    async findCommentsByPostId(postId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryCommentType): Promise<CommentsBusinessType | null> {
        const comment = await CommentModel.findOne({postId: postId})
        const findComments = await CommentModel.find({postId: postId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountComments = await CommentModel.find({postId: postId}).sort([[sortBy, sortDirection]]).count()
        if (comment) {
            const promise = findComments.map( async (c) => {
                const likesCount = await likeStatusRepository.getLikesCount(c.id, 'Like')
                const dislikesCount = await likeStatusRepository.getDislikesCount(c.id, 'Dislike')
                return {
                    id: c.id,
                    content: c.content,
                    userId: c.userId,
                    userLogin: c.userLogin,
                    createdAt: c.createdAt,
                    likesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: "None"
                    }
                }
            })
            const items = await Promise.all(promise)
            return {
                "pagesCount": getPagesCounts(totalCountComments, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountComments,
                "items": items
            }

        }
        return comment
    },
    async findCommentsByPostIdAndUserId(postId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryCommentType, userId: string): Promise<CommentsBusinessType | null> {
        const comment = await CommentModel.findOne({postId: postId})
        const findComments = await CommentModel.find({postId: postId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountComments = await CommentModel.find({postId: postId}).sort([[sortBy, sortDirection]]).count()
        if (comment) {
            const promis = findComments.map( async (c) => {
                const myStatus = await likeStatusRepository.getLikeStatus(c.id, userId)
                const likesCount = await likeStatusRepository.getLikesCount(c.id, 'Like')
                const dislikesCount = await likeStatusRepository.getDislikesCount(c.id, 'Dislike')
                return {
                    id: c.id,
                    content: c.content,
                    userId: c.userId,
                    userLogin: c.userLogin,
                    createdAt: c.createdAt,
                    likesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: myStatus ? myStatus.type : "None"
                    }
                }
            })
            const items = await Promise.all(promis)
            return {
                "pagesCount": getPagesCounts(totalCountComments, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountComments,
                "items": items
            }

            }
        return comment
    }
}
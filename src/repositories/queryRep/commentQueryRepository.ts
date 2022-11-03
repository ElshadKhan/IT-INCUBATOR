import {CommentDtoType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {CommentModelClass} from "../../db/Schema/commentSchema";
import {likeStatusRepository} from "../likeStatusRepository";
import {LikeStatusEnam} from "../../middleware/commentMiddleware/commentInputMiddlewares";

export const commentQueryRepository = {
    async findCommentByUserIdAndCommentId(id: string, userId?: string): Promise<CommentDtoType | null> {
        const comment = await CommentModelClass.findOne({id: id})
        if (!comment) return  null

        let myStatus = LikeStatusEnam.None

        if(userId) {
            const result = await likeStatusRepository.getLikeStatus(id, userId)
                myStatus = result?.type || LikeStatusEnam.None
        }

        const likesCount = await likeStatusRepository.getLikesCount(id, LikeStatusEnam.Like)
        const dislikesCount = await likeStatusRepository.getDislikesCount(id, LikeStatusEnam.Dislike)

        return  {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: comment.createdAt,
                likesInfo: {
                    likesCount: likesCount,
                    dislikesCount: dislikesCount,
                    myStatus: myStatus
                }
            }
    },
    async findCommentById(id: string): Promise<CommentDtoType | null> {
        return  await CommentModelClass.findOne({id: id})
    },
    async findCommentsByPostIdAndUserId(postId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryCommentType, userId: string): Promise<CommentsBusinessType | null> {
        const comment = await CommentModelClass.findOne({postId: postId})
        const findComments = await CommentModelClass.find({postId: postId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountComments = await CommentModelClass.find({postId: postId}).sort([[sortBy, sortDirection]]).count()
        if (comment) {
            const promis = findComments.map( async (c) => {
                let myStatus = LikeStatusEnam.None

                if(userId) {
                    const result = await likeStatusRepository.getLikeStatus(c.id, userId)
                    myStatus = result?.type || LikeStatusEnam.None
                }
                const likesCount = await likeStatusRepository.getLikesCount(c.id, LikeStatusEnam.Like)
                const dislikesCount = await likeStatusRepository.getDislikesCount(c.id, LikeStatusEnam.Dislike)
                return {
                    id: c.id,
                    content: c.content,
                    userId: c.userId,
                    userLogin: c.userLogin,
                    createdAt: c.createdAt,
                    likesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: myStatus
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
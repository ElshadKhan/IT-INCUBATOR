import {commentsCollection, likesCollection} from "../../db";
import {CommentDtoType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const commentQueryRepository = {
    async findCommentByUserIdAndCommentId(id: string, userId: string): Promise<CommentDtoType | null> {
        const comment = await commentsCollection.findOne({id: id})
        if (!comment) return  null

        const likesCount = await likesCollection.countDocuments({parentId: id, type: 'Like'})
        const dislikesCount = await likesCollection.countDocuments({parentId: id, type: 'Dislike'})
        const myStatus = await likesCollection.findOne({parentId: id, userId: userId})

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
        const comment = await commentsCollection.findOne({id: id})
        if (!comment) return  null

        const likesCount = await likesCollection.countDocuments({parentId: id, type: 'Like'})
        const dislikesCount = await likesCollection.countDocuments({parentId: id, type: 'Dislike'})

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
        const comment = await commentsCollection.findOne({postId: postId})
        const findComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).count()
        if (comment) {
            const promise = findComments.map( async (c) => {
                const likesCount = await likesCollection.countDocuments({parentId: c.id, type: 'Like'})
                const dislikesCount = await likesCollection.countDocuments({parentId: c.id, type: 'Dislike'})
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
        const comment = await commentsCollection.findOne({postId: postId})
        const findComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).count()
        if (comment) {
            const promis = findComments.map( async (c) => {
                const myStatus = await likesCollection.findOne({parentId: c.id, userId: userId})
                const likesCount = await likesCollection.countDocuments({parentId: c.id, type: 'Like'})
                const dislikesCount = await likesCollection.countDocuments({parentId: c.id, type: 'Dislike'})
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
import {commentsCollection, likesCollection} from "../../db";
import {CommentDtoType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {LikesTypes} from "../../types/likesTypes";

export const commentQueryRepository = {
    async findLikeDislikeById(commentId: string, userId: string): Promise<LikesTypes | null> {
        let status = await likesCollection.findOne({parentId: commentId, userId: userId})
        if (!status) return  null
        return status
    },
    async findCommentByUserIdAndCommentId(id: string, userId: string): Promise<CommentDtoType | null> {
        let comment = await commentsCollection.findOne({id: id})
        if (!comment) return  null

        const likesCount = await likesCollection.countDocuments({parentId: id, type: 'Like'})
        const dislikesCount = await likesCollection.countDocuments({parentId: id, type: 'Dislike'})
        let status = await likesCollection.findOne({parentId: id, userId: userId})

        if(!status){
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
        }

        const commentDto: CommentDtoType = {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: status!.type
            }
        }
        return commentDto

    },

    async findCommentById(id: string): Promise<CommentDtoType | null> {
        let comment = await commentsCollection.findOne({id: id})
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
            const likesCount = await likesCollection.countDocuments({parentId: comment.id, type: 'Like'})
            const dislikesCount = await likesCollection.countDocuments({parentId: comment.id, type: 'Dislike'})
            const commentDto = {
                "pagesCount": getPagesCounts(totalCountComments, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountComments,
                "items": findComments.map(c => (
                    {
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
                ))
            }
            return commentDto
        }
        return comment
    },
    async findCommentsByPostIdAndUserId(postId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryCommentType, userId: string): Promise<CommentsBusinessType | null> {
        const comment = await commentsCollection.findOne({postId: postId})
        const findComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).count()
        if (comment) {
            const likesCount = await likesCollection.countDocuments({parentId: comment.id, type: 'Like'})
            const dislikesCount = await likesCollection.countDocuments({parentId: comment.id, type: 'Dislike'})
            let status = await likesCollection.findOne({parentId: comment.id, userId: userId})
            if(!status) {
                const commentDto = {
                    "pagesCount": getPagesCounts(totalCountComments, pageSize),
                    "page": pageNumber,
                    "pageSize": pageSize,
                    "totalCount": totalCountComments,
                    "items": findComments.map(c => (
                        {
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
                    ))
                }
                return commentDto
            }
            const commentDto = {
                "pagesCount": getPagesCounts(totalCountComments, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountComments,
                "items": findComments.map(c => (
                    {
                        id: c.id,
                        content: c.content,
                        userId: c.userId,
                        userLogin: c.userLogin,
                        createdAt: c.createdAt,
                        likesInfo: {
                            likesCount: likesCount,
                            dislikesCount: dislikesCount,
                            myStatus: status!.type
                        }
                    }
                ))
            }
            return commentDto
        }
        return comment
    }
}
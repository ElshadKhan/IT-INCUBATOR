import {commentsCollection} from "../../db";
import {CommentDbType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";

export const commentQueryRepository = {
    async findCommentById(id: string): Promise<CommentDbType | null> {
        const comment = await commentsCollection.findOne({id: id});
        console.log("1")
        if (comment) {
            const commentDto: CommentDbType = {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: comment.createdAt
            }
            return commentDto
        }
        return comment
    },
    async findCommentsByPostId(postId: string, commentQueryParamsFilter: QueryCommentType): Promise<CommentsBusinessType | null> {
        const skip = commentQueryParamsFilter.pageSize * (commentQueryParamsFilter.pageNumber - 1)
        const sort = commentQueryParamsFilter.sortBy
        const limit = commentQueryParamsFilter.pageSize
        const sortDirection: any = commentQueryParamsFilter.sortDirection
        const comment = await commentsCollection.findOne({postId: postId})
        const findComments = await commentsCollection.find({postId: postId}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountComments = await commentsCollection.find({postId: postId}).sort(sort, sortDirection).count()
        if (comment) {
            const commentDto = {
                "pagesCount": (Math.ceil(totalCountComments / limit)),
                "page": commentQueryParamsFilter.pageNumber,
                "pageSize": limit,
                "totalCount": totalCountComments,
                "items": findComments.map(c => (
                    {
                        id: c.id,
                        content: c.content,
                        userId: c.userId,
                        userLogin: c.userLogin,
                        createdAt: c.createdAt
                    }
                ))
            }
            return commentDto
        }
        return comment
    }
}
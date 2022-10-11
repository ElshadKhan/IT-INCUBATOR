import {commentsCollection} from "../../db";
import {CommentDbType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const commentQueryRepository = {
    async findCommentById(id: string): Promise<CommentDbType | null> {
        const comment = await commentsCollection.findOne({id: id});
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
    async findCommentsByPostId(postId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryCommentType): Promise<CommentsBusinessType | null> {
        const comment = await commentsCollection.findOne({postId: postId})
        const findComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountComments = await commentsCollection.find({postId: postId}).sort(sortBy, sortDirection).count()
        if (comment) {
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
                        createdAt: c.createdAt
                    }
                ))
            }
            return commentDto
        }
        return comment
    }
}
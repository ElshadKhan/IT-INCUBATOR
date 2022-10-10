import {commentsCollection} from "../db";
import {CommentDbType} from "../types/commentTypes";

export const commentRepository = {
    async createComment(newComment: CommentDbType): Promise<CommentDbType> {
        await commentsCollection.insertOne(newComment)
        return newComment
    },
    async updateComment(commentId: string, content: string
    ): Promise<boolean> {
        const result = await commentsCollection.updateOne({id: commentId},
            { $set: {content: content}})
        return  result.matchedCount === 1
    },
    async deleteComment(id: string) {
        const result = await commentsCollection.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllComments() {
        await commentsCollection.deleteMany({})
        return
    }
}
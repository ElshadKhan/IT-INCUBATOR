import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {CommentModel} from "../db/Schema/commentSchema";

export const commentRepository = {
    async createComment(newComment: CommentDbType): Promise<CommentDtoType> {
        await CommentModel.create(newComment)
        return newComment
    },
    async updateComment(content: string, id: string): Promise<boolean> {
        const result = await CommentModel.updateOne({id: id}, { $set: {content: content}})
        return  result.matchedCount === 1
    },
    async deleteComment(id: string) {
        const result = await CommentModel.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllComments() {
        const result = await CommentModel.deleteMany({})
        return result.deletedCount === 1
    }
}
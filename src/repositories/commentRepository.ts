import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {CommentModelClass} from "../db/Schema/commentSchema";

class CommentRepository {
    async createComment(newComment: CommentDbType): Promise<CommentDtoType> {
        await CommentModelClass.create(newComment)
        return newComment
    }

    async updateComment(content: string, id: string): Promise<boolean> {
        const result = await CommentModelClass.updateOne({id: id}, {$set: {content: content}})
        return result.matchedCount === 1
    }

    async deleteComment(id: string) {
        const result = await CommentModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    }

    async deleteAllComments() {
        const result = await CommentModelClass.deleteMany({})
        return result.deletedCount === 1
    }
}

export const commentRepository = new CommentRepository()
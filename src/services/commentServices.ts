import {PostDbType} from "../types/postTypes";
import {commentRepository} from "../repositories/commentRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {CommentDbType} from "../types/commentTypes";

export const commentService = {
    async createComment(content: string, postId: string
    ): Promise<CommentDbType | null> {
        const post: PostDbType | null = await postQueryRepository.findPostById(postId);
        if (!post) return null
        const newComment = {
            id: String(+new Date()),
            content: content,
            userId: "id",
            userLogin: "login",
            createdAt: new Date().toISOString()
        }
        await commentRepository.createComment(newComment)
        const commentDto = {
            id: newComment.id,
            content: newComment.content,
            userId: newComment.userId,
            userLogin: newComment.userLogin,
            createdAt: newComment.createdAt
        }
        return commentDto
    },
    async updateComment(id: string, content: string
    ): Promise<boolean> {
        return await commentRepository.updateComment(id, content)
    },
    async deleteComment(id: string) {
        return await commentRepository.deleteComment(id)
    },
    async deleteAllComments() {
        return await commentRepository.deleteAllComments()
    }
}
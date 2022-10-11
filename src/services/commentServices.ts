import {PostDbType} from "../types/postTypes";
import {commentRepository} from "../repositories/commentRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {CommentDbType} from "../types/commentTypes";
import {UserDbType} from "../types/userTypes";

export const commentService = {
    async createComment(content: string, postId: string, user: UserDbType
    ): Promise<CommentDbType | null> {
        const post: PostDbType | null = await postQueryRepository.findPostById(postId);
        if (!post) return null
        const newComment = {
            id: String(+new Date()),
            content: content,
            userId: user.id,
            userLogin: user.login,
            postId: postId,
            createdAt: new Date().toISOString()
        }
        return await commentRepository.createComment(newComment)
    },
    async updateComment(commentId: string, content: string
    ): Promise<boolean> {
        return await commentRepository.updateComment(commentId, content)
    },
    async deleteComment(commentId: string) {
        return await commentRepository.deleteComment(commentId)
    },
    async deleteAllComments() {
        return await commentRepository.deleteAllComments()
    }
}
import {PostDbType} from "../types/postTypes";
import {commentRepository} from "../repositories/commentRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {UserAccountDBType} from "../types/userTypes";

export const commentService = {
    async createComment(content: string, postId: string, user: UserAccountDBType
    ): Promise<CommentDtoType | null> {
        const post: PostDbType | null = await postQueryRepository.findPostById(postId);
        if (!post) return null
        const newComment: CommentDbType = {
            id: String(+new Date()),
            content: content,
            userId: user.id,
            userLogin: user.accountData.userName,
            postId: postId,
            createdAt: new Date().toISOString(),
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None"
            }
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
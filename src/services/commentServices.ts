import {PostDbType} from "../types/postTypes";
import {commentRepository} from "../repositories/commentRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {UserAccountDBType} from "../types/userTypes";
import {commentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {LikesTypes} from "../types/likesTypes";

export const commentService = {
    async createComment(content: string, postId: string, user: UserAccountDBType): Promise<CommentDtoType | null> {
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
    async updateComment(commentId: string, content: string): Promise<boolean> {
        return await commentRepository.updateComment(commentId, content)
    },
    async updateLikeStatusComment(likeStatus: string, commentId: string, userId: string): Promise<boolean> {
        const likeDislikeStatus = await commentQueryRepository.findLikeDislikeById(commentId, userId)
        if(!likeDislikeStatus) {
            const newLikeStatus: LikesTypes = {
                parentId: commentId,
                userId: userId,
                type: likeStatus
            }
            await commentRepository.createLikeStatus(newLikeStatus)
            return true
        }
        return  await commentRepository.updateLikeStatusComment(commentId, userId, likeStatus)
    },

    async deleteComment(commentId: string) {
        return await commentRepository.deleteComment(commentId)
    },
    async deleteAllComments() {
        return await commentRepository.deleteAllComments()
    }
}
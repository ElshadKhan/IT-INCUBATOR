import {PostDbType} from "../types/postTypes";
import {CommentRepository} from "../repositories/commentRepository";
import {PostQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {UserAccountDBType} from "../types/userTypes";

export class CommentServices {
    constructor(private commentRepository = new CommentRepository(),
                private postQueryRepository = new PostQueryRepository()) {
    }
    async createComment(content: string, postId: string, user: UserAccountDBType): Promise<CommentDtoType | null> {
        const post: PostDbType | null = await this.postQueryRepository.findPostById(postId, user);
        if (!post) return null
        const comment: CommentDbType = {
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
        const newComment = await this.commentRepository.createComment(comment)
        return {
            id: newComment.id,
            content: newComment.content,
            userId: newComment.userId,
            userLogin: newComment.userLogin,
            createdAt: newComment.createdAt,
            likesInfo: {
                likesCount: newComment.likesInfo.likesCount,
                dislikesCount: newComment.likesInfo.dislikesCount,
                myStatus: newComment.likesInfo.myStatus
            }
        }
    }

    async updateComment(commentId: string, content: string): Promise<boolean> {
        return await this.commentRepository.updateComment(commentId, content)
    }

    async deleteComment(commentId: string) {
        return await this.commentRepository.deleteComment(commentId)
    }

    async deleteAllComments() {
        return await this.commentRepository.deleteAllComments()
    }
}

export const commentService = new CommentServices()
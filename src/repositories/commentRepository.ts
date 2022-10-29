import {commentsCollection, likesCollection} from "../db";
import {CommentDbType, CommentDtoType} from "../types/commentTypes";
import {LikesTypes} from "../types/likesTypes";

export const commentRepository = {
    async createComment(newComment: CommentDbType): Promise<CommentDtoType> {
        await commentsCollection.insertOne(newComment)
        const commentDto = {
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
        return commentDto
    },
    async createLikeStatus(newLikeStatus: LikesTypes): Promise<LikesTypes> {
        await likesCollection.insertOne(newLikeStatus)
        return newLikeStatus
    },
    async updateComment(content: string, id: string): Promise<boolean> {
        const result = await commentsCollection.updateOne({id: id},
            { $set: {content: content}})
        return  result.matchedCount === 1
    },
    async updateLikeStatusComment(commentId: string, userId: string, likeStatus: string): Promise<boolean> {
        const result = await likesCollection.updateOne({userId: userId, parentId: commentId},
            { $set: {type: likeStatus, createdAt: new Date().toISOString()}})
        return  result.matchedCount === 1
    },

    async deleteComment(id: string) {
        const result = await commentsCollection.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllComments() {
        await commentsCollection.deleteMany({})
    }
}
import {likesCollection} from "../db";
import {LikesTypes} from "../types/likesTypes";

export const likeStatusRepository = {
    async createLikeStatus(newLikeStatus: LikesTypes): Promise<LikesTypes> {
        await likesCollection.insertOne(newLikeStatus)
        return newLikeStatus
    },
    async updateLikeStatusComment(commentId: string, userId: string, likeStatus: string): Promise<boolean> {
        const result = await likesCollection.updateOne({userId: userId, parentId: commentId},
            { $set: {type: likeStatus, createdAt: new Date().toISOString()}})
        return  result.matchedCount === 1
    }
}
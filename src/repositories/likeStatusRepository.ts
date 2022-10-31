import {likesCollection} from "../db";
import {LikesTypes} from "../types/likesTypes";

export const likeStatusRepository = {
    async createLikeStatus(newLikeStatus: LikesTypes): Promise<LikesTypes> {
        await likesCollection.insertOne(newLikeStatus)
        return newLikeStatus
    },
    async updateLikeStatusComment(parentId: string, userId: string, likeStatus: string): Promise<boolean> {
        console.log(parentId)
        const result = await likesCollection.updateOne({userId: userId, parentId: parentId},
            { $set: {type: likeStatus, createdAt: new Date().toISOString()}})
        return  result.matchedCount === 1
    }
}
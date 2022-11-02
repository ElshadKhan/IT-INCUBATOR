import {likesCollection} from "../db";
import {LikesTypes} from "../types/likesTypes";

export const likeStatusRepository = {
    async getLikeStatus(parentId: string, userId: string): Promise<LikesTypes | null> {
        return likesCollection.findOne({parentId: parentId, userId: userId})
    },
    async getLikesCount(id: string, like: string): Promise<number> {
        return likesCollection.countDocuments({parentId: id, type: like})
    },
    async getDislikesCount(id: string, dislike: string): Promise<number> {
        return likesCollection.countDocuments({parentId: id, type: dislike})
    },
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
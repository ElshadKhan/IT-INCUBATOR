import {LikesDbTypes} from "../types/likesTypes";
import {LikeModelClass} from "../db/Schema/likeSchema";

export class LikeStatusRepository {
    async getLikeStatus(parentId: string, userId: string): Promise<LikesDbTypes | null> {
        return LikeModelClass.findOne({parentId: parentId, userId: userId})
    }
    async getLikesCount(id: string, like: string): Promise<number> {
        return LikeModelClass.countDocuments({parentId: id, type: like})
    }
    async getDislikesCount(id: string, dislike: string): Promise<number> {
        return LikeModelClass.countDocuments({parentId: id, type: dislike})
    }
    async getLastLikes(id: string, like: string): Promise<LikesDbTypes[]> {
        return LikeModelClass.find({parentId: id, type: like}).sort([["createdAt", -1]])
    }
    async createLikeStatus(newLikeStatus: LikesDbTypes): Promise<LikesDbTypes> {
        await LikeModelClass.create(newLikeStatus)
        return newLikeStatus
    }
    async updateLikeStatusComment(parentId: string, userId: string, likeStatus: string): Promise<boolean> {
        console.log(parentId)
        const result = await LikeModelClass.updateOne({userId: userId, parentId: parentId},
            { $set: {type: likeStatus, createdAt: new Date().toISOString()}})
        return  result.matchedCount === 1
    }
}


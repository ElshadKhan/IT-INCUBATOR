import {LikesTypes} from "../types/likesTypes";
import {usersCollection} from "../db";
import {likeStatusRepository} from "../repositories/likeStatusRepository";
import {likeStatusQueryRepository} from "../repositories/queryRep/likeStatusQueryRepository";

export const likeStatusService = {
    async updateLikeStatusComment(likeStatus: string, parentId: string, userId: string): Promise<boolean> {
        const likeDislikeStatus = await likeStatusQueryRepository.findLikeDislikeById(parentId, userId)
        const user = await usersCollection.findOne({id: userId})
        if(!likeDislikeStatus) {
            const newLikeStatus: LikesTypes = {
                parentId: parentId,
                userId: userId,
                login: user!.accountData.userName,
                type: likeStatus,
                createdAt: new Date().toISOString(),
            }
            await likeStatusRepository.createLikeStatus(newLikeStatus)
            return true
        }
        return  await likeStatusRepository.updateLikeStatusComment(parentId, userId, likeStatus)
    }
}
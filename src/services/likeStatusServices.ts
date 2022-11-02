import {LikesDbTypes} from "../types/likesTypes";
import {likeStatusRepository} from "../repositories/likeStatusRepository";
import {userQueryRepository} from "../repositories/queryRep/userQueryRepository";
import {LikeStatusEnam} from "../middleware/commentMiddleware/commentInputMiddlewares";

export const likeStatusService = {
    async updateLikeStatusComment(likeStatus: LikeStatusEnam, parentId: string, userId: string): Promise<boolean> {
        if(!userId) return false
        const likeDislikeStatus = await likeStatusRepository.getLikeStatus(parentId, userId)
        const user = await userQueryRepository.findOneUser(userId)
        if(!likeDislikeStatus) {
            const newLikeStatus: LikesDbTypes = {
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
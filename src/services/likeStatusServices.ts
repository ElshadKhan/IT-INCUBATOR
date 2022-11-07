import {LikesDbTypes} from "../types/likesTypes";
import {LikeStatusRepository} from "../repositories/likeStatusRepository";
import {UserQueryRepository} from "../repositories/queryRep/userQueryRepository";
import {LikeStatusEnam} from "../middleware/commentMiddleware/commentInputMiddlewares";

export class LikeStatusServices {
    constructor(private likeStatusRepository = new LikeStatusRepository(),
                private userQueryRepository = new UserQueryRepository()) {
    }
    async updateLikeStatusComment(likeStatus: LikeStatusEnam, parentId: string, userId: string): Promise<boolean> {
        if(!userId) return false
        const likeDislikeStatus = await this.likeStatusRepository.getLikeStatus(parentId, userId)
        const user = await this.userQueryRepository.findOneUser(userId)
        if(!likeDislikeStatus) {
            const newLikeStatus: LikesDbTypes = {
                parentId: parentId,
                userId: userId,
                login: user!.accountData.userName,
                type: likeStatus,
                createdAt: new Date().toISOString(),
            }
            await this.likeStatusRepository.createLikeStatus(newLikeStatus)
            return true
        }
        return  await this.likeStatusRepository.updateLikeStatusComment(parentId, userId, likeStatus)
    }
}


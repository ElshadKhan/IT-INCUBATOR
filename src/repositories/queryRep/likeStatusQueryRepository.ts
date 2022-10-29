import {likesCollection} from "../../db";
import {LikesTypes} from "../../types/likesTypes";

export const likeStatusQueryRepository = {
    async findLikeDislikeByCommentId(parentId: string, userId: string): Promise<LikesTypes | null> {
        let status = await likesCollection.findOne({parentId: parentId, userId: userId})
        if (!status) return  null
        return status
    },
    async findLikeDislikeByPostId(parentId: string, userId: string): Promise<LikesTypes | null> {
        let status = await likesCollection.findOne({parentId: parentId, userId: userId})
        if (!status) return  null
        return status
    }
}
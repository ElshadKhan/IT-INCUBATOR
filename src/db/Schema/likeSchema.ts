import mongoose from "mongoose";
import {LikesDbTypes} from "../../types/likesTypes";

const likeSchema = new mongoose.Schema<LikesDbTypes>({
    parentId: String,
    userId: String,
    login: String,
    type: String,
    createdAt: String
});

export const LikeModelClass = mongoose.model("likes-dislikes", likeSchema)

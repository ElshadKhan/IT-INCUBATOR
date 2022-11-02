import mongoose from "mongoose";
import {CommentDbType} from "../../types/commentTypes";

const commentSchema = new mongoose.Schema<CommentDbType>({
    id: String,
    content: String,
    userId: String,
    userLogin: String,
    postId: String,
    createdAt: String,
    likesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus: String
    }
});

export const CommentModelClass = mongoose.model("comments", commentSchema)

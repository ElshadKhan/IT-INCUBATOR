import mongoose from "mongoose";
import {PostDbType} from "../../types/postTypes";

const postSchema = new mongoose.Schema<PostDbType>({
    id: String,
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
    blogName: String || null,
    createdAt: String,
});

export const PostModelClass = mongoose.model("posts", postSchema)

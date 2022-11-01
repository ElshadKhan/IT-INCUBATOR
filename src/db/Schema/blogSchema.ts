import mongoose from "mongoose";
import {BlogDbType} from "../../types/blogTypes";

const blogSchema = new mongoose.Schema<BlogDbType>({
    id: String,
    name: String,
    youtubeUrl: String,
    createdAt: String,
});

export const BlogModel = mongoose.model("users", blogSchema)

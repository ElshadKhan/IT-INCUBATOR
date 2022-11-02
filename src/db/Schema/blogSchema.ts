import mongoose from "mongoose";
import {BlogDbType} from "../../types/blogTypes";

const blogSchema = new mongoose.Schema<BlogDbType>({
    id: String,
    name: {type: String, required: true},
    youtubeUrl: {type: String, required: true},
    createdAt: String,
});

export const BlogModelClass = mongoose.model("blogs", blogSchema)

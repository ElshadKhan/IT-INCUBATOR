import {BlogDbType} from "../types/blogTypes";
import {BlogModel} from "../db/Schema/blogSchema";

export const blogRepository = {
    async createBlog(newBlog: BlogDbType): Promise<BlogDbType> {
        await BlogModel.create(newBlog)
        return newBlog
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await BlogModel.updateOne({
            id:id}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return  result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await BlogModel.deleteOne({id:id})
        return  result.deletedCount === 1
    },
    async deleteAllBlogs() {
        await BlogModel.deleteMany({})
        return true
    }
}
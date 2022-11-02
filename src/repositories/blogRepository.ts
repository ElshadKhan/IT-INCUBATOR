import {BlogDbType} from "../types/blogTypes";
import {BlogModelClass} from "../db/Schema/blogSchema";

export const blogRepository = {
    async createBlog(newBlog: BlogDbType): Promise<BlogDbType> {
        await BlogModelClass.create(newBlog)
        return newBlog
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await BlogModelClass.updateOne({
            id:id}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return  result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await BlogModelClass.deleteOne({id:id})
        return  result.deletedCount === 1
    },
    async deleteAllBlogs() {
        const result = await BlogModelClass.deleteMany({})
        return result.deletedCount === 1
    }
}
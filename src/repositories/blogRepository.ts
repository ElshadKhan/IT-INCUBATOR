import {blogsCollection} from "../db";
import {BlogDbType} from "../types/blogTypes";

export const blogRepository = {
    async createBlog(newBlog: BlogDbType): Promise<BlogDbType> {
        await blogsCollection.insertOne(newBlog)
        return newBlog
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({
            id:id}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return  result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id:id})
        return  result.deletedCount === 1
    },
    async deleteAllBlogs() {
        await blogsCollection.deleteMany({})
        return
    }
}
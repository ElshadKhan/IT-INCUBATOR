import {blogRepository} from "../repositories/blogRepository";
import {BlogDbType} from "../types/blogTypes";

export const blogService = {
    async createBlog(name: string, youtubeUrl: string): Promise<BlogDbType> {
        const newBlog: BlogDbType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        return await blogRepository.createBlog(newBlog)
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await blogRepository.updateBlog(id, name, youtubeUrl)
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await blogRepository.deleteBlog(id)
    },
    async deleteAllBlogs() {
        return await blogRepository.deleteAllBlogs()
    }
}
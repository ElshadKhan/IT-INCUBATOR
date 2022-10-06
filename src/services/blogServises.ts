import {blogRepository} from "../repositories/blogRepository";
import {BlogDbType, BlogDto} from "../types/blogTypes";

export const blogService = {
    async createBlog(name: string, youtubeUrl: string): Promise<BlogDbType | BlogDto> {
        const newBlog: BlogDbType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        const createdBlog = await blogRepository.createBlog(newBlog)
        const blogDto: BlogDto = {
            id: newBlog.id,
            name: newBlog.name,
            youtubeUrl: newBlog.youtubeUrl,
            createdAt: newBlog.createdAt
        }
        return blogDto
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
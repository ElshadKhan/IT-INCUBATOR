import {ObjectId} from "mongodb";
import {blogRepository} from "../repositories/blogRepository";
import {BlogDbType, BlogDto} from "../types/blogTypes";

export const blogService = {
    async findBlogs(): Promise<BlogDto[]> {
        const blogs = await blogRepository.findBlogs()
        return blogs.map(b => (
            {
                id: b._id,
                name: b.name,
                youtubeUrl: b.youtubeUrl,
                createdAt: b.createdAt
            }
        ))
    },
    async findBlogById(id: string): Promise<BlogDto | null> {
        const findBlog = await blogRepository.findBlogById(id)
        if (findBlog) {
            const blogDto: BlogDto = {
                id: findBlog._id,
                name: findBlog.name,
                youtubeUrl: findBlog.youtubeUrl,
                createdAt: findBlog.createdAt
            }
            return blogDto
        }
        return findBlog
    },
    async createBlog(name: string, youtubeUrl: string): Promise<BlogDbType | BlogDto> {
        const newBlog: BlogDbType = {
            _id: new ObjectId(),
            id: new Date().toISOString(),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        const createdBlog = await blogRepository.createBlog(newBlog)
        const blogDto: BlogDto = {
            id: newBlog._id,
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
    async deleteAllBlog() {
        return await blogRepository.deleteAllBlog()
    }
}
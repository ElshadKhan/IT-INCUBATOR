import {BlogRepository} from "../repositories/blogRepository";
import {BlogDbType} from "../types/blogTypes";

export class BlogServices {
    private blogRepository: BlogRepository
    constructor() {
        this.blogRepository = new BlogRepository()
    }
    async createBlog(name: string, youtubeUrl: string): Promise<BlogDbType> {
        const newBlog = new BlogDbType(String(+new Date()), name, youtubeUrl, new Date().toISOString())
        return await this.blogRepository.createBlog(newBlog)
    }

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await this.blogRepository.updateBlog(id, name, youtubeUrl)
    }

    async deleteBlog(id: string): Promise<boolean> {
        return await this.blogRepository.deleteBlog(id)
    }

    async deleteAllBlogs() {
        return await this.blogRepository.deleteAllBlogs()
    }
}


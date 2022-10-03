import {ObjectId} from "mongodb";
import {blogRepository} from "../repositories/blogRepository";
import {BlogDbType, BlogDto, BlogsBusinessType, QueryBlogType} from "../types/blogTypes";

export const blogService = {
    async findBlogs(blogQueryParamsFilter: QueryBlogType): Promise<BlogsBusinessType> {
        const skip = blogQueryParamsFilter.pageSize * (blogQueryParamsFilter.pageNumber - 1)
        const sort = blogQueryParamsFilter.sortBy
        const limit = blogQueryParamsFilter.pageSize
        const sortDirection: any = blogQueryParamsFilter.sortDirection
        const searchNameTerm = blogQueryParamsFilter.searchNameTerm
        const blogs = await blogRepository.findBlogs(searchNameTerm, skip, sort, sortDirection, limit)
        const totalCountBlogs = await blogRepository.countBlogs(searchNameTerm, sort, sortDirection)
        const blogDto = {
            "pagesCount": (Math.ceil(totalCountBlogs/limit)),
            "page": blogQueryParamsFilter.pageNumber,
            "pageSize": limit,
            "totalCount": totalCountBlogs,
            "items": blogs.map(b => (
                {
                    id: b._id,
                    name: b.name,
                    youtubeUrl: b.youtubeUrl,
                    createdAt: b.createdAt
                }
            ))}
        return blogDto
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
            id: String(+new Date()),
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
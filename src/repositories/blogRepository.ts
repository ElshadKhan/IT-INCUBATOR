import {blogsCollection} from "../db";
import {ObjectId} from "mongodb";
import {BlogDbType, BlogDto} from "../types/blogTypes";

export const blogRepository = {
    async findBlogs(): Promise<BlogDbType[]> {
        const blogs = await blogsCollection.find().toArray()
        return blogs
    },
    async findBlogById(id: string): Promise<BlogDbType | null> {
        const blog: BlogDbType | null = await blogsCollection.findOne({_id: new ObjectId(id)});
        return blog
        },
    async createBlog(newBlog: BlogDbType): Promise<BlogDbType | BlogDto> {
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({
            _id: new ObjectId(id)}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return  result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return  result.deletedCount === 1
    },
    async deleteAllBlog() {
        const result = await blogsCollection.deleteMany({})
        return
    }
}
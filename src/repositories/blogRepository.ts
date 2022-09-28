import {blogsCollection} from "../db";
import {ObjectId} from "mongodb";

export type BlogDbType = {
    _id: ObjectId
    name: string
    youtubeUrl: string
    createdAt: string
}

export type BlogDto = {
    id: ObjectId
    name: string
    youtubeUrl: string
    createdAt: string
}

export const blogRepository = {
    async findBlogs(): Promise<BlogDbType[]> {
        return await blogsCollection.find({}).toArray()
    },
    async findBlogById(id: string): Promise<BlogDbType | null> {
        let blog: BlogDbType | null = await blogsCollection.findOne({_id: new ObjectId(id)});
        return blog
    },
    async createBlog(
        name: string,
        youtubeUrl: string
    ): Promise<BlogDbType | BlogDto> {
        const newBlog = {
            _id: new ObjectId(),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        const result = await blogsCollection.insertOne(newBlog)

        const blogDto: BlogDto = {
            id: newBlog._id,
            name: newBlog.name,
            youtubeUrl: newBlog.youtubeUrl,
            createdAt: newBlog.createdAt
        }

        return blogDto

    },
    async updateBlog(
        id: string,
        name: string,
        youtubeUrl: string
    ): Promise<boolean> {
        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, { $set: {name: name, youtubeUrl: youtubeUrl}})
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
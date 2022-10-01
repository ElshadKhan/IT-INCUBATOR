import {blogsCollection, postsCollection} from "../db";
import {ObjectId} from "mongodb";
import {BlogDbType} from "../types/blogTypes";
import {PostDbType} from "../types/postTypes";

export const blogRepository = {
    async findBlogs(): Promise<BlogDbType[]> {
        return await blogsCollection.find().toArray()
    },
    async findBlogById(id: string): Promise<BlogDbType | null> {
        return await blogsCollection.findOne({_id: new ObjectId(id)});
        },
    async findPostsByBlogId(blogId: string): Promise<PostDbType[]> {
        return postsCollection.find({blogId: blogId}).toArray()
        },
    async createBlog(newBlog: BlogDbType): Promise<BlogDbType> {
        await blogsCollection.insertOne(newBlog)
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
        await blogsCollection.deleteMany({})
        return
    }
}
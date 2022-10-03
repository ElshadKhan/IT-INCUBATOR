import {blogsCollection, postsCollection} from "../db";
import {ObjectId} from "mongodb";
import {BlogDbType} from "../types/blogTypes";

export const blogRepository = {
    async countBlogs(searchNameTerm: string, sort: string, sortDirection: any) {
        return await postsCollection.find({name: {$regex: searchNameTerm}}).sort(sort, sortDirection).count()
    },
    async findBlogs(searchNameTerm: string, skip: number, sort: string, sortDirection: any, limit: number): Promise<BlogDbType[]> {
        console.log()
        return await blogsCollection.find({name: {$regex: searchNameTerm}}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
    },
    async findBlogById(id: string): Promise<BlogDbType | null> {
        return await blogsCollection.findOne({_id: new ObjectId(id)});
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
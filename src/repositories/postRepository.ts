import {postsCollection} from "../db";
import {ObjectId} from "mongodb";
import {PostDbType} from "../types/postTypes";

export const postRepository = {
    async countPosts() {
        return await postsCollection.find().count()
    },
    async countPostsByBlogId(blogId: string, sort: string, sortDirection: any) {
        return await postsCollection.find({blogId: blogId}).sort(sort, sortDirection).count()
    },
    async findPosts(skip: number, sort: string, sortDirection: any, limit: number): Promise<PostDbType[]> {
        return postsCollection.find().sort(sort, sortDirection).skip(skip).limit(limit).toArray()
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        return postsCollection.findOne({_id: new ObjectId(id)});
    },
    async findPostsByBlogId(blogId: string, skip: number, sort: string, sortDirection: any, limit: number): Promise<PostDbType[]> {
        return postsCollection.find({blogId: blogId}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
    },
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        await postsCollection.insertOne(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)},
            { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return  result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return  result.deletedCount === 1
    },
    async deleteAllPosts() {
        await postsCollection.deleteMany({})
        return
    }
}
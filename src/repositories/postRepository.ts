import {postsCollection} from "../db";
import {ObjectId} from "mongodb";
import {PostDbType, PostDto} from "../types/postTypes";

export const postRepository = {
    async findPosts(): Promise<PostDbType[]> {
        const posts = await postsCollection.find().toArray()
        return posts
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        const post: PostDbType | null = await postsCollection.findOne({_id: new ObjectId(id)});
        return post
    },
    async createPost(newPost: PostDbType): Promise<PostDbType | PostDto> {
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async updatePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ): Promise<boolean> {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)},
            { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return  result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return  result.deletedCount === 1
    },
    async deleteAllPost() {
        const result = await postsCollection.deleteMany({})
        return
    }
}
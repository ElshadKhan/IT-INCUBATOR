import {postsCollection} from "../db";
import {PostDbType} from "../types/postTypes";

export const postRepository = {
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        await postsCollection.insertOne(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id},
            { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return  result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllPosts() {
        await postsCollection.deleteMany({})
        return
    }
}
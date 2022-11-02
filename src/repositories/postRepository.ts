import {PostDbType} from "../types/postTypes";
import {PostModelClass} from "../db/Schema/postSchema";

export const postRepository = {
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        await PostModelClass.create(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        const result = await PostModelClass.updateOne({id: id},
            { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return  result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await PostModelClass.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllPosts() {
        const result = await PostModelClass.deleteMany({})
        return  result.deletedCount === 1
    }
}

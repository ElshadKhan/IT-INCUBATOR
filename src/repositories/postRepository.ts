import {PostDbType} from "../types/postTypes";
import {PostModel} from "../db/Schema/postSchema";

export const postRepository = {
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        await PostModel.create(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        const result = await PostModel.updateOne({id: id},
            { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return  result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await PostModel.deleteOne({id: id})
        return  result.deletedCount === 1
    },
    async deleteAllPosts() {
        const result = await PostModel.deleteMany({})
        return  result.deletedCount === 1
    }
}

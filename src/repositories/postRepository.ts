import {blogsCollection, postsCollection} from "../db";
import {ObjectId} from "mongodb";

type BlogDbType = {
    _id: ObjectId
    name: string
    youtubeUrl: string
}
export type PostDbType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | null
    createdAt: string
}



export const postRepository = {
    async findPosts(): Promise<PostDbType[]> {
        return postsCollection.find({}).toArray()
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        let post: PostDbType | null = await postsCollection.findOne({id: new ObjectId(id), name});
        return post
    },
    async createPost(
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ): Promise<PostDbType> {
        let blog: BlogDbType | null   = await blogsCollection.findOne({_id: new ObjectId(blogId)});

        const newPost = {
            _id: new ObjectId,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: new Date().toString()
        }
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
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})

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
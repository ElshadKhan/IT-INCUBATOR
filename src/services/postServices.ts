import {ObjectId} from "mongodb";
import {PostDbType, PostDto, postRepository} from "../repositories/postRepository";
import {blogsCollection} from "../db";
import {BlogDbType} from "../repositories/blogRepository";

export const postService = {
    async findPosts(): Promise<PostDto[]> {
        const posts = await postRepository.findPosts()
        return posts.map(p => (
            {
                id: p._id,
                title: p.title,
                shortDescription: p.shortDescription,
                content: p.content,
                blogId: p.blogId,
                blogName: p.blogName,
                createdAt: p.createdAt
            }
        ))
    },
    async findPostById(id: string): Promise<PostDto | null> {
        const post: PostDbType | null = await postRepository.findPostById(id);
        if(post) {
            const postDto: PostDto = {
                id: post!._id,
                title: post!.title,
                shortDescription: post!.shortDescription,
                content: post!.content,
                blogId: post!.blogId,
                blogName: post!.blogName,
                createdAt: post!.createdAt
            }
            return postDto
        }
        return post
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDbType | PostDto> {
        const blog: BlogDbType | null   = await blogsCollection.findOne({_id: new ObjectId(blogId)});
        const newPost = {
            _id: new ObjectId,
            id: new Date().toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const result = await postRepository.createPost(newPost)

        const postDto = {
            id: newPost._id,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
        return postDto
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    },
    async deletePost(id: string) {
        return await postRepository.deletePost(id)
    },
    async deleteAllPost() {
        return await postRepository.deleteAllPost()
    }
}
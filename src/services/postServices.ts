import {postRepository} from "../repositories/postRepository";
import {PostDtoType} from "../types/postTypes";
import {BlogDbType} from "../types/blogTypes";
import {blogQueryRepository} from "../repositories/queryRep/blogQueryRepository";
import {likesCollection} from "../db";

export const postService = {
    async createPostByBlogId(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDtoType | null> {
        const blog: BlogDbType | null = await blogQueryRepository.findBlogById(blogId);
        if (!blog) return null
        const newPost = {
            id: String(+new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const newPostDto = await postRepository.createPost(newPost)
        const lastLikes = await likesCollection.find({parentId: newPostDto.id, type: 'Like'}).sort("createdAt", -1).toArray()
        return {
            id: newPostDto.id,
            title: newPostDto.title,
            shortDescription: newPostDto.shortDescription,
            content: newPostDto.content,
            blogId: newPostDto.blogId,
            blogName: blog!.name,
            createdAt: newPostDto.createdAt,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: lastLikes.slice(0,3).map(p => ({
                    addedAt: p.createdAt,
                    userId: p.userId,
                    login: p.login
                }))
            }
        }
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDtoType | null> {
        const blog: BlogDbType | null = await blogQueryRepository.findBlogById(blogId);
        if (!blog) return null
        const newPost = {
            id: String(+new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const newPostDto = await postRepository.createPost(newPost)
        const lastLikes = await likesCollection.find({parentId: newPostDto.id, type: 'Like'}).sort("createdAt", -1).toArray()
        return {
            id: newPostDto.id,
            title: newPostDto.title,
            shortDescription: newPostDto.shortDescription,
            content: newPostDto.content,
            blogId: newPostDto.blogId,
            blogName: blog!.name,
            createdAt: newPostDto.createdAt,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: lastLikes.slice(0,3).map(p => ({
                    addedAt: p.createdAt,
                    userId: p.userId,
                    login: p.login
                }))
            }
        }
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    },
    async deletePost(id: string) {
        return await postRepository.deletePost(id)
    },
    async deleteAllPosts() {
        return await postRepository.deleteAllPosts()
    }
}
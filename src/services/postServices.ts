import {postRepository} from "../repositories/postRepository";
import {PostDbType, PostDtoType} from "../types/postTypes";
import {BlogDbType} from "../types/blogTypes";
import {blogQueryRepository} from "../repositories/queryRep/blogQueryRepository";

export const postService = {
    async createPostByBlogId(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDbType | null> {
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
        return await postRepository.createPost(newPost)
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
        return {
            id: newPostDto.id,
            title: newPostDto.title,
            shortDescription: newPostDto.shortDescription,
            content: newPostDto.content,
            blogId: newPostDto.blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: [
                    {
                        addedAt: "2022-10-29T14:16:59.696Z",
                        userId: "string",
                        login: "string"
                    }
                ]
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
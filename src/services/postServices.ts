import {postRepository} from "../repositories/postRepository";
import {PostDbType} from "../types/postTypes";
import {BlogDbType} from "../types/blogTypes";
import {blogQueryRepository} from "../repositories/queryRep/blogQueryRepository";

export const postService = {
    async createPost(title: string, shortDescription: string, content: string, blogId: string
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
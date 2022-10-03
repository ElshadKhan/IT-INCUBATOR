import {ObjectId} from "mongodb";
import {postRepository} from "../repositories/postRepository";
import {PostDbType, PostDto, PostsBusinessType, QueryPostType} from "../types/postTypes";
import {BlogDbType} from "../types/blogTypes";
import {blogRepository} from "../repositories/blogRepository";

export const postService = {
    async findPosts(postQueryParamsFilter: QueryPostType): Promise<PostsBusinessType> {
        const skip = postQueryParamsFilter.pageSize * (postQueryParamsFilter.pageNumber - 1)
        const sort = postQueryParamsFilter.sortBy
        const limit = postQueryParamsFilter.pageSize
        const sortDirection: any = postQueryParamsFilter.sortDirection
        const posts = await postRepository.findPosts(skip, sort, sortDirection, limit)
        const postDto = {
            "pagesCount": (Math.ceil(posts.length/limit)),
            "page": postQueryParamsFilter.pageNumber,
            "pageSize": limit,
            "totalCount": posts.length,
            "items": posts.map(p => (
                {
                id: p._id,
                title: p.title,
                shortDescription: p.shortDescription,
                content: p.content,
                blogId: p.blogId,
                blogName: p.blogName,
                createdAt: p.createdAt
                }
        ))}
        return postDto
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
    async findPostsByBlogId(blogId: string): Promise<PostDto[] | null> {
        const findPosts = await postRepository.findPostsByBlogId(blogId)
        return findPosts.map(p => (
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
    async createPost(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDbType | PostDto> {
        const blog: BlogDbType | null = await blogRepository.findBlogById(blogId);
        const newPost = {
            _id: new ObjectId,
            id: String(+new Date()),
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
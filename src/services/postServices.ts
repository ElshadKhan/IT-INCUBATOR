import {PostRepository} from "../repositories/postRepository";
import {PostDtoType} from "../types/postTypes";
import {BlogDbType} from "../types/blogTypes";
import {BlogQueryRepository} from "../repositories/queryRep/blogQueryRepository";
import {LikeStatusRepository} from "../repositories/likeStatusRepository";
import {LikeStatusEnam} from "../middleware/commentMiddleware/commentInputMiddlewares";

export class PostServices {
    private blogQueryRepository: BlogQueryRepository
    private likeStatusRepository: LikeStatusRepository
    private postRepository: PostRepository
    constructor() {
        this.blogQueryRepository = new BlogQueryRepository()
        this.likeStatusRepository = new LikeStatusRepository()
        this.postRepository = new PostRepository()
    }
    async createPostByBlogId(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDtoType | null> {
        const blog: BlogDbType | null = await this.blogQueryRepository.findBlogById(blogId);
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
        const newPostDto = await this.postRepository.createPost(newPost)
        const lastLikes = await this.likeStatusRepository.getLastLikes(newPostDto.id, LikeStatusEnam.Like)
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
                myStatus: LikeStatusEnam.None,
                newestLikes: lastLikes.slice(0, 3).map(p => ({
                    addedAt: p.createdAt,
                    userId: p.userId,
                    login: p.login
                }))
            }
        }
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string
    ): Promise<PostDtoType | null> {
        const blog: BlogDbType | null = await this.blogQueryRepository.findBlogById(blogId);
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
        const newPostDto = await this.postRepository.createPost(newPost)
        const lastLikes = await this.likeStatusRepository.getLastLikes(newPostDto.id, LikeStatusEnam.Like)
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
                myStatus: LikeStatusEnam.None,
                newestLikes: lastLikes.slice(0, 3).map(p => ({
                    addedAt: p.createdAt,
                    userId: p.userId,
                    login: p.login
                }))
            }
        }
    }

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    ): Promise<boolean> {
        return await this.postRepository.updatePost(id, title, shortDescription, content, blogId)
    }

    async deletePost(id: string) {
        return await this.postRepository.deletePost(id)
    }

    async deleteAllPosts() {
        return await this.postRepository.deleteAllPosts()
    }
}


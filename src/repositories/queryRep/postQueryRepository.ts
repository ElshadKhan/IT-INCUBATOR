import {
    PostDbType,
    PostDtoType,
    PostsBusinessForBlogIdType,
    PostsBusinessType,
    QueryPostType
} from "../../types/postTypes";
import {BlogQueryRepository} from "./blogQueryRepository";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {LikeStatusRepository} from "../likeStatusRepository";
import {PostModelClass} from "../../db/Schema/postSchema";
import {LikeStatusEnam} from "../../middleware/commentMiddleware/commentInputMiddlewares";
import {UserAccountDBType} from "../../types/userTypes";

export class PostQueryRepository {
    private blogQueryRepository: BlogQueryRepository
    private likeStatusRepository: LikeStatusRepository
    constructor() {
        this.blogQueryRepository = new BlogQueryRepository()
        this.likeStatusRepository = new LikeStatusRepository()
    }
    async findPosts({
                        pageNumber,
                        pageSize,
                        sortBy,
                        sortDirection
                    }: QueryPostType, user?: UserAccountDBType): Promise<PostsBusinessType> {
        const posts = await PostModelClass.find().sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber, pageSize)).limit(pageSize).lean()
        const totalCountPosts = await PostModelClass.find().count()
        if (posts) {
            const promise = posts.map(async (post: PostDbType) => {
                let myStatus = LikeStatusEnam.None

                if (user) {
                    const result = await this.likeStatusRepository.getLikeStatus(post.id, user.id)
                    myStatus = result?.type || LikeStatusEnam.None
                }
                const likesCount = await this.likeStatusRepository.getLikesCount(post.id, LikeStatusEnam.Like)
                const dislikesCount = await this.likeStatusRepository.getDislikesCount(post.id, LikeStatusEnam.Dislike)
                const lastLikes = await this.likeStatusRepository.getLastLikes(post.id, LikeStatusEnam.Like)
                return {
                    id: post!.id,
                    title: post!.title,
                    shortDescription: post!.shortDescription,
                    content: post!.content,
                    blogId: post!.blogId,
                    blogName: post!.blogName,
                    createdAt: post!.createdAt,
                    extendedLikesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: myStatus,
                        newestLikes: lastLikes.slice(0, 3).map(p => ({
                            addedAt: p.createdAt,
                            userId: p.userId,
                            login: p.login
                        }))
                    }
                }
            })
            const items = await Promise.all(promise)
            return {
                "pagesCount": getPagesCounts(totalCountPosts, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountPosts,
                "items": items
            }
        }
        return posts
    }

    async findPostById(id: string, user?: UserAccountDBType): Promise<PostDtoType | null> {
        const post: PostDbType | null = await PostModelClass.findOne({id: id});
        if (post) {
            let myStatus = LikeStatusEnam.None

            if (user) {
                const result = await this.likeStatusRepository.getLikeStatus(post.id, user.id)
                myStatus = result?.type || LikeStatusEnam.None
            }
            const likesCount = await this.likeStatusRepository.getLikesCount(post.id, LikeStatusEnam.Like)
            const dislikesCount = await this.likeStatusRepository.getDislikesCount(post.id, LikeStatusEnam.Dislike)
            const lastLikes = await this.likeStatusRepository.getLastLikes(post.id, LikeStatusEnam.Like)
            return {
                id: post!.id,
                title: post!.title,
                shortDescription: post!.shortDescription,
                content: post!.content,
                blogId: post!.blogId,
                blogName: post!.blogName,
                createdAt: post!.createdAt,
                extendedLikesInfo: {
                    likesCount: likesCount,
                    dislikesCount: dislikesCount,
                    myStatus: myStatus,
                    newestLikes: lastLikes.slice(0, 3).map(p => ({
                        addedAt: p.createdAt,
                        userId: p.userId,
                        login: p.login
                    }))
                }
            }
        }
        return post
    }

    async findPostsByBlogId(blogId: string, {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    }: QueryPostType, user?: UserAccountDBType): Promise<PostsBusinessForBlogIdType | null> {
        const blog = await this.blogQueryRepository.findBlogById(blogId);
        const findPosts = await PostModelClass.find({blogId: blogId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber, pageSize)).limit(pageSize).lean()
        const totalCountPosts = await PostModelClass.find({blogId: blogId}).sort([[sortBy, sortDirection]]).count()
        if (blog) {
            const promise = findPosts.map(async (post: PostDbType) => {
                let myStatus = LikeStatusEnam.None

                if (user) {
                    const result = await this.likeStatusRepository.getLikeStatus(post.id, user.id)
                    myStatus = result?.type || LikeStatusEnam.None
                }
                const likesCount = await this.likeStatusRepository.getLikesCount(post.id, LikeStatusEnam.Like)
                const dislikesCount = await this.likeStatusRepository.getDislikesCount(post.id, LikeStatusEnam.Dislike)
                const lastLikes = await this.likeStatusRepository.getLastLikes(post.id, LikeStatusEnam.Like)
                return {
                    id: post!.id,
                    title: post!.title,
                    shortDescription: post!.shortDescription,
                    content: post!.content,
                    blogId: post!.blogId,
                    blogName: post!.blogName,
                    createdAt: post!.createdAt,
                    extendedLikesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: myStatus,
                        newestLikes: lastLikes.slice(0, 3).map(p => ({
                            addedAt: p.createdAt,
                            userId: p.userId,
                            login: p.login
                        }))
                    }
                }
            })
            const items = await Promise.all(promise)
            return {
                "pagesCount": getPagesCounts(totalCountPosts, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountPosts,
                "items": items
            }
        }
        return blog
    }
}


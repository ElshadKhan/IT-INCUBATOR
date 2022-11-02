import {
    PostDbType,
    PostDtoType,
    PostsBusinessForBlogIdType,
    PostsBusinessType,
    QueryPostType
} from "../../types/postTypes";
import {blogQueryRepository} from "./blogQueryRepository";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {likeStatusRepository} from "../likeStatusRepository";
import {PostModel} from "../../db/Schema/postSchema";

export const postQueryRepository = {
    async findPosts({pageNumber, pageSize, sortBy, sortDirection}: QueryPostType, userId: string): Promise<PostsBusinessType> {
        const posts = await PostModel.find().sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountPosts = await PostModel.find().count()
        if (posts) {
        const promise = posts.map( async (post: PostDbType) => {
            const myStatus = await likeStatusRepository.getLikeStatus(post.id, userId)
            const likesCount = await likeStatusRepository.getLikesCount(post.id, 'Like')
            const dislikesCount = await likeStatusRepository.getDislikesCount(post.id, 'Dislike')
            const lastLikes = await likeStatusRepository.getLastLikes(post.id, 'Like')
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
                    myStatus: myStatus ? myStatus.type : "None",
                    newestLikes: lastLikes.slice(0,3).map(p => ({
                            addedAt: p.createdAt,
                            userId: p.userId,
                            login: p.login
                    }))
            }
        }})
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
    },
    async findPostById(id: string, userId: string): Promise<PostDtoType | null> {
        const post: PostDbType | null = await PostModel.findOne({id: id});
        if (post) {
            const myStatus = await likeStatusRepository.getLikeStatus(post.id, userId)
            const likesCount = await likeStatusRepository.getLikesCount(post.id, 'Like')
            const dislikesCount = await likeStatusRepository.getDislikesCount(post.id, 'Dislike')
            const lastLikes = await likeStatusRepository.getLastLikes(post.id, 'Like')
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
                    myStatus: myStatus ? myStatus.type : "None",
                    newestLikes: lastLikes.slice(0,3).map(p => ({
                        addedAt: p.createdAt,
                        userId: p.userId,
                        login: p.login
                    }))
                }
            }
        }
        return post
    },
    async findPostsByBlogId(blogId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryPostType, userId: string): Promise<PostsBusinessForBlogIdType | null> {
        const blog = await blogQueryRepository.findBlogById(blogId);
        const findPosts = await PostModel.find({blogId: blogId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountPosts = await PostModel.find({blogId: blogId}).sort([[sortBy, sortDirection]]).count()
        if (blog) {
            const promise = findPosts.map( async (post: PostDbType) => {
                const myStatus = await likeStatusRepository.getLikeStatus(post.id, userId)
                const likesCount = await likeStatusRepository.getLikesCount(post.id, 'Like')
                const dislikesCount = await likeStatusRepository.getDislikesCount(post.id, 'Dislike')
                const lastLikes = await likeStatusRepository.getLastLikes(post.id, 'Like')
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
                        myStatus: myStatus ? myStatus.type : "None",
                        newestLikes: lastLikes.slice(0,3).map(p => ({
                            addedAt: p.createdAt,
                            userId: p.userId,
                            login: p.login
                        }))
                    }
                }})
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

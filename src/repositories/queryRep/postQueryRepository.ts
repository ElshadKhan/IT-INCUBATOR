import {
    PostDbType,
    PostDtoType,
    PostsBusinessForBlogIdType,
    PostsBusinessType,
    QueryPostType
} from "../../types/postTypes";
import {blogQueryRepository} from "./blogQueryRepository";
import {likesCollection, postsCollection} from "../../db";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const postQueryRepository = {
    async findPosts({pageNumber, pageSize, sortBy, sortDirection}: QueryPostType, userId: string): Promise<PostsBusinessType> {
        const posts = await postsCollection.find().sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountPosts = await postsCollection.find().count()
        if (posts) {
        const promise = posts.map( async (post) => {
            const myLikeStatus = await likesCollection.findOne({parentId: post.id, userId: userId})
            const likesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Like'})
            const dislikesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Dislike'})
            const lastLikes = await likesCollection.find({parentId: post.id, type: 'Like'}).sort("createdAt", -1).toArray()
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
                    myStatus: myLikeStatus ? myLikeStatus.type : "None",
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
        const post: PostDbType | null = await postsCollection.findOne({id: id});
        if (post) {
            const myLikeStatus = await likesCollection.findOne({parentId: post.id, userId: userId})
            const likesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Like'})
            const dislikesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Dislike'})
            const lastLikes = await likesCollection.find({parentId: post.id, type: 'Like'}).sort("createdAt", -1).toArray()
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
                    myStatus: myLikeStatus ? myLikeStatus.type : "None",
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
    async findPostsByBlogId(blogId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryPostType): Promise<PostsBusinessForBlogIdType | null> {
        const blog = await blogQueryRepository.findBlogById(blogId);
        const findPosts = await postsCollection.find({blogId: blogId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountPosts = await postsCollection.find({blogId: blogId}).sort(sortBy, sortDirection).count()
        if (blog) {
            const postDto = {
                "pagesCount": getPagesCounts(totalCountPosts, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountPosts,
                "items": findPosts.map(p => (
                    {
                        id: p.id,
                        title: p.title,
                        shortDescription: p.shortDescription,
                        content: p.content,
                        blogId: p.blogId,
                        blogName: p.blogName,
                        createdAt: p.createdAt
                    }
                ))
            }
            return postDto
        }
        return blog
    }
}

import {PostDbType, PostsBusinessType, QueryPostType} from "../../types/postTypes";
import {blogQueryRepository} from "./blogQueryRepository";
import {likesCollection, postsCollection} from "../../db";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const postQueryRepository = {
    async findPosts({pageNumber, pageSize, sortBy, sortDirection}: QueryPostType, userId: string): Promise<PostsBusinessType> {
        const posts = await postsCollection.find().sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountPosts = await postsCollection.find().count()
        if (posts) {
        const promise = posts.map( async (post) => {
            const myStatus = await likesCollection.findOne({parentId: post.id, userId: userId})
            const likesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Like'})
            const dislikesCount = await likesCollection.countDocuments({parentId: post.id, type: 'Dislike'})
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
                    newestLikes: [
                        {
                            addedAt: "2022-10-29T14:16:59.696Z",
                            userId: "string",
                            login: "string"
                        }
                    ]
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
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        const post: PostDbType | null = await postsCollection.findOne({id: id});
        if (post) {
            const postDto: PostDbType = {
                id: post!.id,
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
    async findPostsByBlogId(blogId: string, {pageNumber, pageSize, sortBy, sortDirection}: QueryPostType): Promise<PostsBusinessType | null> {
        const post = await blogQueryRepository.findBlogById(blogId);
        const findPosts = await postsCollection.find({blogId: blogId}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountPosts = await postsCollection.find({blogId: blogId}).sort(sortBy, sortDirection).count()
        if (post) {
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
        return post
    }
}
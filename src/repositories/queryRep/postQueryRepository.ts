import {PostDbType, PostsBusinessType, QueryPostType} from "../../types/postTypes";
import {blogQueryRepository} from "./blogQueryRepository";
import {postsCollection} from "../../db";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const postQueryRepository = {
    async findPosts({pageNumber, pageSize, sortBy, sortDirection}: QueryPostType): Promise<PostsBusinessType> {
        const posts = await postsCollection.find().sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountPosts = await postsCollection.find().count()
        const postDto = {
            "pagesCount": getPagesCounts(totalCountPosts, pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCountPosts,
            "items": posts.map(p => (
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
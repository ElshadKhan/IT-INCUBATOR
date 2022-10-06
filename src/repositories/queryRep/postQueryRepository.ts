import {PostDbType, PostDto, PostsBusinessType, QueryPostType} from "../../types/postTypes";
import {blogQueryRepository} from "./blogQueryRepository";
import {postsCollection} from "../../db";

export const postQueryRepository = {
    async findPosts(postQueryParamsFilter: QueryPostType): Promise<PostsBusinessType> {
        const skip = postQueryParamsFilter.pageSize * (postQueryParamsFilter.pageNumber - 1)
        const sort = postQueryParamsFilter.sortBy
        const limit = postQueryParamsFilter.pageSize
        const sortDirection: any = postQueryParamsFilter.sortDirection
        const posts = await postsCollection.find().sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountPosts = await postsCollection.find().count()
        const postDto = {
            "pagesCount": (Math.ceil(totalCountPosts / limit)),
            "page": postQueryParamsFilter.pageNumber,
            "pageSize": limit,
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
    async findPostById(id: string): Promise<PostDto | null> {
        const post: PostDbType | null = await postsCollection.findOne({id: id});
        if (post) {
            const postDto: PostDto = {
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
    async findPostsByBlogId(blogId: string, postQueryParamsFilter: QueryPostType): Promise<PostsBusinessType | null> {
        const skip = postQueryParamsFilter.pageSize * (postQueryParamsFilter.pageNumber - 1)
        const sort = postQueryParamsFilter.sortBy
        const limit = postQueryParamsFilter.pageSize
        const sortDirection: any = postQueryParamsFilter.sortDirection
        const post = await blogQueryRepository.findBlogById(blogId);
        const findPosts = await postsCollection.find({blogId: blogId}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountPosts = await postsCollection.find({blogId: blogId}).sort(sort, sortDirection).count()
        if (post) {
            const postDto = {
                "pagesCount": (Math.ceil(totalCountPosts / limit)),
                "page": postQueryParamsFilter.pageNumber,
                "pageSize": limit,
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
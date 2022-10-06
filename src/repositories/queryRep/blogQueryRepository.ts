import {blogsCollection} from "../../db";
import {BlogDbType, BlogsBusinessType, QueryBlogType} from "../../types/blogTypes";

export const blogQueryRepository = {
    async findBlogs(blogQueryParamsFilter: QueryBlogType): Promise<BlogsBusinessType> {
        const skip = blogQueryParamsFilter.pageSize * (blogQueryParamsFilter.pageNumber - 1)
        const pageNumber = blogQueryParamsFilter.pageNumber
        const sort = blogQueryParamsFilter.sortBy
        const limit = blogQueryParamsFilter.pageSize
        const sortDirection: any = blogQueryParamsFilter.sortDirection
        const searchNameTerm = blogQueryParamsFilter.searchNameTerm
        const blogs = await blogsCollection.find({
            name: {
                $regex: searchNameTerm,
                $options: "(?i)a(?-i)cme"
            }
        }).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountBlogs = await blogsCollection.find({name: {$regex: searchNameTerm, $options: "(?i)a(?-i)cme"}}).count()
        const blogDto = {
            "pagesCount": (Math.ceil(totalCountBlogs/limit)),
            "page": pageNumber,
            "pageSize": limit,
            "totalCount": totalCountBlogs,
            "items": blogs.map(b => (
                {
                    id: b.id,
                    name: b.name,
                    youtubeUrl: b.youtubeUrl,
                    createdAt: b.createdAt
                }
            ))}
        return blogDto
    },
    async findBlogById(id: string): Promise<BlogDbType | null> {
            return await blogsCollection.findOne({id:id});
    }
}
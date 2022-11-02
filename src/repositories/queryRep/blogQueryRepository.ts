import {BlogDbType, BlogsBusinessType, QueryBlogType} from "../../types/blogTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {BlogModel} from "../../db/Schema/blogSchema";

export const blogQueryRepository = {
    async findBlogs({searchNameTerm, pageNumber, pageSize, sortBy, sortDirection}: QueryBlogType): Promise<BlogsBusinessType> {
        const blogs = await BlogModel.find({name: {$regex: searchNameTerm, $options: "(?i)a(?-i)cme"}})
            .sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountBlogs = await BlogModel.find({name: {$regex: searchNameTerm, $options: "(?i)a(?-i)cme"}}).count()
        const blogDto = {
            "pagesCount": getPagesCounts(totalCountBlogs, pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
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
        const findBlog = await BlogModel.findOne({id:id});
        if(findBlog){
                const blog: BlogDbType = {
                id: findBlog.id,
                name: findBlog.name,
                youtubeUrl: findBlog.youtubeUrl,
                createdAt: findBlog.createdAt
                }
                return blog
        }
        return findBlog
    }
}
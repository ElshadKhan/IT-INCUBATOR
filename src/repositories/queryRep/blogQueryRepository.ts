import {BlogDbType, BlogsBusinessType, QueryBlogType} from "../../types/blogTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {BlogModelClass} from "../../db/Schema/blogSchema";

export class BlogQueryRepository {
    async findBlogs({
                        searchNameTerm,
                        pageNumber,
                        pageSize,
                        sortBy,
                        sortDirection
                    }: QueryBlogType): Promise<BlogsBusinessType> {
        const blogs = await BlogModelClass.find({name: {$regex: searchNameTerm, $options: "(?i)a(?-i)cme"}})
            .sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber, pageSize)).limit(pageSize).lean()
        const totalCountBlogs = await BlogModelClass.find({
            name: {
                $regex: searchNameTerm,
                $options: "(?i)a(?-i)cme"
            }
        }).count()
        const blogDto = new BlogsBusinessType(getPagesCounts(totalCountBlogs, pageSize), pageNumber, pageSize, totalCountBlogs, blogs.map(b => (
            {
                id: b.id,
                name: b.name,
                youtubeUrl: b.youtubeUrl,
                createdAt: b.createdAt
            }
        )))

        return blogDto
    }

    async findBlogById(id: string): Promise<BlogDbType | null> {
        const findBlog = await BlogModelClass.findOne({id: id});

        if (findBlog) {
            const blog = new BlogDbType(findBlog.id, findBlog.name, findBlog.youtubeUrl, findBlog.createdAt)
            return blog
        }
        return findBlog
    }
}


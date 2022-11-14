import {Request, Response} from "express";
import {BlogServices} from "../services/blogServices";
import {BlogQueryRepository} from "../repositories/queryRep/blogQueryRepository";
import {queryValidation} from "../middleware/queryValidation";

class BlogControllers {
    public blogService: BlogServices
    public blogQueryRepository: BlogQueryRepository
    constructor() {
        this.blogService = new BlogServices()
        this.blogQueryRepository = new BlogQueryRepository()
    }
    async getBlogs(req: Request, res: Response) {
        const {searchNameTerm, pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const blogs = await this.blogQueryRepository.findBlogs({searchNameTerm, pageNumber, pageSize, sortBy, sortDirection})
        res.status(200).send(blogs)
    }

    async getBlogById(req: Request, res: Response) {
        const blogDto = await this.blogQueryRepository.findBlogById(req.params.id)
        if (blogDto) {
            res.status(200).send(blogDto)
        } else {
            res.sendStatus(404)
        }
    }

    async createBlog(req: Request, res: Response) {
        const newBlog = await this.blogService.createBlog(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlog)
    }

    async updateBlog(req: Request, res: Response) {
        const blog = await this.blogService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deleteBlog(req: Request, res: Response) {
        const blog = await this.blogService.deleteBlog(req.params.id);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

export const blogControllers = new BlogControllers()
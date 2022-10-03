import {Request, Response} from "express";
import {blogService} from "../services/blogServises";

export const blogControllers = {
    async getBlogs(req: Request, res: Response) {
        const blogQueryParamsFilter: any = {
            searchNameTerm: req.query.searchNameTerm ? req.query.searchNameTerm : "",
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: req.query.sortBy || "createdAt",
            sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
        }
        const blogs = await blogService.findBlogs(blogQueryParamsFilter)
        res.status(200).send(blogs)
    },
    async getBlogById(req: Request, res: Response) {
        const blog = await blogService.findBlogById(req.params.id)
        if (blog) {
            res.status(200).send(blog)
        } else {
            res.sendStatus(404)
        }
    },
    async createBlog(req: Request, res: Response) {
        const newBlog = await blogService.createBlog(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlog)

    },
    async updateBlog(req: Request, res: Response) {
        const blog = await blogService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteBlog(req: Request, res: Response) {
        const blog = await blogService.deleteBlog(req.params.id);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
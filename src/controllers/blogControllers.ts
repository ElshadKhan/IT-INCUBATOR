import {Request, Response} from "express";
import {blogService} from "../services/blogServises";

export const blogControllers = {
    async getBlogs(req: Request, res: Response) {
        const blogs = await blogService.findBlogs()
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
    },
    async deleteAllBlogs(req: Request, res: Response) {
        const blog = await blogService.deleteAllBlog();
        res.send(204)
    }
}
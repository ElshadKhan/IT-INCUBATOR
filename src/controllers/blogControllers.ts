import {Request, Response} from "express";
import {blogRepository} from "../repositories/blogRepository";
import {postRepository} from "../repositories/postRepository";

export const blogControllers = {
    async getBlogs(req: Request, res: Response) {
        const blogs = await blogRepository.findBlogs()
        res.status(200).send(blogs)
    },
    async getBlogById(req: Request, res: Response) {
        const blog = await blogRepository.findBlogById(req.params.id)
        if (blog) {
            res.status(200).send(blog)
        } else {
            res.send(404)
        }
    },
    async createBlog(req: Request, res: Response) {
        const newBlog = await blogRepository.makeBlog(req.body.name, req.body.youtubeUrl)
        res.status(201).send(newBlog)

    },
    async updateBlog(req: Request, res: Response) {
        const blog = await blogRepository.replaceBlog(req.params.id, req.body.name, req.body.youtubeUrl);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteBlog(req: Request, res: Response) {
        const blog = await blogRepository.removeBlog(req.params.id);
        if (blog) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteBlogsAndPosts(req: Request, res: Response) {
        const blog = await blogRepository.removeAllBlog();
        const post = await postRepository.removeAllPost()
        res.send(204)
    }
}
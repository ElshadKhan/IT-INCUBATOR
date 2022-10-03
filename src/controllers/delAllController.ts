import {Request, Response} from "express";
import {blogService} from "../services/blogServises";
import {postService} from "../services/postServices";

export const delAllControllers = {
    async deleteAllBlogs(req: Request, res: Response) {
        const post = await postService.deleteAllPost()
        const blog = await blogService.deleteAllBlog();
        res.send(204)
    }
}
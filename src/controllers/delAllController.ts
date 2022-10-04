import {Request, Response} from "express";
import {blogService} from "../services/blogServises";
import {postService} from "../services/postServices";
import {userService} from "../services/userServices";

export const delAllControllers = {
    async deleteAllCollections(req: Request, res: Response) {
        const users = await userService.deleteAllUsers()
        const posts = await postService.deleteAllPosts()
        const blogs = await blogService.deleteAllBlogs();
        res.send(204)
    }
}
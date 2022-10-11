import {Request, Response} from "express";
import {userService} from "../services/userServices";
import {postService} from "../services/postServices";
import {blogService} from "../services/blogServises";
import {commentService} from "../services/commentServices";
import {userQueryRepository} from "../repositories/queryRep/userQueryRepository";
import {queryValidation} from "../middleware/queryValidation";

export const userControllers = {
async getUsers(req: Request, res: Response) {
    const {searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
    const users = await userQueryRepository.findUsers({searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection})
        res.status(200).send(users)
    },
    async createUser(req: Request, res: Response) {
        const newUser = await userService.createUser(req.body.login, req.body.password, req.body.email)
        res.status(201).send(newUser)
    },
    async deleteUser(req: Request, res: Response) {
        const user = await userService.deleteUser(req.params.id);
        if (user) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteAllCollections(req: Request, res: Response) {
        await userService.deleteAllUsers()
        await blogService.deleteAllBlogs();
        await postService.deleteAllPosts()
        await commentService.deleteAllComments()
        res.send(204)
    }
}
import {Request, Response} from "express";
import {userService} from "../services/userServices";
import {postService} from "../services/postServices";
import {blogService} from "../services/blogServises";
import {userQueryRepository} from "../repositories/queryRep/userQueryRepository";
import {QueryUserType} from "../types/userTypes";

export const userControllers = {
    async getUsers(req: Request, res: Response) {
        const userQueryParamsFilter: QueryUserType = {
            searchLoginTerm: typeof req.query.searchLoginTerm === "string" ? req.query.searchLoginTerm : "",
            searchEmailTerm: typeof req.query.searchEmailTerm === "string" ? req.query.searchEmailTerm : "",
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: typeof req.query.sortBy === "string" ? req.query.sortBy : "createdAt",
            sortDirection: typeof req.query.sortDirection === "string" && req.query.sortDirection === "asc"  ? "asc" : "desc"
        }
        const users = await userQueryRepository.findUsers(userQueryParamsFilter)
        res.status(200).send(users)
    },
    async createUser(req: Request, res: Response) {
        const newUser = await userService.createUser(req.body.login, req.body.password, req.body.email)
        res.status(201).send(newUser)
    },
    async loginUser(req: Request, res: Response) {
        const user = await userService.loginUser(req.body.login, req.body.password)
        if (user) {
            res.send(204)
        } else {
            res.send(401)
        }
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
        console.log("1")
        const users = await userService.deleteAllUsers()
        console.log("2")
        const posts = await postService.deleteAllPosts()
        console.log("3")
        const blogs = await blogService.deleteAllBlogs();
        console.log("4")
        res.send(204)
    }
}
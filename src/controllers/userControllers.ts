import {Request, Response} from "express";
import {UserServices} from "../services/userServices";
import {PostServices} from "../services/postServices";
import {BlogServices} from "../services/blogServices";
import {CommentServices} from "../services/commentServices";
import {UserQueryRepository} from "../repositories/queryRep/userQueryRepository";
import {queryValidation} from "../middleware/queryValidation";
import {SessionsServices} from "../services/sessionsServices";

class UserControllers {
    private blogService: BlogServices
    private postService: PostServices
    private userQueryRepository: UserQueryRepository
    private userService: UserServices
    private sessionsService: SessionsServices
    private commentService: CommentServices
    constructor() {
        this.blogService = new BlogServices()
        this.postService = new PostServices()
        this.userQueryRepository = new UserQueryRepository()
        this.userService = new UserServices()
        this.sessionsService = new SessionsServices()
        this.commentService = new CommentServices()
    }
    async getUsers(req: Request, res: Response) {
        const {
            searchLoginTerm,
            searchEmailTerm,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } = queryValidation(req.query)
        const users = await this.userQueryRepository.findUsers({
            searchLoginTerm,
            searchEmailTerm,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        })
        res.status(200).send(users)
    }

    async createUser(req: Request, res: Response) {
        const newUser = await this.userService.createUser(req.body.login, req.body.password, req.body.email)
        const userDto = {
            id: newUser.id,
            login: newUser.accountData.userName,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }
        res.status(201).send(userDto)
    }

    async deleteUser(req: Request, res: Response) {
        const user = await this.userService.deleteUser(req.params.id);
        if (user) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deleteAllCollections(req: Request, res: Response) {
        await this.userService.deleteAllUsers()
        await this.blogService.deleteAllBlogs();
        await this.postService.deleteAllPosts()
        await this.commentService.deleteAllComments()
        await this.sessionsService.deleteAllSessions()
        res.send(204)
    }
}

export const userControllers = new UserControllers()
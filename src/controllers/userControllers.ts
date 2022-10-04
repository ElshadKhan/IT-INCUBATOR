import {Request, Response} from "express";
import {userService} from "../services/userServices";


export const userControllers = {
    async getUsers(req: Request, res: Response) {
        const userQueryParamsFilter: any = {
            searchLoginTerm: req.query.searchLoginTerm ? req.query.searchLoginTerm : "",
            searchEmailTerm: req.query.searchEmailTerm ? req.query.searchEmailTerm : "",
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: req.query.sortBy || "createdAt",
            sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
        }
        const users = await userService.findUsers(userQueryParamsFilter)
        res.status(200).send(users)
    },
    // async getPostById(req: Request, res: Response) {
    //     const post = await postService.findPostById(req.params.id)
    //     if (post) {
    //         res.status(200).send(post)
    //     } else {
    //         res.send(404)
    //     }
    // },
    // async getPostsByBlogId(req: Request, res: Response) {
    //         const postQueryParamsFilter: any = {
    //         pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
    //         pageSize: req.query.pageSize ? +req.query.pageSize : 10,
    //         sortBy: req.query.sortBy || "createdAt",
    //         sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
    //     }
    //     const postsForSpecificBlog = await postService.findPostsByBlogId(req.params.blogId, postQueryParamsFilter)
    //     if (postsForSpecificBlog) {
    //         res.status(200).send(postsForSpecificBlog)
    //     } else {
    //         res.send(404)
    //     }
    //
    // },
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
    // async createPostByBlogId(req: Request, res: Response) {
    //     const newPost = await postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
    //     res.status(201).send(newPost)
    // },
    // async updatePost(req: Request, res: Response) {
    //     const post = await postService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    //     if (post) {
    //         res.send(204)
    //     } else {
    //         res.send(404)
    //     }
    // },
    async deleteUser(req: Request, res: Response) {
        const user = await userService.deleteUser(req.params.id);
        if (user) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
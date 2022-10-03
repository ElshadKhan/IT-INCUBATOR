import {Request, Response} from "express";
import {postService} from "../services/postServices";


export const postControllers = {
    async getPosts(req: Request, res: Response) {
        const postQueryParamsFilter: any = {
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: req.query.sortBy || "createdAt",
            sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
        }
        const posts = await postService.findPosts(postQueryParamsFilter)
        res.status(200).send(posts)
    },
    async getPostById(req: Request, res: Response) {
        const post = await postService.findPostById(req.params.id)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    },
    async getPostsByBlogId(req: Request, res: Response) {
            const postQueryParamsFilter: any = {
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: req.query.sortBy || "createdAt",
            sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
        }
        const postsForSpecificBlog = await postService.findPostsByBlogId(req.params.blogId, postQueryParamsFilter)
        if (postsForSpecificBlog) {
            res.status(200).send(postsForSpecificBlog)
        } else {
            res.send(404)
        }

    },
    async createPost(req: Request, res: Response) {
        const newPost = await postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
    },
    async createPostByBlogId(req: Request, res: Response) {
        const newPost = await postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
        res.status(201).send(newPost)
    },
    async updatePost(req: Request, res: Response) {
        const post = await postService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deletePost(req: Request, res: Response) {
        const post = await postService.deletePost(req.params.id);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
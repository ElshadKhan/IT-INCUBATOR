import {Request, Response} from "express";
import {postService} from "../services/postServices";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {queryValidation} from "../middleware/queryValidation";

export const postControllers = {
    async getPosts(req: Request, res: Response) {
        if(!req.user) {
            const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
            const posts = await postQueryRepository.findPosts({pageNumber, pageSize, sortBy, sortDirection}, "")
            res.status(200).send(posts)
        } else {
            const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
            const posts = await postQueryRepository.findPosts({pageNumber, pageSize, sortBy, sortDirection}, req.user!.id)
            res.status(200).send(posts)
        }

    },
    async getPostById(req: Request, res: Response) {
        if (!req.user){
            const post = await postQueryRepository.findPostById(req.params.id, "None")
            if (post) {
                res.status(200).send(post)
            } else {
                res.send(404)
            }
        } else {
            const post = await postQueryRepository.findPostById(req.params.id, req.user!.id)
            if (post) {
                res.status(200).send(post)
            } else {
                res.send(404)
            }
        }
    },
    async getPostsByBlogId(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const postsForSpecificBlog = await postQueryRepository.findPostsByBlogId(req.params.blogId, {pageNumber, pageSize, sortBy, sortDirection})
        console.log(postsForSpecificBlog)
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
        const newPost = await postService.createPostByBlogId(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.send(404)
        }
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
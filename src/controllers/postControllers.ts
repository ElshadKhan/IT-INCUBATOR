import {Request, Response} from "express";
import {PostServices} from "../services/postServices";
import {PostQueryRepository} from "../repositories/queryRep/postQueryRepository";
import {queryValidation} from "../middleware/queryValidation";

class PostControllers {
    constructor(private postQueryRepository = new PostQueryRepository(),
                private postService = new PostServices()) {
    }

    async getPosts(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const posts = await this.postQueryRepository.findPosts({
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }, req.user!)
        res.status(200).send(posts)
    }

    async getPostById(req: Request, res: Response) {
        const post = await this.postQueryRepository.findPostById(req.params.id, req.user!)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }

    }

    async getPostsByBlogId(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const postsForSpecificBlog = await this.postQueryRepository.findPostsByBlogId(req.params.blogId, {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }, req.user!)
        if (postsForSpecificBlog) {
            res.status(200).send(postsForSpecificBlog)
        } else {
            res.send(404)
        }

    }

    async createPost(req: Request, res: Response) {
        const newPost = await this.postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
    }

    async createPostByBlogId(req: Request, res: Response) {
        const newPost = await this.postService.createPostByBlogId(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.send(404)
        }
    }

    async updatePost(req: Request, res: Response) {
        const post = await this.postService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deletePost(req: Request, res: Response) {
        const post = await this.postService.deletePost(req.params.id);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

export const postControllers = new PostControllers()
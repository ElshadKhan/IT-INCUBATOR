import {Request, Response} from "express";
import {postRepository} from "../repositories/postRepository";

export const postControllers = {
    async getPosts(req: Request, res: Response) {
        const posts = await postRepository.findPosts()
        res.status(200).send(posts)
    },
    async getPostById(req: Request, res: Response) {
        const post = await postRepository.findPostById(req.params.id)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    },
    async createPost(req: Request, res: Response) {
        const newPost = await postRepository.makePost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost)
    },
    async updatePost(req: Request, res: Response) {
        const post = await postRepository.replacePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deletePost(req: Request, res: Response) {
        const post = await postRepository.removePost(req.params.id);
        if (post) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
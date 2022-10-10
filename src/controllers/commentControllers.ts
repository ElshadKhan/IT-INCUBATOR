import {Request, Response} from "express";
import {commentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {commentService} from "../services/commentServices";


export const commentControllers = {
    async getCommentById(req: Request, res: Response) {
        const comment = await commentQueryRepository.findCommentById(req.params.id)
        if (comment) {
            res.status(200).send(comment)
        } else {
            res.send(404)
        }
    },
    async getCommentsByPostId(req: Request, res: Response) {
            const commentQueryParamsFilter: any = {
            pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
            pageSize: req.query.pageSize ? +req.query.pageSize : 10,
            sortBy: req.query.sortBy || "createdAt",
            sortDirection: req.query.sortDirection === "asc" ? "asc" : "desc"
        }
        const commentForSpecificPost = await commentQueryRepository.findCommentsByPostId(req.params.postId, commentQueryParamsFilter)
        if (commentForSpecificPost) {
            res.status(200).send(commentForSpecificPost)
        } else {
            res.send(404)
        }
    },
    async createCommentByPostId(req: any, res: Response) {
        console.log("2", req.body.content, req.params.postId, req.user)
        const newComment = await commentService.createComment(req.body.content, req.params.postId, req.user)
        console.log("3",newComment)
        if (newComment) {
            res.status(201).send(newComment)
        } else {
            res.send(404)
        }
    },
    async updateComment(req: Request, res: Response) {
        // console.log("1", req.user.id)
        console.log("2", req.params.commentId)
        // if(req.user.id !== req.params.commentId) {
        //     res.send(403)
        // }
        const comment = await commentService.updateComment(req.body.content, req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteComment(req: Request, res: Response) {
        // console.log("1", req.user.id)
        console.log("2", req.params.commentId)
        // if(req.user.id !== req.params.commentId) {
        //     res.send(403)
        // }
        const comment = await commentService.deleteComment(req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
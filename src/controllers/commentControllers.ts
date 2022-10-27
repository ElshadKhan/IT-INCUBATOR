import {Request, Response} from "express";
import {commentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {commentService} from "../services/commentServices";
import {queryValidation} from "../middleware/queryValidation";

export const commentControllers = {
    async getCommentById(req: Request, res: Response) {
        if(!req.user){
            console.log("hi")
            const comment = await commentQueryRepository.findCommentById(req.params.id)
            if (comment) {
                res.status(200).send(comment)
            } else {
                res.send(404)
            }
        } else {
            const comment = await commentQueryRepository.findCommentByUserIdAndCommentId(req.params.id, req.user!.id)
            if (comment) {
                res.status(200).send(comment)
            } else {
                res.send(404)
            }
        }
    },
    async getCommentsByPostId(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const commentForSpecificPost = await commentQueryRepository.findCommentsByPostId(req.params.postId, {pageNumber, pageSize, sortBy, sortDirection})
        if (commentForSpecificPost) {
            res.status(200).send(commentForSpecificPost)
        } else {
            res.send(404)
        }
    },
    async createCommentByPostId(req: Request, res: Response) {
        const newComment = await commentService.createComment(req.body.content, req.params.postId, req.user!)
        if (newComment) {
            res.status(201).send(newComment)
        } else {
            res.send(404)
        }
    },
    async updateComment(req: Request, res: Response) {
        const comment = await commentService.updateComment(req.body.content, req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async updateLikeStatusComment(req: Request, res: Response) {
        const comment = await commentQueryRepository.findCommentByUserIdAndCommentId(req.params.commentId, req.user!.id)
        console.log("comment", comment)
        if (comment) {
            await commentService.updateLikeStatusComment(req.body.likeStatus, req.params.commentId, req.user!.id);
            res.send(204)
        } else {
            res.send(404)
        }



    },
    async deleteComment(req: Request, res: Response) {
        const comment = await commentService.deleteComment(req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
import {Request, Response} from "express";
import {CommentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {CommentServices} from "../services/commentServices";
import {queryValidation} from "../middleware/queryValidation";

class CommentControllers {
    constructor(private commentService= new CommentServices(),
                private commentQueryRepository= new CommentQueryRepository()) {
    }
    async getCommentById(req: Request, res: Response) {
        const comment = await this.commentQueryRepository.findCommentByUserIdAndCommentId(req.params.id, req.user!)
        if (comment) {
            res.status(200).send(comment)
        } else {
            res.send(404)
        }
    }

    async getCommentsByPostId(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const commentForSpecificPost = await this.commentQueryRepository.findCommentsByPostIdAndUserId(req.params.postId, {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        }, req.user!)
        if (commentForSpecificPost) {
            res.status(200).send(commentForSpecificPost)
        } else {
            res.send(404)
        }

    }

    async createCommentByPostId(req: Request, res: Response) {
        const newComment = await this.commentService.createComment(req.body.content, req.params.postId, req.user!)
        if (newComment) {
            res.status(201).send(newComment)
        } else {
            res.send(404)
        }
    }

    async updateComment(req: Request, res: Response) {
        const comment = await this.commentService.updateComment(req.body.content, req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async deleteComment(req: Request, res: Response) {
        const comment = await this.commentService.deleteComment(req.params.commentId);
        if (comment) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

export const commentControllers = new CommentControllers()
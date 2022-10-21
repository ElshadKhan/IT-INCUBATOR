import {Request, Response} from "express";
import {sessionsService} from "../services/sessionsServices";

export const sessionsControllers = {
    async getAllActiveSessions(req: Request, res: Response) {
        const allSessions = await sessionsService.getAllActiveSessions(req.user!.id)
        if (allSessions) {
            res.status(200).send(allSessions)
        } else {
            res.send(401)
        }
    },
    // async getCommentsByPostId(req: Request, res: Response) {
    //     const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
    //     const commentForSpecificPost = await commentQueryRepository.findCommentsByPostId(req.params.postId, {pageNumber, pageSize, sortBy, sortDirection})
    //     if (commentForSpecificPost) {
    //         res.status(200).send(commentForSpecificPost)
    //     } else {
    //         res.send(404)
    //     }
    // },
    // async createCommentByPostId(req: Request, res: Response) {
    //     const newComment = await commentService.createComment(req.body.content, req.params.postId, req.user!)
    //     if (newComment) {
    //         res.status(201).send(newComment)
    //     } else {
    //         res.send(404)
    //     }
    // },
    // async updateComment(req: any, res: Response) {
    //     const comment = await commentService.updateComment(req.body.content, req.params.commentId);
    //     if (comment) {
    //         res.send(204)
    //     } else {
    //         res.send(404)
    //     }
    // },
    async deleteAllSessions(req: Request, res: Response) {
        const sessions = await sessionsService.deleteAllSessions(req.params.commentId);
        if (sessions) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteAllSessionsExceptOne(req: Request, res: Response) {
        const sessions = await sessionsService.deleteAllSessionsExceptOne(req.params.commentId);
        if (!sessions) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
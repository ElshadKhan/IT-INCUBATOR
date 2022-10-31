import {Request, Response} from "express";
import {likeStatusService} from "../services/likeStatusServices";
import {likeStatusQueryRepository} from "../repositories/queryRep/likeStatusQueryRepository";
import {commentService} from "../services/commentServices";
import {commentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";

export const likeStatusControllers = {
    async updateLikeStatusComment(req: Request, res: Response) {
        const comment = await commentQueryRepository.findCommentById(req.params.commentId)
        if (comment) {
            await likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.commentId, req.user!.id);
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async updateLikeStatusPost(req: Request, res: Response) {
        console.log(req.params.postId)
        const post = await postQueryRepository.findPostById(req.params.postId, req.user!.id)
        console.log(post)
        if (post) {
            await likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.postId, req.user!.id);
            res.send(204)
        } else {
            res.send(404)
        }
    },

}
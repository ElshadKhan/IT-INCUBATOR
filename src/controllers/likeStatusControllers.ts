import {Request, Response} from "express";
import {likeStatusService} from "../services/likeStatusServices";
import {commentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {postQueryRepository} from "../repositories/queryRep/postQueryRepository";

export const likeStatusControllers = {
    async updateLikeStatusComment(req: Request, res: Response) {
        if(!req.user) return res.send(401)
        const comment = await commentQueryRepository.findCommentByUserIdAndCommentId(req.params.commentId, req.user.id)
        if (comment) {
            await likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.commentId, req.user.id);
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async updateLikeStatusPost(req: Request, res: Response) {
        if(!req.user) return res.send(401)
        const post = await postQueryRepository.findPostById(req.params.postId, req.user.id)
        if (post) {
            await likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.postId, req.user.id);
            res.send(204)
        } else {
            res.send(404)
        }
    },

}
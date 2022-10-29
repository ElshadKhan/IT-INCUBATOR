import {Request, Response} from "express";
import {likeStatusService} from "../services/likeStatusServices";
import {likeStatusQueryRepository} from "../repositories/queryRep/likeStatusQueryRepository";

export const likeStatusControllers = {
    async updateLikeStatusComment(req: Request, res: Response) {
        const comment = await likeStatusQueryRepository.findLikeDislikeById(req.params.parentId, req.user!.id)
        if (comment) {
            await likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.parentId, req.user!.id);
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
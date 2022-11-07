import {Request, Response} from "express";
import {LikeStatusServices} from "../services/likeStatusServices";
import {CommentQueryRepository} from "../repositories/queryRep/commentQueryRepository";
import {PostQueryRepository} from "../repositories/queryRep/postQueryRepository";

class LikeStatusControllers {
    constructor(private postQueryRepository = new PostQueryRepository(),
                private likeStatusService = new LikeStatusServices(),
                private commentQueryRepository = new CommentQueryRepository()) {
    }
    async updateLikeStatusComment(req: Request, res: Response) {
        if(!req.user) return res.send(401)
        const comment = await this.commentQueryRepository.findCommentByUserIdAndCommentId(req.params.commentId, req.user)
        if (comment) {
            await this.likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.commentId, req.user.id);
            res.send(204)
        } else {
            res.send(404)
        }
    }
    async updateLikeStatusPost(req: Request, res: Response) {
        if(!req.user) return res.send(401)
        const post = await this.postQueryRepository.findPostById(req.params.postId, req.user)
        if (post) {
            await this.likeStatusService.updateLikeStatusComment(req.body.likeStatus, req.params.postId, req.user.id);
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

export const likeStatusControllers = new LikeStatusControllers()


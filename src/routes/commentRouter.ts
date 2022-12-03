import {Router} from "express";
import {authBearerMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {
    commentIdInputValidation, commentIdValidations, likeStatusValidations
} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";
import {likeStatusControllers} from "../controllers/likeStatusControllers";

export const commentRouter = Router({})

commentRouter.get('/comments/:id', findUserIdMiddleware, commentControllers.getCommentById.bind(commentControllers))
commentRouter.put('/comments/:commentId', authBearerMiddleware, commentIdValidations, commentIdInputValidation, commentControllers.updateComment.bind(commentControllers))
commentRouter.put('/comments/:commentId/like-status', authBearerMiddleware, likeStatusValidations, likeStatusControllers.updateLikeStatusComment.bind(likeStatusControllers))
commentRouter.delete('/comments/:commentId', authBearerMiddleware, commentIdInputValidation, commentControllers.deleteComment.bind(commentControllers))
import {Router} from "express";
import {authBearerMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {
    commentIdInputValidation, commentIdValidations, likeStatusValidations
} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', findUserIdMiddleware, commentControllers.getCommentById)
commentRouter.put('/:commentId', authBearerMiddleware, commentIdValidations, commentIdInputValidation, commentControllers.updateComment)
commentRouter.put('/:commentId/like-status', authBearerMiddleware, likeStatusValidations, commentControllers.updateLikeStatusComment)
commentRouter.delete('/:commentId', authBearerMiddleware, commentIdInputValidation, commentControllers.deleteComment)
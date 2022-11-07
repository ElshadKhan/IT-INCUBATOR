import {Router} from "express";
import {authBearerMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {
    commentIdInputValidation, commentIdValidations, likeStatusValidations
} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";
import {likeStatusControllers} from "../controllers/likeStatusControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', findUserIdMiddleware, commentControllers.getCommentById.bind(commentControllers))
commentRouter.put('/:commentId', authBearerMiddleware, commentIdValidations, commentIdInputValidation, commentControllers.updateComment.bind(commentControllers))
commentRouter.put('/:commentId/like-status', authBearerMiddleware, likeStatusValidations, likeStatusControllers.updateLikeStatusComment.bind(likeStatusControllers))
commentRouter.delete('/:commentId', authBearerMiddleware, commentIdInputValidation, commentControllers.deleteComment.bind(commentControllers))
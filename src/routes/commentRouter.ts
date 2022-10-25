import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {commentIdInputValidation, commentIdValidations
} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', commentControllers.getCommentById)
commentRouter.put('/:commentId', authBearerMiddleware, commentIdValidations, commentIdInputValidation, commentControllers.updateComment)
commentRouter.delete('/:commentId', authBearerMiddleware, commentIdInputValidation, commentControllers.deleteComment)
import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {commentIdValidations, commentValidations} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', commentControllers.getCommentById)
commentRouter.put('/:commentId', authMiddleware, commentIdValidations, commentControllers.updateComment)
commentRouter.delete('/:commentId', authMiddleware, commentControllers.deleteComment)
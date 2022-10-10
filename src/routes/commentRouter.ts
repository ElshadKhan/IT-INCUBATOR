import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {commentIdValidations
} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', commentControllers.getCommentById)
commentRouter.put('/:commentId', authBearerMiddleware, commentIdValidations, commentControllers.updateComment)
commentRouter.delete('/:commentId', authBearerMiddleware, commentControllers.deleteComment)
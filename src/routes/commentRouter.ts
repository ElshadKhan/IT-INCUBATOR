import {Router} from "express";
import {authBearerMiddleware, authMiddleware} from "../middleware/authMiddleware";
import {commentIdValidations, commentValidations} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const commentRouter = Router({})

commentRouter.get('/:id', commentControllers.getCommentById)
commentRouter.put('/:commentsId', authBearerMiddleware, commentIdValidations, commentControllers.updateComment)
commentRouter.delete('/:commentsId', authBearerMiddleware, commentControllers.deleteComment)
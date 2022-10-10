import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {
    postBodyValidationsBlogId, postIdParamValidation
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authBearerMiddleware, authMiddleware} from "../middleware/authMiddleware";
import {commentValidations} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";

export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.get('/:postId/comments', postIdParamValidation,commentControllers.getCommentsByPostId)
postRouter.post('/:postId/comments', authBearerMiddleware, commentValidations, commentControllers.createCommentByPostId)
postRouter.post('/', authMiddleware, postBodyValidationsBlogId, postControllers.createPost)
postRouter.put('/:id', authMiddleware, postBodyValidationsBlogId, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
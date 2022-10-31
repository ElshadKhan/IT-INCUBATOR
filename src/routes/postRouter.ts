import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {postBodyValidationsBlogId, postIdParamValidation
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authBearerMiddleware, authMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {commentValidations, likeStatusValidations} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";
import {likeStatusControllers} from "../controllers/likeStatusControllers";

export const postRouter = Router({})

postRouter.get('/', findUserIdMiddleware, postControllers.getPosts)
postRouter.get('/:id', findUserIdMiddleware, postControllers.getPostById)
postRouter.get('/:postId/comments', findUserIdMiddleware, postIdParamValidation,commentControllers.getCommentsByPostId)
postRouter.post('/:postId/comments', authBearerMiddleware, commentValidations, commentControllers.createCommentByPostId)
postRouter.post('/', findUserIdMiddleware, authMiddleware, postBodyValidationsBlogId, postControllers.createPost)
postRouter.put('/:id', authMiddleware, postBodyValidationsBlogId, postControllers.updatePost)
postRouter.put('/:postId/like-status', authBearerMiddleware, likeStatusValidations, likeStatusControllers.updateLikeStatusPost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
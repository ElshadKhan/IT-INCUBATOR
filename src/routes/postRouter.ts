import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {
    postBodyValidationsBlogId, postIdParamValidation
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authBearerMiddleware, authMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {commentValidations, likeStatusValidations} from "../middleware/commentMiddleware/commentInputMiddlewares";
import {commentControllers} from "../controllers/commentControllers";
import {likeStatusControllers} from "../controllers/likeStatusControllers";

export const postRouter = Router({})

postRouter.get('/', findUserIdMiddleware, postControllers.getPosts.bind(postControllers))
postRouter.get('/:id', findUserIdMiddleware, postControllers.getPostById.bind(postControllers))
postRouter.get('/:postId/comments', findUserIdMiddleware, postIdParamValidation, commentControllers.getCommentsByPostId.bind(commentControllers))
postRouter.post('/:postId/comments', authBearerMiddleware, commentValidations, commentControllers.createCommentByPostId.bind(commentControllers))
postRouter.post('/', findUserIdMiddleware, authMiddleware, postBodyValidationsBlogId, postControllers.createPost.bind(postControllers))
postRouter.put('/:id', authMiddleware, postBodyValidationsBlogId, postControllers.updatePost.bind(postControllers))
postRouter.put('/:postId/like-status', authBearerMiddleware, likeStatusValidations, likeStatusControllers.updateLikeStatusPost.bind(likeStatusControllers))
postRouter.delete('/:id', authMiddleware, postControllers.deletePost.bind(postControllers))
import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {postBodyValidationsBlogId
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authMiddleware} from "../middleware/authMiddleware";

export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', authMiddleware, postBodyValidationsBlogId, postControllers.createPost)
postRouter.put('/:id', authMiddleware, postBodyValidationsBlogId, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
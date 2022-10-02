import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {
    blogIdInputBodyValidation,
    postValidations
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authMiddleware} from "../middleware/authMiddleware";


export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', authMiddleware, blogIdInputBodyValidation, postValidations, postControllers.createPost)
postRouter.put('/:id', authMiddleware, blogIdInputBodyValidation, postValidations, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
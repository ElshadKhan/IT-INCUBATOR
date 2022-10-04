import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {
    blogIdInputValidation, postValidations
} from "../middleware/postMiddleware/postInputMiddlewares";
import {authMiddleware} from "../middleware/authMiddleware";


export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', authMiddleware, blogIdInputValidation,postValidations, postControllers.createPost)
postRouter.put('/:id', authMiddleware, blogIdInputValidation,postValidations, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
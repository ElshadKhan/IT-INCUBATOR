import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {postValidations} from "../middleware/postMiddleware/postInputMiddlewares";
import {authMiddleware} from "../middleware/authMiddleware";
import {postQueryParamsValidation} from "../middleware/postMiddleware/postQueryParamsMiddleware";


export const postRouter = Router({})

postRouter.get('/',postQueryParamsValidation , postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', authMiddleware, postValidations, postControllers.createPost)
postRouter.put('/:id', authMiddleware, postValidations, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
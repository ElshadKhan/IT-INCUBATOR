import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {postInputControlMiddleware} from "../middleware/postMiddleware/postInputControlMiddleware";
import {inputBlogValidationMiddleware} from "../middleware/input-validation-middleware";

export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', postInputControlMiddleware, inputBlogValidationMiddleware, postControllers.createPost)
postRouter.put('/:id', postInputControlMiddleware, inputBlogValidationMiddleware, postControllers.updatePost)
postRouter.delete('/:id', inputBlogValidationMiddleware, postControllers.deletePost)
import {Router} from "express";
import {postControllers} from "../controllers/postControllers";
import {
    blogIdControll,
    postRoutValidators
} from "../middleware/postMiddleware/postInputControlMiddleware";
import {inputValidation} from "../middleware/inputValidation";
import {authMiddleware} from "../middleware/authMiddleware";

export const postRouter = Router({})

postRouter.get('/', postControllers.getPosts)
postRouter.get('/:id', postControllers.getPostById)
postRouter.post('/', authMiddleware, postRoutValidators, blogIdControll, inputValidation, postControllers.createPost)
postRouter.put('/:id', authMiddleware, postRoutValidators, blogIdControll, inputValidation, postControllers.updatePost)
postRouter.delete('/:id', authMiddleware, postControllers.deletePost)
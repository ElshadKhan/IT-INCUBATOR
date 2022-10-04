import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {authMiddleware} from "../middleware/authMiddleware";
import {userValidations} from "../middleware/userMiddleware/userInputMiddlewares";

export const userRouter = Router({})

userRouter.get('/', userControllers.getUsers)
// userRouter.get('/:id', postControllers.getPostById)
userRouter.post('/', authMiddleware, userValidations, userControllers.createUser)
// userRouter.put('/:id', authMiddleware, postValidations, postControllers.updatePost)
userRouter.delete('/:id', authMiddleware, userControllers.deleteUser)
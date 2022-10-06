import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {authMiddleware} from "../middleware/authMiddleware";
import {userValidations} from "../middleware/userMiddleware/userInputMiddlewares";

export const userRouter = Router({})

userRouter.get('/', userControllers.getUsers)
userRouter.post('/', authMiddleware, userValidations, userControllers.createUser)
userRouter.post('/login', userControllers.loginUser)
userRouter.delete('/:id', authMiddleware, userControllers.deleteUser)
import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {authMiddleware} from "../middleware/authMiddleware";
import {userLoginValidations} from "../middleware/userMiddleware/userInputMiddlewares";

export const userRouter = Router({})

userRouter.get('/', userControllers.getUsers.bind(userControllers))
userRouter.post('/', authMiddleware, userLoginValidations, userControllers.createUser.bind(userControllers))
userRouter.delete('/:id', authMiddleware, userControllers.deleteUser.bind(userControllers))
import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {userLoginValidations} from "../middleware/userMiddleware/userInputMiddlewares";
import {userControllers} from "../controllers/userControllers";

export const userRouter = Router({})


userRouter.get('/users', userControllers.getUsers.bind(userControllers))
userRouter.post('/users', authMiddleware, userLoginValidations, userControllers.createUser.bind(userControllers))
userRouter.delete('/users/:id', authMiddleware, userControllers.deleteUser.bind(userControllers))
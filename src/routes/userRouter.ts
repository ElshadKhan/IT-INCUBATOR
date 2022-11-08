import {Router} from "express";
import {container} from "../composition-root";
import {authMiddleware} from "../middleware/authMiddleware";
import {userLoginValidations} from "../middleware/userMiddleware/userInputMiddlewares";
import {UserControllers} from "../controllers/userControllers";

export const userRouter = Router({})

const userControllers = container.resolve(UserControllers)

userRouter.get('/', userControllers.getUsers.bind(userControllers))
userRouter.post('/', authMiddleware, userLoginValidations, userControllers.createUser.bind(userControllers))
userRouter.delete('/:id', authMiddleware, userControllers.deleteUser.bind(userControllers))
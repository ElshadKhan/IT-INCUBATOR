import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {authBearerMiddleware, authMiddleware} from "../middleware/authMiddleware";
import {userAuthValidations, userValidations} from "../middleware/userMiddleware/userInputMiddlewares";

export const userRouter = Router({})

userRouter.get('/', userControllers.getUsers)
userRouter.post('/', authMiddleware, userValidations, userControllers.createUser)
userRouter.post('/login', userAuthValidations, userControllers.loginUser)
userRouter.get('/me', authBearerMiddleware, userControllers.getAuthUser)
userRouter.delete('/:id', authMiddleware, userControllers.deleteUser)
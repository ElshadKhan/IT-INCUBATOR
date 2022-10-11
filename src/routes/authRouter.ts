import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {userAuthValidations} from "../middleware/userMiddleware/userInputMiddlewares";
import {authControllers} from "../controllers/authControllers";

export const authRouter = Router({})

authRouter.post('/login', userAuthValidations, authControllers.loginUser)
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser)

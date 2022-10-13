import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {
    codeEmailAuthValidations, userAuthValidations,
    userEmailAuthValidations,
    userLoginValidations
} from "../middleware/userMiddleware/userInputMiddlewares";
import {authControllers} from "../controllers/authControllers";

export const authRouter = Router({})

authRouter.post('/login', userAuthValidations, authControllers.loginUser)
authRouter.post('/registration-confirmation', codeEmailAuthValidations, authControllers.loginUser)
authRouter.post('/registration', userLoginValidations,  authControllers.authUser)
authRouter.post('/registration-email-resending', userEmailAuthValidations, authControllers.loginUser)
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser)

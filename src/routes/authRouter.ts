import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {
    codeEmailAuthValidations, userAuthValidations,
    userEmailAuthValidations,
    userRegistrationValidations
} from "../middleware/userMiddleware/userInputMiddlewares";
import {authControllers} from "../controllers/authControllers";

export const authRouter = Router({})

authRouter.post('/login', userAuthValidations, authControllers.loginUser)
authRouter.post('/logout',  authControllers.logoutUser)
authRouter.post('/refresh-token',  authControllers.resendingTokens)
authRouter.post('/registration-confirmation', codeEmailAuthValidations, authControllers.confirmationEmail)
authRouter.post('/registration', userRegistrationValidations, authControllers.createUser)
authRouter.post('/registration-email-resending', userEmailAuthValidations, authControllers.emailResending)
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser)

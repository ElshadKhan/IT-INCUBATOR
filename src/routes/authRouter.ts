import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {
    codeEmailAuthValidations, userAuthValidations,
    userEmailAuthValidations,
    userRegistrationValidations
} from "../middleware/userMiddleware/userInputMiddlewares";
import {authControllers} from "../controllers/authControllers";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {ipMiddleware} from "../middleware/ipAdresValidation";

export const authRouter = Router({})

authRouter.post('/login', userAuthValidations, ipMiddleware, authControllers.loginUser)
authRouter.post('/logout', refreshTokenMiddleware, authControllers.logoutUser)
authRouter.post('/refresh-token', refreshTokenMiddleware, authControllers.resendingRefreshTokens)
authRouter.post('/registration-confirmation', codeEmailAuthValidations, ipMiddleware, authControllers.confirmationEmail)
authRouter.post('/registration', userRegistrationValidations, ipMiddleware, authControllers.createUser)
authRouter.post('/registration-email-resending', userEmailAuthValidations, ipMiddleware, authControllers.emailResending)
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser)

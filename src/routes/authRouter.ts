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

authRouter.post('/login', ipMiddleware, userAuthValidations,  authControllers.loginUser)
authRouter.post('/logout', refreshTokenMiddleware, authControllers.logoutUser)
authRouter.post('/refresh-token', refreshTokenMiddleware, authControllers.resendingRefreshTokens)
authRouter.post('/registration-confirmation', ipMiddleware, codeEmailAuthValidations, authControllers.confirmationEmail)
authRouter.post('/registration', ipMiddleware, userRegistrationValidations, authControllers.createUser)
authRouter.post('/registration-email-resending', userEmailAuthValidations, ipMiddleware, authControllers.emailResending)
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser)

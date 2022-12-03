import {Router} from "express";
import {authBearerMiddleware} from "../middleware/authMiddleware";
import {
    codeEmailAuthValidations, codePasswordAuthValidations, userAuthValidations,
    userEmailAuthValidations, userPasswordAuthValidations,
    userRegistrationValidations
} from "../middleware/userMiddleware/userInputMiddlewares";
import {authControllers} from "../controllers/authControllers";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {ipMiddleware} from "../middleware/ipAdresValidation";

export const authRouter = Router({})

authRouter.post('/auth/login', ipMiddleware, userAuthValidations, authControllers.loginUser.bind(authControllers))
authRouter.post('/auth/logout', refreshTokenMiddleware, authControllers.logoutUser.bind(authControllers))
authRouter.post('/auth/refresh-token', refreshTokenMiddleware, authControllers.resendingRefreshTokens.bind(authControllers))
authRouter.post('/auth/registration-confirmation', ipMiddleware, codeEmailAuthValidations, authControllers.confirmationEmail.bind(authControllers))
authRouter.post('/auth/new-password', ipMiddleware, codePasswordAuthValidations, authControllers.confirmationPassword.bind(authControllers))
authRouter.post('/auth/registration', ipMiddleware, userRegistrationValidations, authControllers.createUser.bind(authControllers))
authRouter.post('/auth/registration-email-resending', ipMiddleware, userEmailAuthValidations, authControllers.emailResending.bind(authControllers))
authRouter.post('/auth/password-recovery', ipMiddleware, userPasswordAuthValidations, authControllers.passwordResending.bind(authControllers))
authRouter.get('/auth/me', authBearerMiddleware, authControllers.getAuthUser.bind(authControllers))

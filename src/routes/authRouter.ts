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

authRouter.post('/login', ipMiddleware, userAuthValidations, authControllers.loginUser.bind(authControllers))
authRouter.post('/logout', refreshTokenMiddleware, authControllers.logoutUser.bind(authControllers))
authRouter.post('/refresh-token', refreshTokenMiddleware, authControllers.resendingRefreshTokens.bind(authControllers))
authRouter.post('/registration-confirmation', ipMiddleware, codeEmailAuthValidations, authControllers.confirmationEmail.bind(authControllers))
authRouter.post('/new-password', ipMiddleware, codePasswordAuthValidations, authControllers.confirmationPassword.bind(authControllers))
authRouter.post('/registration', ipMiddleware, userRegistrationValidations, authControllers.createUser.bind(authControllers))
authRouter.post('/registration-email-resending', ipMiddleware, userEmailAuthValidations, authControllers.emailResending.bind(authControllers))
authRouter.post('/password-recovery', ipMiddleware, userPasswordAuthValidations, authControllers.passwordResending.bind(authControllers))
authRouter.get('/me', authBearerMiddleware, authControllers.getAuthUser.bind(authControllers))

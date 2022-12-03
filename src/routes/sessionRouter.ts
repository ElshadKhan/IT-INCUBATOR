import {Router} from "express";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionControllers} from "../controllers/sessionControllers";
import {deviceIdInputValidation} from "../middleware/deviceMiddleware/deviceMiddlewares";

export const sessionRouter = Router({})

sessionRouter.get('/security/devices', refreshTokenMiddleware, sessionControllers.getAllActiveSessions.bind(sessionControllers))
sessionRouter.delete('/security/devices/:deviceId', refreshTokenMiddleware, deviceIdInputValidation, sessionControllers.deleteSessionsByDeviceId.bind(sessionControllers))
sessionRouter.delete('/security/devices', refreshTokenMiddleware, sessionControllers.deleteAllSessionsExceptOne.bind(sessionControllers))
import {Router} from "express";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionControllers} from "../controllers/sessionControllers";
import {deviceIdInputValidation} from "../middleware/deviceMiddleware/deviceMiddlewares";

export const sessionRouter = Router({})

sessionRouter.get('/devices', refreshTokenMiddleware, sessionControllers.getAllActiveSessions)
sessionRouter.delete('/devices/:deviceId', refreshTokenMiddleware, deviceIdInputValidation, sessionControllers.deleteSessionsByDeviceId)
sessionRouter.delete('/devices', refreshTokenMiddleware, sessionControllers.deleteAllSessionsExceptOne)
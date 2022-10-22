import {Router} from "express";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionsControllers} from "../controllers/deviceControllers";
import {deviceIdInputValidation} from "../middleware/deviceMiddleware/deviceMiddlewares";

export const sessionsRouter = Router({})

sessionsRouter.get('/devices', refreshTokenMiddleware, sessionsControllers.getAllActiveSessions)
sessionsRouter.delete('/devices/:deviceId', refreshTokenMiddleware, deviceIdInputValidation, sessionsControllers.deleteSessionsByDeviceId)
sessionsRouter.delete('/devices', refreshTokenMiddleware, sessionsControllers.deleteAllSessionsExceptOne)
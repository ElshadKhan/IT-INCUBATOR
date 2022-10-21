import {Router} from "express";
import {deviceIdRefreshTokenMiddleware, refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionsControllers} from "../controllers/deviceControllers";

export const sessionsRouter = Router({})

sessionsRouter.get('/devices', refreshTokenMiddleware, sessionsControllers.getAllActiveSessions)
sessionsRouter.delete('/devices', deviceIdRefreshTokenMiddleware, sessionsControllers.deleteSessionsByDeviceId)
sessionsRouter.delete('/devices/:deviceId', deviceIdRefreshTokenMiddleware, sessionsControllers.deleteAllSessionsExceptOne)
import {Router} from "express";
import {deviceIdRefreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionsControllers} from "../controllers/deviceControllers";

export const sessionsRouter = Router({})

sessionsRouter.get('/devices', deviceIdRefreshTokenMiddleware, sessionsControllers.getAllActiveSessions)
sessionsRouter.delete('/devices', deviceIdRefreshTokenMiddleware, sessionsControllers.deleteAllSessions)
sessionsRouter.delete('/devices/:deviceId', deviceIdRefreshTokenMiddleware, sessionsControllers.deleteAllSessionsExceptOne)
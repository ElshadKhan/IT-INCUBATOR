import {Router} from "express";
import {refreshTokenMiddleware} from "../middleware/refreshTokenValidation";
import {sessionsControllers} from "../controllers/deviceControllers";

export const sessionsRouter = Router({})

sessionsRouter.get('/devices', refreshTokenMiddleware, sessionsControllers.getAllActiveSessions)
sessionsRouter.delete('/devices', refreshTokenMiddleware, sessionsControllers.deleteSessionsByDeviceId)
sessionsRouter.delete('/devices/:deviceId', refreshTokenMiddleware, sessionsControllers.deleteAllSessionsExceptOne)
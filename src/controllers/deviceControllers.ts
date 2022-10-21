import {Request, Response} from "express";
import {sessionsService} from "../services/sessionsServices";
import {jwtService} from "../application/jwt-service";

export const sessionsControllers = {
    async getAllActiveSessions(req: Request, res: Response) {
        const allSessions = await sessionsService.getAllActiveSessions(req.user!.id)
        res.status(200).send(allSessions)
    },
    async deleteSessionsByDeviceId(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        const sessions = await sessionsService.deleteSessionsByDeviceId(payload.userId, req.params.deviceId);
        if (sessions) {
            res.send(204)
        } else {
            res.send(404)
        }
    },
    async deleteAllSessionsExceptOne(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        const sessions = await sessionsService.deleteAllSessionsExceptOne(payload.userId, payload.deviceId);
        if (!sessions) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}
import {Request, Response} from "express";
import {sessionsService} from "../services/sessionsServices";
import {jwtService} from "../application/jwt-service";

class SessionControllers {
    async getAllActiveSessions(req: Request, res: Response) {
        const allSessions = await sessionsService.getAllActiveSessions(req.user!.id)
        res.status(200).send(allSessions)
    }

    async deleteSessionsByDeviceId(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        const sessions = await sessionsService.deleteSessionsByDeviceId(payload.userId, req.params.deviceId);
        res.send(204)

    }

    async deleteAllSessionsExceptOne(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        await sessionsService.deleteAllSessionsExceptOne(payload.userId, payload.deviceId);
        res.send(204)
    }
}

export const sessionControllers = new SessionControllers()
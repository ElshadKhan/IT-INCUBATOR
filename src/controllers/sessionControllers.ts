import {Request, Response} from "express";
import {SessionsServices} from "../services/sessionsServices";
import {JwtService} from "../application/jwt-service";

class SessionControllers {
    private jwtService: JwtService
    private sessionsService: SessionsServices
    constructor() {
        this.jwtService = new JwtService()
        this.sessionsService = new SessionsServices()
    }
    async getAllActiveSessions(req: Request, res: Response) {
        const allSessions = await this.sessionsService.getAllActiveSessions(req.user!.id)
        res.status(200).send(allSessions)
    }

    async deleteSessionsByDeviceId(req: Request, res: Response) {
        const payload = await this.jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        const sessions = await this.sessionsService.deleteSessionsByDeviceId(payload.userId, req.params.deviceId);
        res.send(204)

    }

    async deleteAllSessionsExceptOne(req: Request, res: Response) {
        const payload = await this.jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        await this.sessionsService.deleteAllSessionsExceptOne(payload.userId, payload.deviceId);
        res.send(204)
    }
}

export const sessionControllers = new SessionControllers()
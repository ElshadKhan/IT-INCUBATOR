import {Request, Response} from "express";
import {AuthServices} from "../services/authServices";
import {JwtService} from "../application/jwt-service";
import {UserRepository} from "../repositories/userRepository";
import {SessionsServices} from "../services/sessionsServices";
import {SessionsRepository} from "../repositories/sessionsRepository";

export class AuthControllers {
    private jwtService: JwtService
    private sessionsService: SessionsServices
    private sessionsRepository: SessionsRepository
    private userRepository: UserRepository
    constructor(protected authService = new AuthServices()) {
        this.jwtService = new JwtService()
        this.sessionsService = new SessionsServices()
        this.sessionsRepository = new SessionsRepository()
        this.userRepository = new UserRepository()
    }
    async getAuthUser(req: Request, res: Response) {
        const user = {
            email: req.user!.accountData.email,
            login: req.user!.accountData.userName,
            userId: req.user!.id
        }
        res.status(200).send(user)
    }

    async loginUser(req: Request, res: Response) {
        const user = await this.authService.checkCredentials(req.body.login, req.body.password)
        if (!user) {
            res.sendStatus(401)
            return
        }

        const session = await this.sessionsService.createSession(user, req.ip, req.headers["user-agent"]!)

        res.cookie("refreshToken", session.refreshToken, {
            maxAge: 200000000,
            httpOnly: true,
            secure: true
        }).status(200).send({
            "accessToken": session.accessToken
        })
    }

    async resendingRefreshTokens(req: Request, res: Response) {
        const payload = await this.jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])

        const tokens = await this.jwtService.createJWTTokens(req.user!, payload.deviceId);
        const newLastActiveDate = await this.jwtService.getUserIdByRefreshToken(tokens.refreshToken.split(' ')[0])
        const lastActiveDate = new Date(newLastActiveDate.iat * 1000).toISOString()
        await this.sessionsService.updateSession(payload.userId, payload.deviceId, lastActiveDate)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 2000000,
            httpOnly: true,
            secure: true
        }).status(200).send({
            "accessToken": tokens.accessToken
        })
    }

    async logoutUser(req: Request, res: Response) {
        const payload = await this.jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        await this.sessionsRepository.deleteSessionsByDeviceId(payload.userId, payload.deviceId)
        res.sendStatus(204)
    }

    async createUser(req: Request, res: Response) {
        const user = await this.authService.createUser(req.body.login, req.body.password, req.body.email)
        res.status(204).send(user)
    }

    async confirmationEmail(req: Request, res: Response) {
        await this.authService.confirmationEmail(req.body.code)
        res.send(204)
    }

    async confirmationPassword(req: Request, res: Response) {
        await this.authService.confirmationPassword(req.body.newPassword, req.body.recoveryCode)
        res.send(204)
    }

    async emailResending(req: Request, res: Response) {
        await this.authService.emailResending(req.body.email)
        res.send(204)
    }

    async passwordResending(req: Request, res: Response) {
        await this.authService.passwordResending(req.body.email)
        res.send(204)
    }
}

export const authControllers = new AuthControllers()
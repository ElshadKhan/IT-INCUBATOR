import {Request, Response} from "express";
import {authService} from "../services/authServices";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
import {sessionsService} from "../services/sessionsServices";
import {sessionsRepository} from "../repositories/sessionsRepository";
export const authControllers = {
    async getAuthUser(req: any, res: Response) {
        const user = {
            email: req.user.accountData.email,
            login: req.user.accountData.userName,
            userId: req.user.id
        }
        res.status(200).send(user)
    },
    async loginUser(req: Request, res: Response) {
        const user = await authService.checkCredentials(req.body.login, req.body.password)
        if (!user) {
            res.sendStatus(401)
            return
        }

        const session = await sessionsService.createSession(user, req.ip, req.headers["user-agent"]!)

        res.cookie("refreshToken", session.refreshToken, {
            maxAge: 200000000,
            httpOnly: true,
            secure: true
        }).status(200).send({
            "accessToken": session.accessToken
        })
    },
    async resendingRefreshTokens(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])

        const tokens = await jwtService.createJWTTokens(req.user!, payload.deviceId);
        const newLastActiveDate = await jwtService.getUserIdByRefreshToken(tokens.refreshToken.split(' ')[0])
        const lastActiveDate = new Date(newLastActiveDate.iat * 1000).toISOString()
        await sessionsService.updateSession(payload.userId, payload.deviceId, lastActiveDate)

        await userRepository.addRefreshTokenToBlackList(req.cookies.refreshToken)
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 2000000,
            httpOnly: true,
            secure: true
        }).status(200).send({
                "accessToken": tokens.accessToken
        })
    },
    async logoutUser(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
        await sessionsRepository.deleteSessionsByDeviceId(payload.userId, payload.deviceId)
        await userRepository.addRefreshTokenToBlackList(req.cookies.refreshToken)
        res.sendStatus(204)
    },
    async createUser(req: Request, res: Response) {
        const user = await authService.createUser(req.body.login, req.body.password, req.body.email)
        res.status(204).send(user)
    },
    async confirmationEmail(req: Request, res: Response) {
        const user = await authService.confirmationEmail(req.body.code)
        if(user) {
            res.send(204)
        } else {
            res.status(400)
        }
    },
    async emailResending(req: Request, res: Response) {
        const user = await authService.emailResending(req.body.email)
        if(user) {
            res.send(204)
        } else {
            res.status(400)
        }
    }
}
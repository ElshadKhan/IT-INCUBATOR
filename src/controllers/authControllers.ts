import {Request, Response} from "express";
import {authService} from "../services/authServices";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
import {tokensCollection} from "../db";
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
        if (user) {
            const accessToken = await jwtService.createAccessJWT(user);
            const refreshToken = await jwtService.createRefreshJWT(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true
            })
            res.status(200).send({
                "accessToken": accessToken
            })
        } else {
            res.send(401)
        }
    },
    async resendingRefreshTokens(req: Request, res: Response) {
        const userId = await jwtService.getUserIdByToken(req.cookies.refreshToken)
        if (!userId) {
            res.sendStatus(401)
        }
        const tokenFromBlackList = await userRepository.findRefreshTokenInBlackList(req.cookies.refreshToken)
        if (!tokenFromBlackList) {
            const accessToken = await jwtService.createAccessJWT(userId);
            const refreshToken = await jwtService.createRefreshJWT(userId);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true
            })
            res.status(200).send({
                "accessToken": accessToken
            })
        } else {
            res.send(401)
        }
    },
    async logoutUser(req: Request, res: Response) {
        const userId = await jwtService.getUserIdByToken(req.cookies.refreshToken)
        if (!userId) {
            res.sendStatus(401)
        }
        const tokenFromBlackList = await userRepository.findRefreshTokenInBlackList(req.cookies.refreshToken)
        if (!tokenFromBlackList) {
            await userRepository.addRefreshTokenToBlackList(req.cookies.refreshToken)
            res.clearCookie("refreshToken")
            res.status(200)
        } else {
            res.send(401)
        }
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
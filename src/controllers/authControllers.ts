import {Request, Response} from "express";
import {authService} from "../services/authServices";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
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
                maxAge: 200000000,
                httpOnly: true,
                secure: true
            }).status(200).send({
                "accessToken": accessToken
            })

        } else {
            res.send(401)
        }
    },
    async resendingRefreshTokens(req: Request, res: Response) {
            const accessToken = await jwtService.createAccessJWT(req.user!);
            const refreshToken = await jwtService.createRefreshJWT(req.user!);
            await userRepository.addRefreshTokenToBlackList(req.cookies.refreshToken)
            res.cookie("refreshToken", refreshToken, {
                maxAge: 2000000,
                httpOnly: true,
                secure: true
            }).status(200).send({
                "accessToken": accessToken
            })
    },
    async logoutUser(req: Request, res: Response) {
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
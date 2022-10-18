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
            await userRepository.updateRefreshToken(user.id, refreshToken)
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
    async resendingTokens(req: Request, res: Response) {
        const user = await userRepository.findUserRefreshToken(req.cookies.refreshToken)
        if (user) {
            const accessToken = await jwtService.createAccessJWT(user);
            const refreshToken = await jwtService.createRefreshJWT(user);
            await userRepository.updateRefreshToken(user.id, refreshToken)
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
        const user = await userRepository.findUserById(userId)
        if (user) {
            const refreshToken = ""
            await userRepository.updateRefreshToken(user.id, refreshToken)
            res.clearCookie("refreshToken")
            res.status(200)
            return
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
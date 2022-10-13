import {Request, Response} from "express";
import {authService} from "../services/authServices";
import {jwtService} from "../application/jwt-service";
import {emailManager} from "../managers/emailManagers";
export const authControllers = {
    async getAuthUser(req: any, res: Response) {
        const user = {
            email: req.user.email,
            login: req.user.login,
            userId: req.user.id
        }
        res.status(200).send(user)
    },
    async loginUser(req: Request, res: Response) {
        const user = await authService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        } else {
            res.send(401)
        }
    },
    async authUser(req: Request, res: Response) {
        const user = await emailManager.sendEmail(req.body.email, req.body.subject, req.body.message)
        res.send(204)
    }
}
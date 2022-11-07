import {NextFunction, Request, Response} from "express";
import {JwtService} from "../application/jwt-service";
import {UserModelClass} from "../db/Schema/userSchema";
import {sessionsRepository} from "../repositories/sessionsRepository";

const jwtService = new JwtService()

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.send(401)
        return
    }
    const token = refToken.split(' ')[0]
    const user = await jwtService.getUserIdByRefreshToken(token)
    if(!user) {
        res.sendStatus(401)
        return
    }
    const findRefToken = await sessionsRepository.getSession(user.deviceId)
    if(!findRefToken || findRefToken.lastActiveDate !== new Date(user.iat * 1000).toISOString()) {
        res.sendStatus(401)
        return
    }
        req.user = await UserModelClass.findOne({id: user.userId})
        return next()


}
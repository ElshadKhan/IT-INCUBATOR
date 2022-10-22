import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
import {sessionsRepository} from "../repositories/sessionsRepository";

export const ipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip
    const findIpAttempts = await sessionsRepository.findCreateDateFromIp(ip)
    if(findIpAttempts > 4) {
        res.sendStatus(429)
        return
    }
    next()

}
export const deviceIdRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken

    const token = refToken.split(' ')[0]
    const user = await jwtService.getUserIdByRefreshToken(token)
    console.log("token", user.userId, user.deviceId, new Date(user.exp * 1000) )
    if (user) {
        req.user = await userRepository.findUserById(user)
        next()
        return
    }
    res.sendStatus(401)
}
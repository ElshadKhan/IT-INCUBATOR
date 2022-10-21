import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.send(401)
        return
    }
    const findRefToken = await userRepository.findRefreshTokenInBlackList(refToken)
    if(findRefToken) {
        res.sendStatus(401)
        return
    }
    const token = refToken.split(' ')[0]
    const user = await jwtService.getUserIdByRefreshToken(token)
    if (user) {
        req.user = await userRepository.findUserById(user)
        next()
        return
    }
    res.sendStatus(401)
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
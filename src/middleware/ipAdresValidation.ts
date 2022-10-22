import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
import {ipVerificationCollection} from "../db";

export const ipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const blockedInterval = 10000
    const connectionAt = +(new Date())
    const ip = req.ip
    const endpoint = req.url

    const isBlocked = await ipVerificationCollection.findOne({ip, endpoint, isBlocked: true, blockedDate: {$gte: (connectionAt - blockedInterval)}})
    if (isBlocked) return res.sendStatus(429)
    const connectionsCount = await ipVerificationCollection.countDocuments({ip, endpoint, connectionAt: {$gte: (connectionAt - blockedInterval)}})

    if (connectionsCount + 1> 5) {
        await ipVerificationCollection.updateOne({ip, endpoint}, {$set: {isBlocked: true, blockedDate: connectionAt}})
        return res.sendStatus(429)
    }

    await ipVerificationCollection.insertOne({ip, endpoint, connectionAt, isBlocked: false, blockedDate: null})

    return next()

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
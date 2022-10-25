import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {userRepository} from "../repositories/userRepository";
import {tokensCollection, usersCollection} from "../db";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.send(401)
        return
    }
    const findRefToken = await tokensCollection.findOne({refreshToken: refToken})
    if(findRefToken) {
        res.sendStatus(401)
        return
    }
    const token = refToken.split(' ')[0]
    const user = await jwtService.getUserIdByRefreshToken(token)
    if (user) {
        req.user = await usersCollection.findOne({id: user.userId})
        next()
        return
    }
    res.sendStatus(401)
}
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
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await userRepository.findUserById(userId)
        next()
        return
    }
    res.sendStatus(401)
}
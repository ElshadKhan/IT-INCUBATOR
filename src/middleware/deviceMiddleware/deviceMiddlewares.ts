import {NextFunction, Response} from "express";
import {sessionsCollection} from "../../db";
import {jwtService} from "../../application/jwt-service";

export const deviceIdInputValidation = async (req: any, res: Response, next: NextFunction) => {
    const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
    if(!payload){
        return res.sendStatus(401)
    }
    const comment = await sessionsCollection.findOne({userId: payload.userId, deviceId: payload.deviceId})
    if (comment?.deviceId === req.params.deviceId) return next()
    return res.sendStatus(403)
}

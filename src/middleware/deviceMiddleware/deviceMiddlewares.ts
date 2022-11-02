import {NextFunction, Response} from "express";
import {jwtService} from "../../application/jwt-service";
import {SessionModel} from "../../db/Schema/sessionSchema";

export const deviceIdInputValidation = async (req: any, res: Response, next: NextFunction) => {
    const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
    const comment = await SessionModel.findOne({deviceId: req.params.deviceId})
    if (!comment) {
        return res.sendStatus(404)
    }
    if (comment!.userId !== payload.userId) {
        return res.sendStatus(403)
    }
    return next()
}

import {NextFunction, Response} from "express";
import {JwtService} from "../../application/jwt-service";
import {SessionModelClass} from "../../db/Schema/sessionSchema";

const jwtService = new JwtService()

export const deviceIdInputValidation = async (req: any, res: Response, next: NextFunction) => {
    const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(' ')[0])
    const comment = await SessionModelClass.findOne({deviceId: req.params.deviceId})
    if (!comment) {
        return res.sendStatus(404)
    }
    if (comment.userId !== payload.userId) {
        return res.sendStatus(403)
    }
    return next()
}

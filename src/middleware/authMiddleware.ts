import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {UserModelClass} from "../db/Schema/userSchema";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const template = 'admin:qwerty'
    const authHeader = req.headers.authorization
    const base64Data = new Buffer(template);
    let base64String = base64Data.toString('base64');
    const validAuthHeader = `Basic ${base64String}`

    if (!authHeader || authHeader !== validAuthHeader) {
        res.sendStatus(401);
    } else {
        next()
    }
}
export const authBearerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
       if (!req.headers.authorization) {
           res.sendStatus(401)
           return
       }
       const token = req.headers.authorization.split(" ")[1]
       const userId = await jwtService.getUserIdByAccessToken(token)
       if (userId) {
           req.user = await UserModelClass.findOne({id: userId})
           return  next()
       }
       res.sendStatus(401)
}
export const findUserIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        next()
        return
    }
    const token = req.headers.authorization.split(" ")[1]
    const userId = await jwtService.getUserIdByAccessToken(token)
    if (userId) {
        req.user = await UserModelClass.findOne({id: userId})
        return  next()
    }
    next()
}
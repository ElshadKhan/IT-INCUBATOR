import {NextFunction, Request, Response} from "express";
import {IpVerificationModel} from "../db/Schema/ipVerificationSchema";

export const ipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const blockedInterval = 10000
    const connectionAt = +(new Date())
    const ip = req.ip
    const endpoint = req.url

    const isBlocked = await IpVerificationModel.findOne({ip, endpoint, isBlocked: true, blockedDate: {$gte: (connectionAt - blockedInterval)}})
    if (isBlocked) return res.sendStatus(429)
    const connectionsCount = await IpVerificationModel.countDocuments({ip, endpoint, connectionAt: {$gte: (connectionAt - blockedInterval)}})

    if (connectionsCount + 1> 5) {
        await IpVerificationModel.updateOne({ip, endpoint}, {$set: {isBlocked: true, blockedDate: connectionAt}})
        return res.sendStatus(429)
    }

    await IpVerificationModel.create({ip, endpoint, connectionAt, isBlocked: false, blockedDate: null})

    return next()

}
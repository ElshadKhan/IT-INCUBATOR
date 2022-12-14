import {NextFunction, Request, Response} from "express";
import {IpVerificationModelClass} from "../db/Schema/ipVerificationSchema";

export const ipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const blockedInterval = 10000
    const connectionAt = +(new Date())
    const ip = req.ip
    const endpoint = req.url

    const isBlocked = await IpVerificationModelClass.findOne({ip, endpoint, isBlocked: true, blockedDate: {$gte: (connectionAt - blockedInterval)}})
    if (isBlocked) return res.sendStatus(429)
    const connectionsCount = await IpVerificationModelClass.countDocuments({ip, endpoint, connectionAt: {$gte: (connectionAt - blockedInterval)}})

    if (connectionsCount + 1> 5) {
        await IpVerificationModelClass.updateOne({ip, endpoint}, {$set: {isBlocked: true, blockedDate: connectionAt}})
        return res.sendStatus(429)
    }

    await IpVerificationModelClass.create({ip, endpoint, connectionAt, isBlocked: false, blockedDate: null})

    return next()

}
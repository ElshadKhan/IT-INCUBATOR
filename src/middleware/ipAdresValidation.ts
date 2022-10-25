import {NextFunction, Request, Response} from "express";
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
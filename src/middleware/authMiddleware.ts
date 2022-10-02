import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const template = 'admin:qwerty'
    const authHeader = req.headers.authorization
    const base64Data = new Buffer(template);
    let base64String = base64Data.toString('base64');
    const validAuthHeader = `Basic ${base64String}`

    if (!authHeader || typeof authHeader !== "string" || authHeader !== validAuthHeader) {
        res.sendStatus(401);
    } else {
        next()
    }

    // const auth = req.headers.authorization
    // if (!auth) return res.sendStatus(401)
    // const authMethod = auth.split(' ')[0]
    // const authPayload = auth.split(' ')[1]
    // if (authMethod !== 'Basic' || authPayload !== 'YWRtaW46cXdlcnR5') return res.sendStatus(401)
    // return next()
}

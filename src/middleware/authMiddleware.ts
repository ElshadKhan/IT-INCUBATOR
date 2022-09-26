import {NextFunction, Request, Response} from "express";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const creds = 'admin:qwerty'
    const authHeader = req.headers.authorization
    const base64Data = new Buffer(creds);
    let base64String = base64Data.toString('base64');
    const validAuthHeader = `Basic ${base64String}`

    if (!authHeader || typeof authHeader !== "string" || authHeader !== validAuthHeader) {
        res.sendStatus(401);
    } else {
        next()
    }
}

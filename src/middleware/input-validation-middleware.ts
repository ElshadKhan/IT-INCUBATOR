import {NextFunction, Request, Response} from "express";

export const inputBlogValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    // const loginPass = 'admin:qwerty'
    // const base64 = new Buffer(loginPass, 'base64')
    const validAuthHeader = 'Basic YWRtaW46cXdlcnR5'

    if (!authHeader || typeof authHeader !== "string" || authHeader !== validAuthHeader) {
        console.log("401")
        res.sendStatus(401);
    } else {
        console.log("next")
        next()
    }
}

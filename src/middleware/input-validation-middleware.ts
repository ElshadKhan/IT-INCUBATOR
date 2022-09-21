import {NextFunction, Request, Response} from "express";

export const inputBlogValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || typeof authHeader !== "string"){
         return  res.sendStatus(400)
    }

    const loginPass = 'admin:qwerty'
    // const base64 = new Buffer(loginPass, 'base64')
    const validAuthHeader = 'Basic YWRtaW46cXdlcnR5'

    if (authHeader !== validAuthHeader) {
        res.sendStatus(401);
    } else {
        next()
    }
}

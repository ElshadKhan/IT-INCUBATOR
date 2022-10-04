import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errorsValid = validationResult(req)
    if (!errorsValid.isEmpty()) {
        const errorsArray = errorsValid.array({onlyFirstError: true}).map( error => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(400).send({"errorsMessages": errorsArray})
    } else {
        next()
    }
}
export const inputBlogIdValidation = async (req: Request, res: Response, next: NextFunction) => {
    const errorsValid = validationResult(req)
    if (!errorsValid.isEmpty()) {
        const errorsArray = errorsValid.array({onlyFirstError: true}).map( error => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(404).send({"errorsMessages": errorsArray})
    } else {
        next()
    }
}
export const inputAuthValidation = (req: Request, res: Response, next: NextFunction) => {
    const errorsValid = validationResult(req)
    if (!errorsValid.isEmpty()) {
        const errorsArray = errorsValid.array({onlyFirstError: true}).map( error => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(401).send({"errorsMessages": errorsArray})
    } else {
        next()
    }
}

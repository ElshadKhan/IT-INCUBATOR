import {body, param} from "express-validator";
import {inputValidation} from "../inputValidation";
import {postIdParamValidation} from "../postMiddleware/postInputMiddlewares";
import {blogQueryRepository} from "../../repositories/queryRep/blogQueryRepository";
import {commentQueryRepository} from "../../repositories/queryRep/commentQueryRepository";
import {NextFunction, Response} from "express";
import {jwtService} from "../../application/jwt-service";
import {userRepository} from "../../repositories/userRepository";

const bodyCommentValidation = body("content")
    .isString().withMessage("Field 'content' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
    .isLength({min: 20, max: 300}).withMessage("Min length of field 'content' 20 max 300.")

export const commentIdInputValidation = async (req: any, res: Response, next: NextFunction) => {
    const comment = await commentQueryRepository.findCommentById(req.params.commentId)
    if(!comment) return next()
    if (comment!.userId !== req.user.id) {
        res.sendStatus(403)
        return
    }
    return  next()
}
// export const commentIdParamValidation = param('commentId')
//     .isString().withMessage("Field 'commentId' is not a string.")





export const commentValidations = [postIdParamValidation, bodyCommentValidation, inputValidation]
export const commentIdValidations = [bodyCommentValidation, inputValidation]

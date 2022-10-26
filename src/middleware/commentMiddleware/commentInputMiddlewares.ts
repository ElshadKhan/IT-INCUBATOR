import {body} from "express-validator";
import {inputValidation} from "../inputValidation";
import {postIdParamValidation} from "../postMiddleware/postInputMiddlewares";
import {commentQueryRepository} from "../../repositories/queryRep/commentQueryRepository";
import {NextFunction, Response} from "express";
import {blogQueryRepository} from "../../repositories/queryRep/blogQueryRepository";

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
export const likeStatusInputValidation = body('likeStatus')
    .isString().withMessage("Field 'likeStatus' is not a string.")
    .custom( async (value) => {
        enum Resolutions {
            None = "None", Like = "Like", Dislike = "Dislike"
        }
        let availableResolutions: Resolutions[] = value
        const arrayResolutions  = Object.values(Resolutions)
        const result =  availableResolutions.every((element) => arrayResolutions.includes(element))
        if (!result) {
            throw new Error("Field 'likeStatus' is not correct.");
        }
        return true;
    })

export const commentValidations = [postIdParamValidation, bodyCommentValidation, inputValidation]
export const commentIdValidations = [bodyCommentValidation, inputValidation]
export const likeStatusValidations = [likeStatusInputValidation, inputValidation]


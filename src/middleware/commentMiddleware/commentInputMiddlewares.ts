import {body} from "express-validator";
import {inputValidation} from "../inputValidation";
import {postIdParamValidation} from "../postMiddleware/postInputMiddlewares";
import {CommentQueryRepository} from "../../repositories/queryRep/commentQueryRepository";
import {NextFunction, Response} from "express";

const commentQueryRepository = new CommentQueryRepository()

export enum LikeStatusEnam  {
    None = "None", Like = "Like", Dislike = "Dislike"
}

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
        const arrayResolutions  = Object.values(LikeStatusEnam)
        const result =  arrayResolutions.filter((element) => element === value)
        const likeStatus = result[0]

        if (!likeStatus) {
            throw new Error("Field 'likeStatus' is not correct.");
        }

        return true;
    })

export const commentValidations = [postIdParamValidation, bodyCommentValidation, inputValidation]
export const commentIdValidations = [bodyCommentValidation, inputValidation]
export const likeStatusValidations = [likeStatusInputValidation, inputValidation]


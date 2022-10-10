import {body, param} from "express-validator";
import {inputAuthValidation, inputValidation} from "../inputValidation";
import {postIdParamValidation} from "../postMiddleware/postInputMiddlewares";

const bodyCommentValidation = body("content")
    .isString().withMessage("Field 'content' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
    .isLength({min: 20, max: 300}).withMessage("Min length of field 'content' 20 max 300.")

export const commentIdParamValidation = param('commentId')
    .isString().withMessage("Field 'commentId' is not a string.")





export const commentValidations = [postIdParamValidation, bodyCommentValidation, inputAuthValidation]
export const commentIdValidations = [bodyCommentValidation, commentIdParamValidation,inputAuthValidation]

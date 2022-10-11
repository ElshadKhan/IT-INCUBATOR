import {body, param} from "express-validator";
import {inputValidation} from "../inputValidation";
import {blogIdInputValidation, blogIdQueryValidation} from "../blogMiddleware/blogInputMiddleware";

export const postIdParamValidation = param('postId')
    .isString().withMessage("Field 'postId' is not a string.")

const bodyTitleValidation = body("title")
    .isString().withMessage("Field 'title' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
    .isLength({min: 1, max: 30}).withMessage("Min length of field 'title' 1 max 30.")

const bodyShortDescriptionValidation = body("shortDescription")
    .isString().withMessage("Field 'shortDescription' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'shortDescription' cannot be empty.")
    .isLength({min: 1, max: 100}).withMessage("Min length of field 'shortDescription' 1 max 100.")

const bodyContentValidation = body("content")
    .isString().withMessage("Field 'content' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
    .isLength({min: 1, max: 1000}).withMessage("Min length of field 'content' 1 max 1000.")

export const postQueryValidationsBlogId = [bodyTitleValidation,
    bodyShortDescriptionValidation, bodyContentValidation, blogIdQueryValidation, inputValidation
]
export const postBodyValidationsBlogId = [bodyTitleValidation,
    bodyShortDescriptionValidation, bodyContentValidation, blogIdInputValidation, inputValidation
]

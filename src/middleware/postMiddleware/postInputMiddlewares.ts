import {body, param} from "express-validator";
import {inputValidation} from "../inputValidation";
import {blogRepository} from "../../repositories/blogRepository";

export const blogIdInputParamValidation = param('blogId')
    .isString().withMessage("Field 'blogId' is not a string.")
    .custom( async (value) => {
        const blog   = await blogRepository.findBlogById(value);
        if (!blog) {
            throw new Error("Field 'blogId' is not correct.");
        }
        return true;
    })
export const blogIdInputBodyValidation = body('blogId')
    .isString().withMessage("Field 'blogId' is not a string.")
    .custom( async (value) => {
        const blog = await blogRepository.findBlogById(value);
        if (!blog) {
            throw new Error("Field 'blogId' is not correct.");
        }
        return true;
    })

export const postValidations = [
    body("title")
        .isString().withMessage("Field 'title' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
        .isLength({min: 1, max: 30}).withMessage("Min length of field 'title' 1 max 30."),
    body("shortDescription")
        .isString().withMessage("Field 'shortDescription' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'shortDescription' cannot be empty.")
        .isLength({min: 1, max: 100}).withMessage("Min length of field 'shortDescription' 1 max 100."),
    body("content")
        .isString().withMessage("Field 'content' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
        .isLength({min: 1, max: 1000}).withMessage("Min length of field 'content' 1 max 1000."),
    inputValidation
]
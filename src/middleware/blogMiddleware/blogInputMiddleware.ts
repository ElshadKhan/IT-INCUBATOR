import {body, param} from "express-validator";
import {inputValidation} from "../inputValidation";
import {BlogQueryRepository} from "../../repositories/queryRep/blogQueryRepository";

 const blogQueryRepository = new BlogQueryRepository()

export const blogIdQueryValidation = param('blogId')
    .isString().withMessage("Field 'blogId' is not a string.")

export const blogIdInputValidation = body('blogId')
    .isString().withMessage("Field 'blogId' is not a string.")
    .custom( async (value) => {
        const blog = await blogQueryRepository.findBlogById(value);
        if (!blog) {
            throw new Error("Field 'blogId' is not correct.");
        }
        return true;
    })

export const blogValidations = [
    body("name")
        .isString().withMessage("Field 'name' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'name' cannot be empty.")
        .isLength({min: 1, max: 15}).withMessage("Min length of field 'name' 1 max 15."),
    body("youtubeUrl")
        .isString().withMessage("Field 'youtubeUrl' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'youtubeUrl' cannot be empty.")
        .isLength({min: 1, max: 100}).withMessage("Min length of field 'youtubeUrl' 1 max 100.")
        .isURL().withMessage("Field 'youtubeUrl' is invalid."),
    inputValidation
]



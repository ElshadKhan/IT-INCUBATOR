import {body} from "express-validator";
import {blogs} from "../../repositories/blogRepository";
import {inputValidation} from "../inputValidation";

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
    body('blogId')
        .isString().withMessage("Field 'blogId' is not a string.")
        .custom((value) => {
        const blog = blogs.find(b => b.id === value)
        if (!blog) {
            throw new Error("Field 'blogId' is not correct.");
        }
        return true;
    }),
    inputValidation
]



// export const postInputControlMiddleware = (req: Request, res: Response, next: NextFunction) => {
//
//     const title = req.body.title
//
//     const shortDescription = req.body.shortDescription
//
//     const content = req.body.content
//
//     const blogId = req.body.blogId
//
//     const blog = blogs.find(b => b.id === blogId);
//
//     const errors: {message: string, field: string}[] = []
//
//     if(!title || typeof title !== "string" || !title.trim() || title.length > 30) {
//         errors.push({message: 'title is wrong', field: 'title'})
//     }
//     if(!shortDescription || typeof shortDescription !== "string" || !shortDescription.trim() || shortDescription.length > 100) {
//         errors.push({message: 'shortDescription is wrong', field: 'shortDescription'})
//     }
//     if(!content || typeof content !== "string" || !content.trim() || content.length > 1000) {
//         errors.push({message: 'content is wrong', field: 'content'})
//     }
//     if(!blog || typeof blogId !== "string") {
//         errors.push({message: 'blogId is wrong', field: 'blogId'})
//     }
//     if (errors.length) {
//         return res.status(400).send({"errorsMessages": errors})
//     } else {
//         next()
//     }
// }
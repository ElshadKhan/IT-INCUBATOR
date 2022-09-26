import {body} from "express-validator";
import {inputValidation} from "../inputValidation";

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

// export const blogInputControlMiddleware = (req: Request, res: Response, next: NextFunction) => {
//
//     const name = req.body.name
//
//     const youtubeUrl = req.body.youtubeUrl
//
//     const errors: {message: string, field: string}[] = []
//
//     function isValidUrl (req: string) {
//         var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
//         return objRE.test(req);
//     }
//
//     if(!name || typeof name !== "string" || !name.trim() || name.length > 15) {
//         errors.push({message: 'name is wrong', field: 'name'})
//     }
//     if(!youtubeUrl || typeof youtubeUrl !== "string" || !youtubeUrl.trim() || youtubeUrl.length > 100 || !isValidUrl(youtubeUrl)) {
//         errors.push({message: 'youtubeUrl is wrong', field: 'youtubeUrl'})
//     }
//     if (errors.length) {
//         return res.status(400).send({"errorsMessages": errors})
//     } else {
//         next()
//     }
// }

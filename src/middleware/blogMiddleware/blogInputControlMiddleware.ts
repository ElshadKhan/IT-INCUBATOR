import {body} from "express-validator";

const nameValidator = body("name", "name is wrong").isString().trim().isLength({max: 15})
const youtubeUrlValidator = body("youtubeUrl", "youtubeUrl is wrong").isString().trim().isLength({max: 100}).isURL()

export const blogRoutValidators = [nameValidator, youtubeUrlValidator]

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

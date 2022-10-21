import {body} from "express-validator";
import {inputValidation} from "../inputValidation";

export const deviceIdValidations = [
    body("deviceId")
        .isString().withMessage("Field 'deviceId' is not a string."),
    inputValidation
]

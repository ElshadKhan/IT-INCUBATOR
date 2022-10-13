import {body} from "express-validator";
import {inputValidation} from "../inputValidation";

const loginValueValidation = body("login")
    .isString().withMessage("Field 'login' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
    .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10.")
const passwordValueValidation =body("password")
    .isString().withMessage("Field 'password' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'password' cannot be empty.")
    .isLength({min: 6, max: 20}).withMessage("Min length of field 'password' 6 max 20.")
const emailValueValidation = body("email")
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .isEmail().withMessage("Field 'email' is invalid.")
const codeValueValidation = body("code")
    .isString().withMessage("Field 'code' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'code' cannot be empty.")

export const userLoginValidations = [ loginValueValidation, passwordValueValidation, emailValueValidation,
    inputValidation
]
export const userEmailAuthValidations = [ emailValueValidation, inputValidation ]
export const codeEmailAuthValidations = [ codeValueValidation, inputValidation ]

export const userAuthValidations = [
    body("login")
        .isString().withMessage("Field 'login' is not a string."),
    body("password")
        .isString().withMessage("Field 'password' is not a string."),
    inputValidation
]

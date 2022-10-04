import {body} from "express-validator";
import {inputValidation} from "../inputValidation";

export const userValidations = [
    body("login")
        .isString().withMessage("Field 'login' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
        .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10."),
    body("password")
        .isString().withMessage("Field 'password' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'password' cannot be empty.")
        .isLength({min: 6, max: 20}).withMessage("Min length of field 'password' 6 max 20."),
    body("email")
        .isString().withMessage("Field 'email' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
        .isEmail().withMessage("Field 'email' is invalid."),
    inputValidation
]
export const userAuthValidations = [
    body("login")
        .isString().withMessage("Field 'login' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
        .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10."),
    body("password")
        .isString().withMessage("Field 'password' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'password' cannot be empty.")
        .isLength({min: 6, max: 20}).withMessage("Min length of field 'password' 6 max 20."),
    inputValidation
]

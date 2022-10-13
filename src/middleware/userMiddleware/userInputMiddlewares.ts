import {body} from "express-validator";
import {inputValidation} from "../inputValidation";
import {userRepository} from "../../repositories/userRepository";

export const confirmationCodeInputValidation = body('code')
    .isString().withMessage("Field 'code' is not a string.")
    .custom( async (value) => {
        const user = await userRepository.findUserByConfirmationCode(value);
        if (!user || user.emailConfirmation.isConfirmed || user.emailConfirmation.confirmationCode !== value || user.emailConfirmation.expirationDate < new Date()) {
            throw new Error("Field 'code' is not correct.");
        }
        return true;
    })

export const emailResendingInputValidation = body('email')
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .isEmail().withMessage("Field 'email' is invalid.")
    .custom( async (value) => {
        const user = await userRepository.findUserByConfirmationCode(value);
        if (!user) {
            throw new Error("Field 'email' is not correct.");
        }
        return true;
    })

export const emailRegistrationInputValidation = body('email')
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .isEmail().withMessage("Field 'email' is invalid.")
    .custom( async (value) => {
        const user = await userRepository.findUserByLoginOrEmail(value);
        if (user) {
            throw new Error("Field 'email' is not correct.");
        }
        return true;
    })
export const loginRegistrationInputValidation = body('login')
    .isString().withMessage("Field 'login' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
    .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10.")
    .custom( async (value) => {
        const user = await userRepository.findUserByLoginOrEmail(value);
        if (user) {
            throw new Error("Field 'login' is not correct.");
        }
        return true;
    })

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


export const userLoginValidations = [ loginValueValidation, passwordValueValidation, emailValueValidation,
    inputValidation
]
export const userRegistrationValidations = [ loginRegistrationInputValidation, passwordValueValidation, emailRegistrationInputValidation,
    inputValidation
]
export const userEmailAuthValidations = [ emailResendingInputValidation, inputValidation ]
export const codeEmailAuthValidations = [ confirmationCodeInputValidation, inputValidation ]

export const userAuthValidations = [
    body("login")
        .isString().withMessage("Field 'login' is not a string."),
    body("password")
        .isString().withMessage("Field 'password' is not a string."),
    inputValidation
]

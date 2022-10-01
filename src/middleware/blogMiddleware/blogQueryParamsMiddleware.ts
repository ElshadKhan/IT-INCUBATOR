import {query} from "express-validator";

export const blogQueryParamsValidation = [
    query("searchNameTerm")
        .isString().withMessage("Field 'searchNameTerm' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'searchNameTerm' cannot be empty."),
    query("pageNumber").isNumeric().withMessage("Field 'pageNumber' is not a number."),
    query("pageSize").isNumeric().withMessage("Field 'pageSize' is not a number."),
    query("sortBy").isString().withMessage("Field 'sortBy' is not a string."),
    query("sortDirection").isString().withMessage("Field 'sortDirection' is not a string."),
]
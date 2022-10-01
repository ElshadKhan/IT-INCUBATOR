import {query} from "express-validator";

export const postQueryParamsValidation = [
    query("pageNumber").isNumeric().withMessage("Field 'pageNumber' is not a number."),
    query("pageSize").isNumeric().withMessage("Field 'pageSize' is not a number."),
    query("sortBy").isString().withMessage("Field 'sortBy' is not a string."),
    query("sortDirection").isString().withMessage("Field 'sortDirection' is not a string."),
]
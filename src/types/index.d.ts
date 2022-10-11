import {UserDbType} from "./userTypes";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}
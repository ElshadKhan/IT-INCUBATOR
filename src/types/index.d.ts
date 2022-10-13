import {UserAccountDBType} from "./userTypes";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserAccountDBType | null
        }
    }
}
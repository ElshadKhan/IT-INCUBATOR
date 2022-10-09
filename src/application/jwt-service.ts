import {settings} from "../types/settings";
import {UserDbType} from "../types/userTypes";
import  jwt from "jsonwebtoken"


export const jwtService = {
    async createJWT(user: UserDbType) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: "1h"} )
        return {
            accessToken: token
        }
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}

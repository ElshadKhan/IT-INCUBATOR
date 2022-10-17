import {settings} from "../types/settings";
import {UserAccountDBType} from "../types/userTypes";
import  jwt from "jsonwebtoken"

export const jwtService = {
    async createAccessJWT(user: UserAccountDBType) {
        const token = jwt.sign({userId: user.id}, settings.ACCESS_JWT_TOKEN_SECRET, {expiresIn: "10sec"} )
        return token
    },
    async createRefreshJWT(user: UserAccountDBType) {
        const token = jwt.sign({userId: user.id}, settings.REFRESH_JWT_TOKEN_SECRET, {expiresIn: "20sec"} )
        return token
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.ACCESS_JWT_TOKEN_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}

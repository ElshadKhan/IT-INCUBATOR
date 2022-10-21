import {settings} from "../types/settings";
import {UserAccountDBType} from "../types/userTypes";
import  jwt from "jsonwebtoken"

export const jwtService = {
    async createJWTTokens(user: UserAccountDBType, deviceId: string) {
        const accessToken = jwt.sign({userId: user.id}, settings.ACCESS_JWT_TOKEN_SECRET, {expiresIn: "10sec"} )
        const refreshToken = jwt.sign({userId: user.id, deviceId: deviceId}, settings.REFRESH_JWT_TOKEN_SECRET, {expiresIn: "20sec"} )
        return {
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
    },
    async getUserIdByAccessToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.ACCESS_JWT_TOKEN_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },
    async getUserIdByRefreshToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.REFRESH_JWT_TOKEN_SECRET)
            return result
        } catch (error) {
            return null
        }
    }
}

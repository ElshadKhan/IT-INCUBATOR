import {sessionsRepository} from "../repositories/sessionsRepository";
import {UserAccountDBType} from "../types/userTypes";
import {v4 as uuidv4} from "uuid";
import {jwtService} from "../application/jwt-service";
import {SessionDBType} from "../types/sessionTypes";

export const sessionsService = {
    async getAllActiveSessions(userId: string) {
        return await sessionsRepository.getAllActiveSessions(userId)
    },
    async createSession(user: UserAccountDBType, ip: string, deviceName: string) {
        const userId = user.id
        const deviceId = uuidv4()
        const tokens = await jwtService.createJWTTokens(user, deviceId);
        const payload = await jwtService.getUserIdByRefreshToken(tokens.refreshToken.split(' ')[0])
        const session: SessionDBType = {
            ip: ip,
            title: deviceName,
            lastActivateDate: new Date(payload.iat * 1000),
            expiredDate: new Date(payload.exp * 1000),
            deviceId: deviceId,
            userId: userId
        }
        const sessionss = await sessionsRepository.createSession(session)
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    },
    async deleteAllSessions(commentId: string) {
        return await sessionsRepository.deleteAllSessions(commentId)
    },
    async deleteAllSessionsExceptOne(commentId: string) {
        return await sessionsRepository.deleteAllSessionsExceptOne(commentId)
    }
}
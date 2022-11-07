import {sessionsRepository} from "../repositories/sessionsRepository";
import {UserAccountDBType} from "../types/userTypes";
import {v4 as uuidv4} from "uuid";
import {jwtService} from "../application/jwt-service";
import {SessionDBType} from "../types/sessionTypes";

class SessionsServices {
    async getAllActiveSessions(userId: string) {
        return await sessionsRepository.getAllActiveSessions(userId)
    }

    async createSession(user: UserAccountDBType, ip: string, deviceName: string) {
        const userId = user.id
        const deviceId = uuidv4()
        const tokens = await jwtService.createJWTTokens(user, deviceId);
        const payload = await jwtService.getUserIdByRefreshToken(tokens.refreshToken.split(' ')[0])
        const session: SessionDBType = {
            ip: ip,
            title: deviceName,
            lastActiveDate: new Date(payload.iat * 1000).toISOString(),
            expiredDate: new Date(payload.exp * 1000).toISOString(),
            deviceId: deviceId,
            userId: userId
        }
        await sessionsRepository.createSession(session)
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }

    async updateSession(userId: string, deviceId: string, lastActiveDate: string) {
        return await sessionsRepository.updateSessions(userId, deviceId, lastActiveDate)
    }

    async deleteAllSessions() {
        return await sessionsRepository.deleteAllSessions()
    }

    async deleteSessionsByDeviceId(userId: string, deviceId: string) {
        return await sessionsRepository.deleteSessionsByDeviceId(userId, deviceId)
    }

    async deleteAllSessionsExceptOne(userId: string, deviceId: string) {
        return await sessionsRepository.deleteAllSessionsExceptOne(userId, deviceId)
    }
}

export const sessionsService = new SessionsServices()
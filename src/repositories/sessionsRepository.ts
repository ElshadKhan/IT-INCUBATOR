import {sessionsCollection} from "../db";

import {SessionDBType} from "../types/sessionTypes";

export const sessionsRepository = {
    async getAllActiveSessions(userId: string): Promise<SessionDBType | null> {
        const sessions = await sessionsCollection.find({userId: userId})
        return sessions
    },
    async createSession(session: SessionDBType): Promise<SessionDBType> {
        await sessionsCollection.insertOne(session)
        return session
    },
    async deleteAllSessions(deviceId: string) {
        const result = await sessionsCollection.deleteOne({deviceId: deviceId})
        return  result.deletedCount === 1
    },
    async deleteAllSessionsExceptOne(userId: string) {
        const result = await sessionsCollection.deleteMany({userId: userId})
        return result.deletedCount === 1
    }
}
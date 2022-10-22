import {ipVerificationCollection, sessionsCollection} from "../db";
import {IpVerificationType, SessionDBType, SessionType} from "../types/sessionTypes";

export const sessionsRepository = {
    async getAllActiveSessions(userId: string): Promise<SessionType[]> {
        const sessions = await sessionsCollection.find({userId: userId}).project({
            "_id": 0,
            "ip": 1,
            "title": 1,
            "lastActiveDate": 1.,
            "deviceId": 1
        }).toArray()
        return sessions as SessionType[]
    },
    async updateSessions(userId: string, deviceId: string, lastActiveDate: string) {
        const sessions = await sessionsCollection.updateOne({userId: userId, deviceId: deviceId}, {$set: {lastActiveDate: lastActiveDate}})
        return sessions.modifiedCount === 1
    },
    async createSession(session: SessionDBType): Promise<SessionDBType> {
        await sessionsCollection.insertOne(session)
        return session
    },
    async deleteAllSessions() {
        const result = await sessionsCollection.deleteMany({})
        return  result.deletedCount === 1
    },
    async deleteSessionsByDeviceId(userId: string, deviceId: string) {
        const result = await sessionsCollection.deleteMany({userId: userId, deviceId: deviceId})
        return  result.deletedCount === 1
    },
    async deleteAllSessionsExceptOne(userId: string, deviceId: string) {
        const result = await sessionsCollection.deleteMany({userId: userId, deviceId: {$ne: deviceId}})
        return result.deletedCount === 1
    }
}
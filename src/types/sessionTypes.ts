export type SessionDBType = {
    ip: string
    title: string
    lastActiveDate: string
    expiredDate: string
    deviceId: string
    userId: string
}
export type SessionType = {
    ip: string
    title: string
    lastActiveDate: Date
    deviceId: string
}
export type IpVerificationType = {
    ip: string
    endpoint: string
    connectionAt: number
    isBlocked: boolean
    blockedDate: null | number
}

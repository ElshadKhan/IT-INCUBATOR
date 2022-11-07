export class SessionDBType {
    constructor(public ip: string,
                public title: string,
                public lastActiveDate: string,
                public expiredDate: string,
                public deviceId: string,
                public userId: string) {
    }

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

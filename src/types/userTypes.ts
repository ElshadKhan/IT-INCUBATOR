import {SortDirection} from "../middleware/queryValidation";

export type UserDbType = {
    id: string
    login: string
    passwordHash: string
    passwordSalt: string
    email: string
    createdAt: string
}
export type UserAccountDBType = {
    id: string
    accountData: UsersAccountDataType
    emailConfirmation: EmailConfirmationType
}
export type UsersAccountDataType = {
    userName: string
    email: string
    refreshToken: string
    passwordHash: string
    passwordSalt: string
    createdAt: string
}
export type EmailConfirmationType = {
    confirmationCode: string
    expirationDate: Date
    isConfirmed: boolean
}
export type UserDto = {
    id: string
    login: string
    email: string
    createdAt: string
}
export type QueryUserType = {
    searchLoginTerm: string
    searchEmailTerm: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}
export type UsersBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<UserDto>
}

import {SortDirection} from "../middleware/queryValidation";

export type UserAccountDBType = {
    id: string
    accountData: UsersAccountDataType
    emailConfirmation: EmailConfirmationType
    passwordConfirmation: PasswordConfirmationType
}
export type UsersAccountDataType = {
    userName: string
    email: string
    passwordHash: string
    passwordSalt: string
    createdAt: string
}
export type RefreshToken = {
    refreshToken: string
}
export type EmailConfirmationType = {
    confirmationCode: string
    expirationDate: Date
    isConfirmed: boolean
}
export type PasswordConfirmationType = {
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

import {SortDirection} from "../middleware/queryValidation";

export class UserAccountDBType  {
    constructor(public id: string,
                public accountData: UsersAccountDataType,
                public emailConfirmation: EmailConfirmationType,
                public passwordConfirmation: PasswordConfirmationType,) {
    }

}
export type UsersAccountDataType = {
    userName: string
    email: string
    passwordHash: string
    passwordSalt: string
    createdAt: string
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
export class UsersBusinessType  {
    constructor(public pagesCount: number,
                public page: number,
                public pageSize: number,
                public totalCount: number,
                public items: Array<UserDto>) {
    }

}

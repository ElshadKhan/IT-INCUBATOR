
export type UserDbType = {
    id: string
    login: string
    password: string
    passwordHash: string
    passwordSalt: string
    email: string
    createdAt: string
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
    sortDirection: string
}

export type UsersBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<UserDto>
}

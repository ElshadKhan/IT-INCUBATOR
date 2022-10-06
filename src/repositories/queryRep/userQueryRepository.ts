import {QueryUserType, UsersBusinessType} from "../../types/userTypes";
import {usersCollection} from "../../db";

export const userQueryRepository = {
    async findUsers(userQueryParamsFilter: QueryUserType): Promise<UsersBusinessType> {
        const searchLoginTerm =  userQueryParamsFilter.searchLoginTerm
        const searchEmailTerm =  userQueryParamsFilter.searchEmailTerm
        const skip = userQueryParamsFilter.pageSize * (userQueryParamsFilter.pageNumber - 1)
        const sort = userQueryParamsFilter.sortBy
        const limit = userQueryParamsFilter.pageSize
        const sortDirection: any = userQueryParamsFilter.sortDirection
        const users = await usersCollection.find({$or: [{login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountUsers = await usersCollection.find( {$or: [{login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).count()
        const userDto = {
            "pagesCount": (Math.ceil(totalCountUsers/limit)),
            "page": userQueryParamsFilter.pageNumber,
            "pageSize": limit,
            "totalCount": totalCountUsers,
            "items": users.map(u => (
                {
                    id: u.id,
                    login: u.login,
                    email: u.email,
                    createdAt: u.createdAt
                }
            ))}
        return userDto
    }
}
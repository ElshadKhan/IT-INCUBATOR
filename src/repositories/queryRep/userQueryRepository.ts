import {QueryUserType, UsersBusinessType} from "../../types/userTypes";
import {usersCollection} from "../../db";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";

export const userQueryRepository = {
    async findUsers({searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection}: QueryUserType): Promise<UsersBusinessType> {
        const users = await usersCollection.find({$or: [{login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).sort(sortBy, sortDirection).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).toArray()
        const totalCountUsers = await usersCollection.find( {$or: [{login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).count()
        const userDto = {
            "pagesCount": getPagesCounts(totalCountUsers, pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCountUsers,
            "items": users.map(u => (
                {
                    id: u.id,
                    login: u.accountData.userName,
                    email: u.accountData.email,
                    createdAt: u.accountData.createdAt
                }
            ))}
        return userDto
    }
}
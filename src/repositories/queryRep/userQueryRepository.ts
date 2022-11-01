import {QueryUserType, UsersBusinessType} from "../../types/userTypes";
import {usersCollection} from "../../db";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {UserModel} from "../../db/dbMongoose";

export const userQueryRepository = {
    async findUsers({searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection}: QueryUserType): Promise<UsersBusinessType> {
        const users = await UserModel.find({$or: [{'accountData.userName': {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {'emailConfirmation.confirmationCode': {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).sort([[ sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountUsers = await UserModel.find( {$or: [{'accountData.userName': {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {'emailConfirmation.confirmationCode': {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).count()
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
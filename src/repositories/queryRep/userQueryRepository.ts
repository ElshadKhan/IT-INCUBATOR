import {QueryUserType, UserAccountDBType, UsersBusinessType} from "../../types/userTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {UserModelClass} from "../../db/Schema/userSchema";

export const userQueryRepository = {
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserAccountDBType | null> {
        return UserModelClass.findOne({$or: [{'accountData.userName': loginOrEmail}, {'accountData.email': loginOrEmail}]}).lean()
    },
    async findUserByEmailConfirmationCode(code: string): Promise<UserAccountDBType | null> {
        return UserModelClass.findOne({'emailConfirmation.confirmationCode': code}).lean()
    },
    async findUserByPasswordConfirmationCode(code: string): Promise<UserAccountDBType | null> {
        return UserModelClass.findOne({'passwordConfirmation.confirmationCode': code}).lean()
    },
    async findOneUser(id: string ): Promise<UserAccountDBType | null> {
        return UserModelClass.findOne({id: id}).lean()
    },
    async findUsers({searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection}: QueryUserType): Promise<UsersBusinessType> {
        const users = await UserModelClass.find({$or: [{'accountData.userName': {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {'emailConfirmation.confirmationCode': {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).sort([[ sortBy, sortDirection]]).skip(getSkipNumber(pageNumber,pageSize)).limit(pageSize).lean()
        const totalCountUsers = await UserModelClass.find( {$or: [{'accountData.userName': {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {'emailConfirmation.confirmationCode': {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}).count()
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
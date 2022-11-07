import {UserAccountDBType} from "../types/userTypes";
import {UserModelClass} from "../db/Schema/userSchema";

export class UserRepository {
    async createUser(newUser: UserAccountDBType): Promise<UserAccountDBType> {
        await UserModelClass.create(newUser)
        return newUser
    }
    async addRefreshTokenToBlackList(token: string): Promise<string> {
        await UserModelClass.create( {refreshToken: token})
        return token
    }
    async updateEmailConfirmation(id: string) {
        let result = await UserModelClass.updateOne({id: id},
            {$set: {'emailConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    }
    async updatePasswordConfirmation(id: string) {
        let result = await UserModelClass.updateOne({id: id},
            {$set: {'passwordConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    }
    async updateEmailResendingCode(id: string , code: string) {
        let result = await UserModelClass.updateOne({id: id},
            {$set: {'emailConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    }
    async updatePasswordResendingCode(id: string , code: string) {
        let result = await UserModelClass.updateOne({id: id},
            {$set: {'passwordConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    }
    async updatePassword(id: string , passwordHash: string) {
        let result = await UserModelClass.updateOne({id: id},
            {$set: {"accountData.passwordHash": passwordHash}})
        return  result.modifiedCount === 1
    }
    async deleteUser(id: string) {
        const result = await UserModelClass.deleteOne({id:id})
        return  result.deletedCount === 1
    }
    async deleteAllUsers() {
        const result = await UserModelClass.deleteMany({})
        return result.deletedCount === 1
    }
}


import {UserAccountDBType} from "../types/userTypes";
import {UserModel} from "../db/Schema/userSchema";

export const userRepository = {
    async createUser(newUser: UserAccountDBType): Promise<UserAccountDBType> {
        await UserModel.create(newUser)
        return newUser
    },
    async addRefreshTokenToBlackList(token: string): Promise<string> {
        await UserModel.create( {refreshToken: token})
        return token
    },
    async updateEmailConfirmation(id: string) {
        let result = await UserModel.updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    },
    async updatePasswordConfirmation(id: string) {
        let result = await UserModel.updateOne({id: id}, {$set: {'passwordConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    },
    async updateEmailResendingCode(id: string ,code: string) {
        let result = await UserModel.updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    },
    async updatePasswordResendingCode(id: string ,code: string) {
        let result = await UserModel.updateOne({id: id}, {$set: {'passwordConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    },
    async updatePassword(id: string ,passwordHash: string) {
        let result = await UserModel.updateOne({id: id}, {$set: {"accountData.passwordHash": passwordHash}})
        return  result.modifiedCount === 1
    },
    async deleteUser(id: string) {
        const result = await UserModel.deleteOne({id:id})
        return  result.deletedCount === 1
    },
    async deleteAllUsers() {
        const result = await UserModel.deleteMany({})
        return result.deletedCount === 1
    }
}
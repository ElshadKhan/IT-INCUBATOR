import {tokensCollection, usersCollection} from "../db";
import {UserAccountDBType} from "../types/userTypes";

export const userRepository = {
    async createUser(newUser: UserAccountDBType): Promise<UserAccountDBType> {
        await usersCollection.insertOne(newUser)
        return newUser
    },
    async updateEmailConfirmation(id: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    },
    async updatePasswordConfirmation(id: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'passwordConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    },
    async addRefreshTokenToBlackList(token: string): Promise<string> {
        await tokensCollection.insertOne( {refreshToken: token})
        return token
    },
    async updateEmailResendingCode(id: string ,code: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    },
    async updatePasswordResendingCode(id: string ,code: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'passwordConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    },
    async updatePassword(id: string ,passwordHash: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {"accountData.passwordHash": passwordHash}})
        return  result.modifiedCount === 1
    },
    async findUserByLoginOrEmail(loginOrEmail: string, ): Promise<UserAccountDBType | null> {
        const result = await usersCollection.findOne({$or: [{'accountData.userName': loginOrEmail}, {'accountData.email': loginOrEmail}]})
        return  result
    },
    async findUserByEmailConfirmationCode(code: string, ): Promise<UserAccountDBType | null> {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': code})
        return  user
    },
    async findUserByPasswordConfirmationCode(code: string, ): Promise<UserAccountDBType | null> {
        const user = await usersCollection.findOne({'passwordConfirmation.confirmationCode': code})
        return  user
    },
    async deleteUser(id: string) {
        const result = await usersCollection.deleteOne({id:id})
        return  result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return
    }
}
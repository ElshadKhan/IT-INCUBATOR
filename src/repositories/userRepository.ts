import {usersCollection} from "../db";
import {UserAccountDBType, UserDto} from "../types/userTypes";

export const userRepository = {
    async createUser(newUser: UserAccountDBType): Promise<UserDto> {
        await usersCollection.insertOne(newUser)
        const userDto = {
            id: newUser.id,
            login: newUser.accountData.userName,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }
        return userDto
    },
    async updateConfirmation(id: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return  result.modifiedCount === 1
    },
    async updateResendingCode(id: string ,code: string) {
        let result = await usersCollection.updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
        return  result.modifiedCount === 1
    },
    async findUserById(id: string): Promise<UserAccountDBType | null> {
        const result = await usersCollection.findOne({id: id})
        return  result
    },
    async findUserByLoginOrEmail(loginOrEmail: string, ): Promise<UserAccountDBType | null> {
        const result = await usersCollection.findOne({$or: [{'accountData.userName': loginOrEmail}, {'accountData.email': loginOrEmail}]})
        return  result
    },
    async findUserByConfirmationCode(code: string, ): Promise<UserAccountDBType | null> {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': code})
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
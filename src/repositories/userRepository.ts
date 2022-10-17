import {usersCollection} from "../db";
import {UserAccountDBType} from "../types/userTypes";

export const userRepository = {
    async createUser(newUser: UserAccountDBType): Promise<UserAccountDBType> {
        await usersCollection.insertOne(newUser)
        return newUser
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
import {usersCollection} from "../db";
import {UserDbType} from "../types/userTypes";

export const userRepository = {
    async createUser(newUser: UserDbType): Promise<UserDbType> {
        await usersCollection.insertOne(newUser)
        return newUser
    },
    async loginUser(login: string, password: string): Promise<UserDbType | null> {
        const result = await usersCollection.findOne({login:  login, password:  password})
        return  result
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
import {usersCollection} from "../db";
import {UserDbType, UserDto} from "../types/userTypes";

export const userRepository = {
    async createUser(newUser: UserDbType): Promise<UserDto> {
        await usersCollection.insertOne(newUser)
        const userDto = {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
        return userDto
    },
    async findUserById(id: string): Promise<UserDbType | null> {
        const result = await usersCollection.findOne({id: id})
        return  result
    },
    async findUserByLogin(login: string): Promise<UserDbType | null> {
        const result = await usersCollection.findOne({login:  login})
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
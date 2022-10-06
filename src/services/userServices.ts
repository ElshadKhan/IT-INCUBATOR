import {userRepository} from "../repositories/userRepository";
import {UserDbType, UserDto} from "../types/userTypes";

export const userService = {
    async createUser(login: string, password: string, email: string): Promise<UserDto> {
        const newUser = {

            id: String(+new Date()),
            login: login,
            password: password,
            email: email,
            createdAt: new Date().toISOString()
        }
        await userRepository.createUser(newUser)
        const userDto = {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
        return userDto
    },
    async loginUser(login: string, password: string): Promise<UserDbType | null> {
        return await userRepository.loginUser(login, password)
    },
    async deleteUser(id: string) {
        return await userRepository.deleteUser(id)
    },
    async deleteAllUsers() {
        return await userRepository.deleteAllUsers()
    }
}
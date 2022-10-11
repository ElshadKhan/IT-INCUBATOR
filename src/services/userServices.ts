import {userRepository} from "../repositories/userRepository";
import {UserDto} from "../types/userTypes";
import  bcrypt from "bcrypt"
import {_generateHash} from "../helpers/helpFunctions";

export const userService = {
    async createUser(login: string, password: string, email: string): Promise<UserDto> {
        const passwordSalt = await bcrypt.genSalt(4)
        const passwordHash = await _generateHash(password, passwordSalt)
        const newUser = {
            id: String(+new Date()),
            login: login,
            password: password,
            email: email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }
        return  await userRepository.createUser(newUser)
    },
    async deleteUser(id: string) {
        return await userRepository.deleteUser(id)
    },
    async deleteAllUsers() {
        return await userRepository.deleteAllUsers()
    }
}
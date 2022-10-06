import {userRepository} from "../repositories/userRepository";
import {UserDbType, UserDto} from "../types/userTypes";
import  bcrypt from "bcrypt"

export const userService = {
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkCredentials(login: string, password: string) {
        const user = await userRepository.findUserByLogin(login)
        if(!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash) {return false}
        return true
    },
    async createUser(login: string, password: string, email: string): Promise<UserDto> {
        const passwordSalt = await bcrypt.genSalt(4)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser = {
            id: String(+new Date()),
            login: login,
            password: password,
            email: email,
            passwordHash,
            passwordSalt,
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
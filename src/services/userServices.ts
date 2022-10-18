import {userRepository} from "../repositories/userRepository";
import {UserAccountDBType} from "../types/userTypes";
import  bcrypt from "bcrypt"
import {_generateHash} from "../helpers/helpFunctions";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";

export const userService = {
    async createUser(login: string, password: string, email: string) {
        const passwordSalt = await bcrypt.genSalt(4)
        const passwordHash = await _generateHash(password, passwordSalt)
        const newUser: UserAccountDBType = {
            id: String(+new Date()),
            accountData: {
                userName: login,
                email: email,
                passwordHash,
                passwordSalt,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                isConfirmed: false
            }
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
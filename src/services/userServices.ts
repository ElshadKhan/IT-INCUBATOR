import {UserRepository} from "../repositories/userRepository";
import {UserAccountDBType} from "../types/userTypes";
import  bcrypt from "bcrypt"
import {_generateHash} from "../helpers/helpFunctions";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {randomUUID} from "crypto";

export class UserServices {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }
    async createUser(login: string, password: string, email: string) {
        const passwordSalt = await bcrypt.genSalt(4)
        const passwordHash = await _generateHash(password, passwordSalt)
        const newUser = new UserAccountDBType(
            String(+new Date()),
            {
                userName: login,
                email: email,
                passwordHash,
                passwordSalt,
                createdAt: new Date().toISOString()
            }, {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                isConfirmed: false
            }, {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 2, minutes: 2}),
                isConfirmed: false
            })
        await this.userRepository.createUser(newUser)
        return newUser
    }
    async deleteUser(id: string) {
        return await this.userRepository.deleteUser(id)
    }
    async deleteAllUsers() {
        return await this.userRepository.deleteAllUsers()
    }
}

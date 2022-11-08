import {UserRepository} from "../repositories/userRepository";
import {UserAccountDBType} from "../types/userTypes";
import {inject, injectable} from 'inversify';
import  bcrypt from "bcrypt"
import {_generateHash} from "../helpers/helpFunctions";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";

@injectable()
export class UserServices {
    constructor(@inject(UserRepository)protected userRepository: UserRepository) {
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
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                isConfirmed: false
            }, {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 2, minutes: 2}),
                isConfirmed: false
            })
        await this.userRepository.createUser(newUser)
        return {
            id: newUser.id,
            login: newUser.accountData.userName,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }
    }
    async deleteUser(id: string) {
        return await this.userRepository.deleteUser(id)
    }
    async deleteAllUsers() {
        return await this.userRepository.deleteAllUsers()
    }
}

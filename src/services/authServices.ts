import {userRepository} from "../repositories/userRepository";
import {_generateHash} from "../helpers/helpFunctions";
import {emailManager} from "../managers/emailManagers";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid"
import add from "date-fns/add"
import {UserAccountDBType} from "../types/userTypes";

export const authService = {
    async createUser(login: string, password: string, email: string) {
        const passwordSalt = await bcrypt.genSalt(4)
        const passwordHash = await _generateHash(password, passwordSalt)
        const user: UserAccountDBType = {
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
        await userRepository.createUser(user)
        const result = await emailManager.sendEmailConfirmationMessage(user)
        return result
    },
    async emailResending(email: string) {
        const user = await userRepository.findUserByLoginOrEmail(email)
        if(!user) return null
        const subject = uuidv4()
        await emailManager.emailResendingConfirmationMessage(email, subject)
        return user
    },
    async confirmationEmail (code: string): Promise<boolean> {
        let user = await userRepository.findUserByConfirmationCode(code)
        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if(user.emailConfirmation.confirmationCode !== code) return false
        if(user.emailConfirmation.expirationDate < new Date()) return false

        let result = await userRepository.updateConfirmation(user.id)
        return result
    },
    async checkCredentials(login: string, password: string) {
        const user = await userRepository.findUserByLoginOrEmail(login)
        if(!user) return false
        const passwordHash = await _generateHash(password, user.accountData.passwordSalt)
        if(user.accountData.passwordHash !== passwordHash) {return false}
        return user
    }
}
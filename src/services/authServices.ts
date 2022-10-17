import {userRepository} from "../repositories/userRepository";
import {_generateHash} from "../helpers/helpFunctions";
import {emailManager} from "../managers/emailManagers";
import {v4 as uuidv4} from "uuid"
import {userService} from "./userServices";

export const authService = {
    async createUser(login: string, password: string, email: string) {
        const newUser = await userService.createUser(login, password, email)
        const result = await emailManager.sendEmailConfirmationMessage(newUser)
        return result
    },
    async emailResending(email: string) {
        const user = await userRepository.findUserByLoginOrEmail(email)
        if(!user) return null
        const subject = uuidv4()
        await userRepository.updateResendingCode(user.id, subject)
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
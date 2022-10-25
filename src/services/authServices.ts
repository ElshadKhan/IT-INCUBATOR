import {userRepository} from "../repositories/userRepository";
import {_generateHash} from "../helpers/helpFunctions";
import {emailManager} from "../managers/emailManagers";
import {v4 as uuidv4} from "uuid"
import {userService} from "./userServices";
import {passwordManager} from "../managers/passwordManagers";

export const authService = {
    async createUser(login: string, password: string, email: string) {
        const newUser = await userService.createUser(login, password, email)
        const result = await emailManager.sendEmailConfirmationMessage(newUser)
        return result
    },
    async emailResending(email: string) {
        const user = await userRepository.findUserByLoginOrEmail(email)
        if(!user) return null
        const code = uuidv4()
        await userRepository.updateEmailResendingCode(user.id, code)
        await emailManager.emailResendingConfirmationMessage(email, code)
        return user
    },
    async passwordResending(email: string) {
        const user = await userRepository.findUserByLoginOrEmail(email)
        if(!user) return null
        const code = uuidv4()
        await userRepository.updatePasswordResendingCode(user.id, code)
        await passwordManager.passwordResendingConfirmationMessage(email, code)
        return user
    },
    async confirmationEmail (code: string): Promise<boolean> {
        let user = await userRepository.findUserByEmailConfirmationCode(code)
        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if(user.emailConfirmation.confirmationCode !== code) return false
        if(user.emailConfirmation.expirationDate < new Date()) return false

        let result = await userRepository.updateEmailConfirmation(user.id)
        return result
    },
    async confirmationPassword (newPassword: string, recoveryCode: string): Promise<boolean> {
        let user = await userRepository.findUserByPasswordConfirmationCode(recoveryCode)
        if(!user) return false
        if(user.passwordConfirmation.isConfirmed) return false
        if(user.passwordConfirmation.confirmationCode !== recoveryCode) return false
        if(user.passwordConfirmation.expirationDate < new Date()) return false

        const passwordHash = await _generateHash(newPassword, user.accountData.passwordSalt)

        await userRepository.updatePasswordConfirmation(user.id)
        await userRepository.updatePassword(user.id, passwordHash)

        return true
    },
    async checkCredentials(login: string, password: string) {
        const user = await userRepository.findUserByLoginOrEmail(login)
        if(!user) return false
        const passwordHash = await _generateHash(password, user.accountData.passwordSalt)
        if(user.accountData.passwordHash !== passwordHash) {return false}
        return user
    }
}
import {UserRepository} from "../repositories/userRepository";
import {_generateHash} from "../helpers/helpFunctions";
import {EmailManagers} from "../managers/emailManagers";
import {v4 as uuidv4} from "uuid"
import {UserServices} from "./userServices";
import {PasswordManagers} from "../managers/passwordManagers";
import {UserQueryRepository} from "../repositories/queryRep/userQueryRepository";

export class AuthServices {
    private emailManager: EmailManagers
    private userRepository: UserRepository
    private userQueryRepository: UserQueryRepository
    private userService: UserServices
    private passwordManager: PasswordManagers
    constructor() {
        this.emailManager = new EmailManagers()
        this.userRepository = new UserRepository()
        this.userQueryRepository = new UserQueryRepository()
        this.userService = new UserServices()
        this.passwordManager = new PasswordManagers()
    }
    async createUser(login: string, password: string, email: string) {
        const newUser = await this.userService.createUser(login, password, email)
        const result = await this.emailManager.sendEmailConfirmationMessage(newUser)
        return result
    }

    async emailResending(email: string) {
        const user = await this.userQueryRepository.findUserByLoginOrEmail(email)
        if (!user) return null
        const code = uuidv4()
        await this.userRepository.updateEmailResendingCode(user.id, code)
        await this.emailManager.emailResendingConfirmationMessage(email, code)
        return user
    }

    async passwordResending(email: string) {
        const user = await this.userQueryRepository.findUserByLoginOrEmail(email)
        if (!user) return null
        const code = uuidv4()
        await this.userRepository.updatePasswordResendingCode(user.id, code)
        await this.passwordManager.passwordResendingConfirmationMessage(email, code)
        return user
    }

    async confirmationEmail(code: string): Promise<boolean> {
        let user = await this.userQueryRepository.findUserByEmailConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false

        let result = await this.userRepository.updateEmailConfirmation(user.id)
        return result
    }

    async confirmationPassword(newPassword: string, recoveryCode: string): Promise<boolean> {
        let user = await this.userQueryRepository.findUserByPasswordConfirmationCode(recoveryCode)
        if (!user) return false
        if (user.passwordConfirmation.isConfirmed) return false
        if (user.passwordConfirmation.confirmationCode !== recoveryCode) return false
        if (user.passwordConfirmation.expirationDate < new Date()) return false

        const passwordHash = await _generateHash(newPassword, user.accountData.passwordSalt)

        await this.userRepository.updatePasswordConfirmation(user.id)
        await this.userRepository.updatePassword(user.id, passwordHash)

        return true
    }

    async checkCredentials(login: string, password: string) {
        const user = await this.userQueryRepository.findUserByLoginOrEmail(login)
        if (!user) return false
        const passwordHash = await _generateHash(password, user.accountData.passwordSalt)
        if (user.accountData.passwordHash !== passwordHash) {
            return false
        }
        return user
    }
}


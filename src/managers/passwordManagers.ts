import {UserAccountDBType} from "../types/userTypes";
import {passwordAdapter} from "../adapters/passwordAdapter";

export const passwordManager = {
    async sendPasswordConfirmationMessage(user: UserAccountDBType) {
        const userMessage = await passwordAdapter.sendPassword(user.accountData.email, user.passwordConfirmation.confirmationCode)
        return userMessage
    },
    async passwordResendingConfirmationMessage(email: string, code: string) {
        const userMessage = await passwordAdapter.sendPassword(email, code)
        return userMessage
    }
}
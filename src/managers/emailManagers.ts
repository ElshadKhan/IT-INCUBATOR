import {emailAdapter} from "../adapters/emailAdapter";
import {UserAccountDBType} from "../types/userTypes";

export const emailManager = {
    async sendEmailConfirmationMessage(user: UserAccountDBType) {
        const userMessage = await emailAdapter.sendEmail(user.accountData.email, user.emailConfirmation.confirmationCode)
        return userMessage
    },
    async emailResendingConfirmationMessage(email: string, subject: string) {
        const userMessage = await emailAdapter.sendEmail(email, subject)
        return userMessage
    }
}
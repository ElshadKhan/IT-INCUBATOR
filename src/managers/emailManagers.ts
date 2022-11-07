import {EmailAdapter} from "../adapters/emailAdapter";
import {UserAccountDBType} from "../types/userTypes";

export class EmailManagers {
    private emailAdapter: EmailAdapter
    constructor() {
        this.emailAdapter = new EmailAdapter()
    }
    async sendEmailConfirmationMessage(user: UserAccountDBType) {
        const userMessage = await this.emailAdapter.sendEmail(user.accountData.email, user.emailConfirmation.confirmationCode)
        return userMessage
    }

    async emailResendingConfirmationMessage(email: string, code: string) {
        const userMessage = await this.emailAdapter.sendEmail(email, code)
        return userMessage
    }
}


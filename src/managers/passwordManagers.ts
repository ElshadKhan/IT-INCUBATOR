import {passwordAdapter} from "../adapters/passwordAdapter";

class PasswordManagers {
    async passwordResendingConfirmationMessage(email: string, code: string) {
        const userMessage = await passwordAdapter.sendPassword(email, code)
        return userMessage
    }
}

export const passwordManager = new PasswordManagers()
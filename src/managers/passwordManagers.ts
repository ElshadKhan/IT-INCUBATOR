import {passwordAdapter} from "../adapters/passwordAdapter";

export const passwordManager = {
    async passwordResendingConfirmationMessage(email: string, code: string) {
        const userMessage = await passwordAdapter.sendPassword(email, code)
        return userMessage
    }
}
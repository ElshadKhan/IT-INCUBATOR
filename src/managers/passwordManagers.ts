import {PasswordAdapter} from "../adapters/passwordAdapter";

export class PasswordManagers {
    private passwordAdapter: PasswordAdapter
    constructor() {
        this.passwordAdapter = new PasswordAdapter()
    }
    async passwordResendingConfirmationMessage(email: string, code: string) {
        const userMessage = await this.passwordAdapter.sendPassword(email, code)
        return userMessage
    }
}


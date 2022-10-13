import {emailAdapter} from "../adapters/emailAdapter";

export const emailManager = {
    async sendEmail(email: string, subject: string, message: string) {
        const user = await emailAdapter.sendEmail(email, subject, message)
        return user
    }
}
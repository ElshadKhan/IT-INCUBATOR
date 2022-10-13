import nodemailer from 'nodemailer'

export const emailAdapter = {
    async sendEmail(email: string, subject: string) {
        const transport = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'khanakhmedov.elshad@gmail.com',
                pass: 'jywuqaepczorwvso'
            }
        });
        let info = await transport.sendMail({
            from: 'Elshad <khanakhmedov.elshad@gmail.com>',
            to: email,
            subject: `https://some-front.com/confirm-registration?code=${subject}`,
            html: "message",
        });
        return info.messageId
    }
}
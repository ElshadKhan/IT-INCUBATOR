import nodemailer from 'nodemailer'

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'khanakhmedov.elshad@gmail.com',
                pass: 'jywuqaepczorwvso'
            }
        });
        let info = await transport.sendMail({
            from: 'Elshad <khanakhmedov.elshad@gmail.com>',
            to: email,
            subject: subject,
            html: message,
        });
        return info
    }
}
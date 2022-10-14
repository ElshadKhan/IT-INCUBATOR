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
            subject: `Back-end`,
            html: `<h1>Thank for your registration</h1>\n <div>To finish registration please follow the link below:\n   <a href='https://somesite.com/confirm-email?code=${subject}'>complete registration</a>\n</div>`,
        });
        return info.messageId
    }
}
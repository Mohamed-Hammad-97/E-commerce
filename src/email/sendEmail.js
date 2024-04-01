import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplate.js';

export async function sendEmail(options) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mohamedhammad2997@gmail.com",
            pass: "ngya msae lplg awxf",
        },
    });

    const info = await transporter.sendMail({
        from: 'mohamedhammad2997@gmail.com',
        to: options.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemplate(options.api) // html body
    });

    console.log("Message sent: %s", info.messageId);
}

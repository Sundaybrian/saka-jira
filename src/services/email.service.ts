import { Service, Inject } from "typedi";
import { IUser } from "../interfaces/IUser";
import sendEmail from "../utils/email";

@Service()
export default class MailService {
    constructor() {}

    public async sendVerificationEmail(account, origin) {
        let message;
        if (origin) {
            const verifyUrl = `${origin}/auth/verify-email?token=${account.verificationToken}`;
            message = `<p> Please click the below link to verify your email address:</p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>
            `;
        } else {
            message = `<p>Please use the below token to verify your email address with the <code>/auth/verify-email</code> api route:</p>
                       <p><code>${account.verificationToken}</code></p>`;
        }

        const data = {
            to: account.email,
            subject: "Sign-up verification API - Verify Email",
            html: `<h4>Verify Email</h4>
            <p>Thanks for registering!</p>
            ${message}`,
        };

        await sendEmail(data);
    }

    public async sendAlreadyRegisteredEmail(email: string, origin) {
        let message;
        if (origin) {
            message = `<p>If you don't know your password please visit the <a href="${origin}/auth/forgot-password">forgot password</a> page.</p>`;
        } else {
            message = `<p>If you don't know your password you can reset it via the <code>/auth/forgot-password</code> api route.</p>`;
        }

        const data = {
            to: email,
            subject: "Sign-up Verification API - Email Already Registered",
            html: `<h4>Email Already Registered</h4>
                   <p>Your email <strong>${email}</strong> is already registered.</p>
                   ${message}`,
        };
        await sendEmail(data);
    }
}

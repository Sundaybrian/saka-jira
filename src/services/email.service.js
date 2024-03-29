const EmailClient = require("../utils/email");

class MailService {
    constructor() {}

    static async sendVerificationEmail(account, origin) {
        let message;
        if (origin) {
            const verifyUrl = `${origin}/verify-email?token=${account.verification_token}`;
            message = `<p> Please click the below link to verify your email address:</p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>
            `;
        } else {
            message = `<p>Please use the below token to verify your email address with the <code>/auth/verify-email</code> api route:</p>
                       <p><code>${account.verification_token}</code></p>`;
        }

        const data = {
            to: account.email,
            subject: "Sign-up verification API - Verify Email",
            html: `<h4>Verify Email</h4>
            <p>Thanks for registering!</p>
            ${message}`,
        };

        await EmailClient(data);
    }

    static async sendAlreadyRegisteredEmail(email, origin) {
        let message;
        if (origin) {
            message = `<p>If you don't know your password please visit the <a href="https://portal.urady.tech/forgot-password">forgot password</a> page.</p>`;
        } else {
            message = `<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>`;
        }

        const data = {
            to: email,
            subject: "Sign-up Verification API - Email Already Registered",
            html: `<h4>Email Already Registered</h4>
                   <p>Your email <strong>${email}</strong> is already registered.</p>
                   ${message}`,
        };
        await EmailClient(data);
    }

    static async sendPasswordResetEmail(account, origin) {
        let message;
        if (origin) {
            const resetUrl = `https://portal.urady.tech/reset-password?token=${account.resetToken}`;
            message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
        } else {
            message = `<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                       <p><code>${account.resetToken}</code></p>`;
        }

        await EmailClient({
            to: account.email,
            subject: "Sign-up Verification API - Reset Password",
            html: `<h4>Reset Password Email</h4>
                   ${message}`,
        });
    }
}

module.exports = MailService;

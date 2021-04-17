require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const apikey =
    process.env.NODE_ENV == "production"
        ? "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"
        : "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";

sgMail.setApiKey(apikey);

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = "Uraditech@gmail.com" }) {
try {
    const msg = {
        to,
        subject,
        html,
        from,
    };

    await sgMail.send(msg);
} catch (error) {
    throw error
}

}

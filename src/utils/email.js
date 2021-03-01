const sgMail = require("@sendgrid/mail");
const apikey =
    process.env.NODE_ENV == "production"
        ? "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"
        : process.env.SENDGRID_API_KEY;

sgMail.setApiKey(apikey);

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = "uradytech@gmail.com" }) {
    const msg = {
        to,
        subject,
        html,
        from,
    };

    await sgMail.send(msg);
}

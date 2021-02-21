require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sendEmail;

async function sendEmail({
    to,
    subject,
    html,
    from = "sundaypriest@outlook.com",
}) {
    const msg = {
        to,
        subject,
        html,
        from,
    };

    await sgMail.send(msg);
}

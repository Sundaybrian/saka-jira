const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

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

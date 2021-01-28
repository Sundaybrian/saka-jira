const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// const nodemailer = require("nodemailer");
// const config = require("../config.json");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = "test@example.com" }) {
    const msg = {
        to,
        subject,
        html,
        from,
    };

    await sgMail.send(msg);
}

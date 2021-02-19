const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
    "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"
);

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

    if (process.env.NODE_ENV == "test") {
        console.log("email sent..." + " " + msg.to);
    } else {
        await sgMail.send(msg);
    }
}

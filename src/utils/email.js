const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//     "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"
// );

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

    await sgMail.send(msg);
}

const EmailService = require("../../services/email.service");
const {
    sendWelcomeEmail,
    sendAlreadyRegisteredEmail,
    sendPasswordResetEmail,
} = require("../emailHelpers");

module.exports = function (agenda) {
    agenda.define(
        "send-welcome-email",
        { priority: "high", concurrency: 10 },
        sendWelcomeEmail // reference to the handler, but not executing it!
    );

    agenda.define(
        "send-already-registered-email",
        { priority: "low", concurrency: 10 },
        sendAlreadyRegisteredEmail
    );

    agenda.define(
        "send-password-reset-email",
        { priority: "high", concurrency: 10 },
        sendPasswordResetEmail
    );
};

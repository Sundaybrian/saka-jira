const SendWelcomeEmail = require("./sendWelcomeEmail");

module.exports = ({ agendajs }) => {
    agendajs.define(
        "send-welcome-email",
        { priority: "high", concurrency: 10 },
        new SendWelcomeEmail().handler // reference to the handler, but not executing it!
    );

    agendajs.start();
};

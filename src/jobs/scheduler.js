const agenda = require("./agenda");

module.exports = {
    scheduleWelcomeEmail: async ({ account, origin }) => {
        await agenda.schedule("in 10 minutes", "send-welcome-email", {
            account,
            origin,
        });
    },

    scheduleAlreadyRegisteredEmail: async ({ email, origin }) => {
        await agenda.schedule(
            "in 10 minutes",
            "send-already-registered-email",
            {
                email,
                origin,
            }
        );
    },
};
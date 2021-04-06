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

    schedulePassswordResetEmail: async ({ account, origin }) => {
        await agenda.schedule("in 5 minutes", "send-password-reset-email", {
            account,
            origin,
        });
    },
};

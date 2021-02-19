const agenda = require("./agenda");

module.exports = {
    scheduleWelcomeEmail: async ({ account, origin }) => {
        await agenda.schedule("in 5 seconds", "send-welcome-email", {
            account,
            origin,
        });
    },
};

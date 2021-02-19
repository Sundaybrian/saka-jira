const Agenda = require("agenda");
const SendWelcomeEmail = require("./sendWelcomeEmail");

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI,
        collection: process.env.AGENDA_DB_COLLECTION,
        options: { useUnifiedTopology: true },
    },
    processEvery: process.env.AGENDA_POOL_TIME,
    maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
});

agenda.define(
    "send-welcome-email",
    { priority: "high", concurrency: 10 },
    SendWelcomeEmail // reference to the handler, but not executing it!
);

agenda.start();

module.exports = agenda;

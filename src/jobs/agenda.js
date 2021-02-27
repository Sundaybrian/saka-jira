require("dotenv").config();
const Agenda = require("agenda");
const {
    sendWelcomeEmail,
    sendAlreadyRegisteredEmail,
} = require("./sendWelcomeEmail");

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI,

        collection: process.env.AGENDA_DB_COLLECTION,
        options: { useUnifiedTopology: true },
    },
    processEvery: "20 seconds",
    maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
});

agenda
    .on("ready", () => console.log("Agenda started!"))
    .on("error", () => console.log("Agenda connection error!"));

// defiine jobs to run
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

agenda.start();

module.exports = agenda;

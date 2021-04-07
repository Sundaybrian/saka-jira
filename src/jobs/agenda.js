require("dotenv").config();
const { Agenda } = require("agenda");
const {
    sendWelcomeEmail,
    sendAlreadyRegisteredEmail,
    sendPasswordResetEmail,
} = require("./sendWelcomeEmail");

const url =
    process.env.NODE_ENV == "production"
        ? "mongodb+srv://Administrator:8NGru82Q9tL6UkX@urady.zdq3f.mongodb.net/uradyagendajsjobs?retryWrites=true&w=majority"
        : process.NODE_ENV == "local"
        ? process.env.MONGODB_URI_LOCAL
        : process.env.MONGODB_URI;

const agenda = new Agenda({
    db: {
        address: url,
        collection: process.env.AGENDA_DB_COLLECTION,
        options: { useUnifiedTopology: true },
    },
    processEvery: "20 seconds",
    maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
});

agenda
    .on("ready", () => console.log("Agenda started!"))
    .on("error", () => console.log("Agenda connection error!"))
    .on("fail", (err, job) => {
        console.log(`Job failed with error: ${err.message}`);
        console.error(err);
    });

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

agenda.start();

// (async function () {
//     // defiine jobs to run
// })();

module.exports = agenda;

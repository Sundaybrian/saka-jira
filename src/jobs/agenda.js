require("dotenv").config();
const { Agenda } = require("agenda");

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

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(",") : [];

jobTypes.forEach((type) => {
    require("./uradyjobs/" + type)(agenda);
});

if (jobTypes.length) {
    agenda
        .on("ready", () => console.log("Agenda started!"))
        .on("error", () => console.log("Agenda connection error!"))
        .on("fail", (err, job) => {
            console.log(`Job failed with error: ${err.message}`);
            console.error(err);
        });

    agenda.start(); // Returns a promise, which should be handled appropriately
}

module.exports = agenda;

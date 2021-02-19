const Agenda = require("agenda");
const config = require("../config");

module.exports = () => {
    const agenda = new Agenda({
        db: {
            address: process.env.MONGODB_URI,
            collection: process.env.AGENDA_DB_COLLECTION,
            options: { useUnifiedTopology: true },
        },
        processEvery: process.env.AGENDA_POOL_TIME,
        maxConcurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    });

    return agenda;
};

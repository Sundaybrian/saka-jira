const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    console.log("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    /**
     * Your secret sauce
     */
    JWT_SECRET: process.env.JWT_SECRET,
    /**
     * Mailgun email credentials
     */
    emails: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    },

    /**
     * Agenda.js stuff
     */
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    },

    mongoUri: process.env.MONGODB_URI,
};

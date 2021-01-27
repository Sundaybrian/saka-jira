import dotenv from "dotenv";

dotenv.config();

export default {
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
};

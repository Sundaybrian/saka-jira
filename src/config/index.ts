const dotenv = require("dotenv");

dotenv.config();

export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    mailGun: {},
};

// Update with your config settings.
require("dotenv").config();
// const parse = require("pg-connection-string").parse;
// const pgconfig = parse(process.env.DATABASE_URL);
// pgconfig.ssl = { rejectUnauthorized: false };

module.exports = {
    test: {
        client: "pg",
        // debug: true,
        connection: {
            // host: "127.0.0.1",
            database: process.env.POSTGRES_DB_TEST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds",
        },
    },

    // development: {
    //     client: "pg",
    //     connection: pgconfig,
    //     migrations: {
    //         directory: __dirname + "/db/migrations",
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10,
    //     },

    //     seeds: {
    //         directory: __dirname + "/db/seeds",
    //     },
    // },

    local: {
        client: "pg",
        connection: {
            host: "db",
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds/production",
        },
    },

    production: {
        client: "pg",
        connection:
            "postgres://uradypostgresu:uradypostgrespass@uradyjobsdbinstance.cl6vfm4enqho.eu-central-1.rds.amazonaws.com:5432/uradyjobsdb",

        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds/production",
        },
    },
};

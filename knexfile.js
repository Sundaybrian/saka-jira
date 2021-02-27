// Update with your config settings.
require("dotenv").config();

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

    development: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds",
        },
    },

    local: {
        client: "pg",
        connection: {
            // host: "127.0.0.1",
            database: process.env.POSTGRES_DB,
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

    production: {
        client: "pg",
        connection:
            "postgres://uradypostgresu:uradypostgrespass@uradyjobsdbinstance.cl6vfm4enqho.eu-central-1.rds.amazonaws.com:5432/uradyjobsdb",
        // connection: {
        //     host: process.env.RDS_HOSTNAME,
        //     database: process.env.RDS_DB_NAME,
        //     user: process.env.RDS_USERNAME,
        //     password: process.env.RDS_PASSWORD,
        // },
        // pool: {
        //     min: 2,
        //     max: 10,
        // },
        migrations: {
            directory: __dirname + "/db/migrations",
        },

        seeds: {
            directory: __dirname + "/db/seeds/production",
        },
    },
};

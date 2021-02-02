const tableNames = require("../../src/constants/tableNames");

const {
    addDefaultColumns,
    references,
    referencesCustomPk,
    url,
    addDefaultGeoLocations,
} = require("../../src/utils/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    // starting with order of dependency
    await knex.schema.createTable(tableNames.freelancer, (table) => {
        table.increments().notNullable();
        references(table, tableNames.user, null, true).index("userID");
        references(table, tableNames.industry, null, false);
        table.string("description", 1000);
        url(table, "website_url");
        addDefaultGeoLocations(table);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.hiring_manager, (table) => {
        table.increments().notNullable();
        references(table, tableNames.user, null, true);
        table.string("description", 1000);
        url(table, "website_url");
        table.boolean("active").defaultTo(true);
        addDefaultGeoLocations(table);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(
        tableNames.freelancer_subscriptions,
        (table) => {
            references(table, tableNames.freelancer, null, true);
            table.primary(["freelancer_id"]);
            table.datetime("expiry_date");
            addDefaultColumns(table);
        }
    );

    await knex.schema.createTable(tableNames.has_skill, (table) => {
        table.increments().notNullable();
        references(table, tableNames.freelancer, null, true);
        references(table, tableNames.skill, null, true);
        table.unique(['freelancer_id',"skill_id"]);
    });

    await knex.schema.createTable(tableNames.freelancer_payments, (table) => {
        table.increments().notNullable();
        referencesCustomPk(
            table,
            tableNames.freelancer_subscriptions,
            null,
            "freelancer_id",
            true
        );
        references(table, tableNames.subscription_type, null, true);
        table.integer("amount").notNullable();
        table.string("transaction_receipt_number", 100).notNullable();
        table.string("payment_merchant", 100);
        table.string("account_reference_number", 100).notNullable();
        addDefaultColumns(table);
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await Promise.all(
        [
            tableNames.freelancer,
            tableNames.hiring_manager,
            tableNames.freelancer_subscriptions,
            tableNames.has_skill,
            tableNames.freelancer_payments,
        ]
            .reverse()
            .map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};

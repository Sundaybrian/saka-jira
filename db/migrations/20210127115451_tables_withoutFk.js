const tableNames = require("../../src/constants/tableNames");

const {
    addDefaultColumns,
    addDefaultColumnsUser,
} = require("../../src/utils/tableUtils");

/**
 * @param {import('knex')} knex
 */

exports.up = async function (knex) {
    // starting with tables without fk references
    await Promise.all([
        knex.schema.createTable(tableNames.user, (table) => {
            addDefaultColumnsUser(table);
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.refresh_token, (table) => {
            table.string("token");
            table.dateTime("expires");
            table.string("createdByIp");
            table.dateTime("revoked");
            table.string("revokedByIp");
            table.string("replacedByToken");
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.subscription_type, (table) => {
            table.increments().notNullable();
            table.string("name", 25).notNullable();
            table.string("description", 250);
            table.integer("amount").notNullable();
            table.enum("subscription_duration", [
                "Day",
                "Week",
                "Month",
                "Year",
            ]);
            table.integer("duration_in_days");
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.job_status, (table) => {
            table.increments().notNullable();
            table.string("job_status_name", 25).notNullable();
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.industry, (table) => {
            table.increments().notNullable();
            table.string("industry_name", 100).notNullable();
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.skill, (table) => {
            table.increments().notNullable();
            table.string("skill_name", 50).notNullable();
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.proposal_status, (table) => {
            table.increments().notNullable();
            table.string("proposal_status_name", 50).notNullable();
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.payment_type, (table) => {
            table.increments().notNullable();
            table.string("payment_type_name", 50).notNullable();
            addDefaultColumns(table);
        }),
    ]);
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    // drop in any order since they are independent
    await Promise.all(
        [
            tableNames.user,
            tableNames.refresh_token,
            tableNames.subscription_type,
            tableNames.job_status,
            tableNames.industry,
            tableNames.skill,
            tableNames.proposal_status,
            tableNames.payment_type,
        ].map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};

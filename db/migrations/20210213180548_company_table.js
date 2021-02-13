const {
    addDefaultColumns,
    references,
    url,
    email,
} = require("../../src/utils/tableUtils");
const tableNames = require("../../src/constants/tableNames");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    await knex.schema.createTable(tableNames.company, (table) => {
        table.increments().notNullable();
        table.string("name").notNullable();
        url(table, "logo_url");
        table.string("description", 1000).notNullable();
        table.boolean("active").defaultTo(true);
        url(table, "website_url");
        email(table, "email").notNullable();
        table.boolean("active").defaultTo(true);
        references(table, tableNames.user, "owner", true);
        addDefaultColumns(table);
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(tableNames.company);
};

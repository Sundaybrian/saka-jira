const tableNames = require("../../src/constants/tableNames");

const {
    addDefaultColumns,
    url,
    references,
} = require("../../src/utils/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    await knex.schema.createTable(tableNames.company_docs, (table) => {
        table.increments().notNullable();
        references(table, tableNames.company, "company", true);
        table.string("document_type").notNullable();
        table.string("description", 500).notNullable();
        table.string("document_number");
        url(table, "document_url");
        addDefaultColumns(table);
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(tableNames.company_docs);
};

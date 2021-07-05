const tableNames = require("../../src/constants/tableNames");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    await knex.schema.table(tableNames.job, (table) => {
        table.text("text_data").defaultTo("");
        table.jsonb("quill_data");
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await knex.schema.table(tableNames.job, (table) => {
        table.dropColumn("text_data");
        table.dropColumn("quill_data");
    });
};

const { addDefaultColumns, references } = require("../../src/utils/tableUtils");
const tableNames = require("../../src/constants/tableNames");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    await knex.schema.createTable(tableNames.other_skills, (table) => {
        table.increments().notNullable();
        table.string("skill_name").notNullable();
        references(table, tableNames.user, "freelancer", true);
        addDefaultColumns(table);
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(tableNames.other_skills);
};

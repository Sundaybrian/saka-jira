const tableNames = require("../../src/constants/tableNames");

const { references } = require("../../src/utils/tableUtils");

exports.up = async function (knex) {
    await knex.schema.table(tableNames.refresh_token, (table) => {
        table.increments().notNullable();
        references(table, tableNames.user, "account", true);
        table.index("token");
    });
};

exports.down = async function (knex) {
    await knex.schema.table(tableNames.refresh_token, (table) => {
        table.dropColumn("account_id");
        table.dropIndex("token");
    });
};

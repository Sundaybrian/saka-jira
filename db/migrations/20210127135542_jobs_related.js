const tableNames = require("../../src/constants/tableNames");

const {
    addDefaultColumns,
    addDefaultGeoLocations,
    references,
    url,
} = require("../../src/utils/tableUtils");

/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    // starting with order of dependency
    await knex.schema.createTable(tableNames.job, (table) => {
        table.increments().notNullable();
        table.string("title", 100).notNullable();
        table.string("description", 1000).notNullable();
        table.string("main_skill", 100);
        references(table, tableNames.hiring_manager, null, true);
        references(table, tableNames.job_status, null, true);
        references(table, tableNames.industry, null, true);
        url(table, "website_url");
        table.dateTime("start_date").notNullable();
        table.dateTime("end_date").notNullable();
        table.integer("budget_range_min").notNullable().defaultTo(5000);
        table.integer("budget_range_max").notNullable().defaultTo(20000);
        addDefaultGeoLocations(table);
        references(table, tableNames.payment_type, null, false);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.proposal, (table) => {
        table.increments().notNullable();
        references(table, tableNames.job, null, true);
        references(table, tableNames.freelancer, null, true);
        references(
            table,
            tableNames.proposal_status,
            "current_proposal_status",
            true
        );
        table.unique(["job_id", "freelancer_id"]);
        table.string("client_comment", 1500);
        table.enum("client_rating", [1, 2, 3, 4, 5]);
        table.string("freelancer_comment", 1500);
        table.enum("freelancer_rating", [1, 2, 3, 4, 5]);
        url(table, "website_url");
        table.integer("payment_amount");
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.proposal_history, (table) => {
        table.increments().notNullable();
        references(table, tableNames.proposal, null, true);
        references(table, tableNames.proposal_status, null, true);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.contract, (table) => {
        table.increments().notNullable();
        references(table, tableNames.freelancer, null, true);
        references(table, tableNames.proposal_status, null, true);
        references(table, tableNames.hiring_manager, null, true);
        references(table, tableNames.proposal, null, true);
        addDefaultColumns(table);
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = async function (knex) {
    await Promise.all(
        [
            tableNames.job,
            tableNames.proposal,
            tableNames.proposal_history,
            tableNames.contract,
        ]
            .reverse()
            .map((tableName) => knex.schema.dropTableIfExists(tableName))
    );
};

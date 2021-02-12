const tableNames = require("../../src/constants/tableNames");

const { references, url } = require("../../src/utils/tableUtils");

exports.up = async function (knex) {
    await knex.schema.table(tableNames.proposal_history, (table) => {
        references(table, tableNames.job, null, true);
        references(table, tableNames.freelancer, null, true).index();
        table.integer("client_rating").defaultTo(1);
        table.string("client_comment", 1500).defaultTo("no comment");
        table.string("freelancer_comment", 1500).defaultTo("no comment");
        table.integer("freelancer_rating").defaultTo(1);
        url(table, "website_url");
        table.integer("payment_amount");
        // references(table, tableNames.company, null, false);
    });
};

exports.down = async function (knex) {
    await knex.schema.table(tableNames.proposal_history, (table) => {
        table.dropColumn("job_id");
        table.dropColumn("freelancer_id");
        table.dropColumn("client_comment");
        table.dropColumn("client_rating");
        table.dropColumn("freelancer_comment");
        table.dropColumn("freelancer_rating");
        table.dropColumn("website_url");
        table.dropColumn("payment_amount");
    });
};

const tableNames = require("../../src/constants/tableNames");

const {
    references,
    url,
} = require("../../src/utils/tableUtils");

exports.up = async function(knex) {
    await knex.schema.table(tableNames.proposal_history, (table) => {
        references(table, tableNames.job, null, true);
        references(table, tableNames.freelancer, null, true).index();
        table.string("client_comment", 1500);
        table.enum("client_rating", [1, 2, 3, 4, 5]);
        table.string("freelancer_comment", 1500);
        table.enum("freelancer_rating", [1, 2, 3, 4, 5]);
        url(table, "website_url");
        table.integer("payment_amount");
        // references(table, tableNames.company, null, false);
    });
};

exports.down = function(knex) {
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

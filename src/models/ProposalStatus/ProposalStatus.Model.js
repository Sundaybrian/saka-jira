const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
// const db = require("../../db");
const schema = require("./proposalStatus.schema.json");

class ProposalStatus extends Model {
    static get tableName() {
        return tableNames.proposal_status;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = ProposalStatus;

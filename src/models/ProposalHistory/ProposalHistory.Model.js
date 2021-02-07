const { Model } = require("objection");
const Cursor = require("../cursorPagination");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./proposalHistory.schema.json");

class ProposalHistory extends Cursor(Model) {
    static get tableName() {
        return tableNames.proposal_history;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = ProposalHistory;
            query.select(
                ref("id"),
                ref("proposal_id"),
                ref("proposal_status_id"),
                ref("created_at"),
                ref("updated_at")
            );
        },
    };

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        const Proposal = require("../Proposal/Proposal.Model");
        const ProposalStatus = require("../ProposalStatus/ProposalStatus.Model");

        return {
            proposal: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Proposal,
                join: {
                    from: `${tableNames.proposal}.proposal_id`,
                    to: `${tableNames.proposal}.id`,
                },
            },
            proposalStatus: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: ProposalStatus,
                join: {
                    from: `${tableNames.proposal_history}.proposal_status_id`,
                    to: `${tableNames.proposal_status}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = ProposalHistory;

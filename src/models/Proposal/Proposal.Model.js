const { Model } = require("objection");
const Cursor = require("../cursorPagination");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./proposal.schema.json");

class Proposal extends Cursor(Model) {
    static get tableName() {
        return tableNames.job;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = Proposal;
            query.select(
                ref("id"),
                ref("job_id"),
                ref("freelancer_id"),
                ref("client_comment"),
                ref("client_rating"),
                ref("freelancer_comment"),
                ref("freelancer_rating"),
                ref("payment_amount"),
                ref("current_proposal_status"),
                ref("created_at"),
                ref("updated_at")
            );
        },
    };

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        const Job = require("../Job/Job.Model");
        const Freelancer = require("../Freelancer/Freelancer.Model");
        const ProposalStatus = require("../ProposalStatus/ProposalStatus.Model");

        return {
            job: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Job,
                join: {
                    from: `${tableNames.proposal}.job_id`,
                    to: `${tableNames.job}.id`,
                },
            },
            freelancer: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.proposal}.freelancer_id`,
                    to: `${tableNames.freelancer}.id`,
                },
            },
            proposalStatus: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: ProposalStatus,
                join: {
                    from: `${tableNames.proposal}.current_proposal_status`,
                    to: `${tableNames.proposal_status}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Proposal;
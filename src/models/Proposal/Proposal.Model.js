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

    static async afterInsert({ items, inputItems, relation, context }) {
        const ProposalHistory = require("../ProposalHistory/ProposalHistory.Model");
        try {
            const { current_proposal_status_id, id } = inputItems[0];

            const proposal_history = {
                proposal_status_id: current_proposal_status_id,
                proposal_id: id,
            };
            // creating a history trail on bid submission
            const history = await ProposalHistory.query().insert(
                proposal_history
            );
        } catch (error) {
            throw error;
        }
    }

    static async beforeUpdate({ items, inputItems, relation }) {
        const ProposalHistory = require("../ProposalHistory/ProposalHistory.Model");
        try {
            // items:      [{ id: 1, firstName: 'Jennifer' }]
            // inputItems: [{ lastName: 'Aniston' }]
            // relation:   none

            const { id } = items[0];
            const { current_proposal_status_id } = inputItems[0];

            const proposal_history = {
                proposal_status_id: current_proposal_status_id,
                proposal_id: id,
            };
            // creating a history trail on bid update
            const history = await ProposalHistory.query().insert(
                proposal_history
            );
        } catch (error) {
            throw error;
        }
    }

    static get relationMappings() {
        const Job = require("../Job/Job.Model");
        const Freelancer = require("../Freelancer/Freelancer.Model");
        const ProposalHistory = require("../ProposalHistory/ProposalHistory.Model");

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

            history: {
                relation: Model.HasManyRelation,
                modelClass: ProposalHistory,
                join: {
                    from: `${tableNames.proposal}.id`,
                    to: `${tableNames.proposal_history}.proposal_id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Proposal;

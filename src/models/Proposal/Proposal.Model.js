const { Model } = require("objection");
const Cursor = require("../cursorPagination");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./proposal.schema.json");

class Proposal extends Cursor(Model) {
    static get tableName() {
        return tableNames.proposal;
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
                ref("current_proposal_status_id"),
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
            //             {job_id: 4,
            //   freelancer_id: 1,
            //   current_proposal_status_id: 1,
            //   id: 4}

            const {
                current_proposal_status_id,
                id,
                job_id,
                freelancer_id,
            } = inputItems[0];

            // creating a history trail on bid submission
            const proposal_history = {
                proposal_status_id: current_proposal_status_id,
                proposal_id: id,
                job_id,
                freelancer_id,
            };
            // creating a history trail on bid submission

            const history = await ProposalHistory.query().insert(
                proposal_history
            );
        } catch (error) {
            throw error;
        }
    }

    static async afterUpdate({ items, inputItems, relation }) {
        const ProposalHistory = require("../ProposalHistory/ProposalHistory.Model");
        try {
            // items:      [{ id: 1, firstName: 'Jennifer' }]
            // inputItems: [{ lastName: 'Aniston' }]
            // relation:   none

            const {
                current_proposal_status_id,
                id,
                job_id,
                freelancer_id,
                client_comment,
                client_rating,
                freelancer_comment,
                freelancer_rating,
                website_url,
                payment_amount,
            } = inputItems[0];

            console.log("items:     ", items);
            console.log("inputItems:", inputItems);

            const proposal_history = {
                proposal_status_id: current_proposal_status_id,
                proposal_id: id,
                job_id,
                freelancer_id,
                freelancer_rating: parseInt(freelancer_rating),
                client_comment,
                client_rating: parseInt(client_rating),
                freelancer_comment,
                website_url,
                payment_amount,
            };

            // creating a history trail on bid update
            const history = await ProposalHistory.query().insert(
                proposal_history
            );
        } catch (error) {
            throw error;
        }
    }

    // static async beforeUpdate({ items, inputItems, relation }) {
    //     console.log("items:     ", items);
    //     console.log("inputItems:", inputItems);
    //     console.log("relation:  ", relation ? relation.name : "none");
    // }

    static get relationMappings() {
        const Job = require("../Job/Job.Model");
        const Freelancer = require("../Freelancer/Freelancer.Model");
        const ProposalHistory = require("../ProposalHistory/ProposalHistory.Model");
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

            proposalStatus: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProposalStatus,
                join: {
                    from: `${tableNames.proposal}.current_proposal_status_id`,
                    to: `${tableNames.proposal_status}.id`,
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

            // histories: {
            //     relation: Model.HasManyRelation,
            //     modelClass: ProposalHistory,
            //     join: {
            //         from: `${tableNames.proposal}.id`,
            //         // through: {
            //         //     modelClass: ProposalHistory,
            //         //     from: `${tableNames.proposal_history}.proposal_id`,
            //         //     to: `${tableNames.proposal_history}.proposal_status_id`,
            //         // },
            //         to: `${tableNames.proposal_history}.proposal_id`,
            //     },
            // },
        };
    }
}

Model.knex(db);

module.exports = Proposal;

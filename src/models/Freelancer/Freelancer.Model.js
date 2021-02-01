const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./freelancer.schema.json");
const FreelancerSubscriptionService = require("../../services/freelancerSubscription.service");

class Freelancer extends Model {
    static get tableName() {
        return tableNames.freelancer;
    }

    static get jsonSchema() {
        return schema;
    }

    static async afterInsert({ items, inputItems, relation, context }) {
        try {
            // inputs items will be the carry over from userModel freelancer insertions
            // [ { user_id: 5, industry_id: 1, id: 3 } ]

            // fetching inserted freelancer and creating  a subscription
            const { id: freelancer_id } = inputItems[0];
            const expiry_date = new Date().toISOString();

            const f = await FreelancerSubscriptionService.createFreelancerSubscription(
                freelancer_id,
                expiry_date
            );

            console.log(f);
        } catch (error) {
            throw error;
        }
    }

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const User = require("../User/User.Model");
        const Industry = require("../Industry/Industry.Model");

        return {
            user: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.freelancer}.user_id`,
                    to: `${tableNames.user}.id`,
                },
            },
            industry: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Industry,
                join: {
                    from: `${tableNames.freelancer}.industry_id`,
                    to: `${tableNames.industry}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Freelancer;

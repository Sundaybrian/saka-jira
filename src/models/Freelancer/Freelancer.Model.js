const { Model } = require("objection");
const Cursor = require("../cursorPagination");
const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./freelancer.schema.json");
const FreelancerSubscriptionService = require("../../services/freelancerSubscription.service");

class Freelancer extends Cursor(Model) {
    static get tableName() {
        return tableNames.freelancer;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = Freelancer;
            query.select(
                ref("id"),
                ref("user_id"),
                ref("latitude"),
                ref("longitude")
            );
        },
    };

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
        } catch (error) {
            throw error;
        }
    }

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const User = require("../User/User.Model");
        const Industry = require("../Industry/Industry.Model");
        const HasSkill = require("../HasSkill/HasSkill.Model");

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

            skills: {
                // ManyToManyRelation: Use this relation when the model is related to a list of other models through a join table
                relation: Model.HasManyRelation,
                modelClass: HasSkill,
                join: {
                    from: `${tableNames.freelancer}.id`,

                    to: `${tableNames.has_skill}.freelancer_id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Freelancer;

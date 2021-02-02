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
        } catch (error) {
            throw error;
        }
    }

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const User = require("../User/User.Model");
        const Industry = require("../Industry/Industry.Model");
        const Skill = require("../Skill/Skill.Model");

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
                relation: Model.ManyToManyRelation,
                modelClass: Skill,
                join: {
                    from: `${tableNames.freelancer}.id`,
                    // ManyToMany relation needs the `through` object
                    // to describe the join table.
                    through: {
                        // If you have a model class for the join table
                        // you need to specify it like this:
                        // modelClass: PersonMovie,
                        from: `${tableNames.has_skill}.freelancer_id`,
                        to: `${tableNames.has_skill}.skill_id`,
                    },
                    to: `${tableNames.skill}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Freelancer;

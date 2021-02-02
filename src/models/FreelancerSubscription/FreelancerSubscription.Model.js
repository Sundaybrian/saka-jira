const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./freelancerSubscription.schema.json");

class FreelancerSubscription extends Model {
    static get tableName() {
        return tableNames.freelancer_subscriptions;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const Freelancer = require("../Freelancer/Freelancer.Model");

        return {
            freelancer: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.freelancer_subscriptions}.freelancer_id`,
                    to: `${tableNames.freelancer}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = FreelancerSubscription;

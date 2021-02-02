const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./subscriptionType.schema.json");

class SubscriptionType extends Model {
    static get tableName() {
        return tableNames.subscription_type;
    }

    static get jsonSchema() {
        return schema;
    }
}

Model.knex(db);
module.exports = SubscriptionType;

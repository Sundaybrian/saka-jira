const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");

const schema = require("./subscriptionType.schema.json");

class SubscriptionType extends Model {
    static get tableName() {
        return tableNames.subscription_type;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = SubscriptionType;

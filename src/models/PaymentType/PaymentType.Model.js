const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./paymentType.schema.json");

class PaymentType extends Model {
    static get tableName() {
        return tableNames.payment_type;
    }

    static get jsonSchema() {
        return schema;
    }
}

Model.knex(db);

module.exports = PaymentType;

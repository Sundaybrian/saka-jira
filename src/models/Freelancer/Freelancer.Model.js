const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
// const db = require("../../db");
const schema = require("./freelancer.schema.json");

class Freelancer extends Model {
    static get tableName() {
        return tableNames.freelancer;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = Freelancer;

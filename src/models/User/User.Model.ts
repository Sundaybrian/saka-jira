const { Model } = require("objection");

const tableNames = require("../../../src/constants/tableNames");
const db = require("../../db");
const schema = require("./user.schema.json");

class User extends Model {
    static get tableName() {
        return tableNames.user;
    }

    static get jsonSchema() {
        return schema;
    }
}

Model.knex(db);

module.exports = User;

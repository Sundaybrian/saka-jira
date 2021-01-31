const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./skill.schema.json");

class Skill extends Model {
    static get tableName() {
        return tableNames.skill;
    }

    static get jsonSchema() {
        return schema;
    }
}

Model.knex(db);

module.exports = Skill;

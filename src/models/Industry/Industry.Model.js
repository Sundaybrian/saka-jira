const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./industry.schema.json");

class JobStatus extends Model {
    static get tableName() {
        return tableNames.industry;
    }

    static get jsonSchema() {
        return schema;
    }
}

Model.knex(db);
module.exports = JobStatus;

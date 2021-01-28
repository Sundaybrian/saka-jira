const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
// const db = require("../../db");
const schema = require("./jobStatus.schema.json");

class JobStatus extends Model {
    static get tableName() {
        return tableNames.job_status;
    }

    static get jsonSchema() {
        return schema;
    }
}

module.exports = JobStatus;

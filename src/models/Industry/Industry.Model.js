const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./industry.schema.json");

class Industry extends Model {
    static get tableName() {
        return tableNames.industry;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
          const { ref } = Industry;
          query.select(ref('id'), ref('industry_name'));
        },
    

    }
}

Model.knex(db);
module.exports = Industry;

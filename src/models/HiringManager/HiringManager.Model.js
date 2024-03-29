const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const schema = require("./hiringManager.schema.json");
const db = require("../../db");


class HiringManager extends Model {
    static get tableName() {
        return tableNames.hiring_manager;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
          const { ref } = HiringManager;
          query.select(ref('id'), ref('user_id'));
        },
    }
    

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const User = require("../User/User.Model");

        return {
            user: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.hiring_manager}.user_id`,
                    to: `${tableNames.user}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = HiringManager;

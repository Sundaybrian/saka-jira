const { Model } = require("objection");
const Cursor = require("../cursorPagination");
const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./company.schema.json");

class Company extends Cursor(Model) {
    static get tableName() {
        return tableNames.company;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
            query
                .alias("c")
                .select(
                    "c.id",
                    "c.name",
                    "c.logo_url",
                    "c.description",
                    "c.owner_id",
                    "c.email",
                    "c.website_url",
                    "c.active"
                );
        },
    };

    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        const User = require("../User/User.Model");

        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.company}.owner_id`,
                    to: `${tableNames.user}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = Company;

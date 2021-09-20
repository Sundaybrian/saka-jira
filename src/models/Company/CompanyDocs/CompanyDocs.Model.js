const { Model } = require("objection");
const tableNames = require("../../../constants/tableNames");
const { table } = require("../../../db");
const db = require("../../../db");
const schema = require("./companyDocs.schema.json");

class CompanyDocs extends Model {
    static get tableName() {
        return tableNames.company_docs;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = CompanyDocs;
            query.select(
                ref("id"),
                ref("document_type"),
                ref("description"),
                ref("document_number"),
                ref("company_id"),
                ref("created_at"),
                ref("updated_at"),
                ref("document_url")
            );
        },
    };

    static get relationMappings() {
        const Company = require("../Company.Model");

        return {
            company: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Company,
                join: {
                    from: `${tableNames.company_docs}.company_id`,
                    to: `${tableNames.company}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = CompanyDocs;

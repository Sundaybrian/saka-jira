const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./otherskills.schema.json");

class OtherSkill extends Model {
    static get tableName() {
        return tableNames.other_skills;
    }

    static get jsonSchema() {
        return schema;
    }

    static modifiers = {
        defaultSelects(query) {
            const { ref } = OtherSkill;
            query.select(ref("id"), ref("skill_name"), ref("freelancer_id"));
        },
    };

    static get relationMappings() {
        const Freelancer = require("../Freelancer/Freelancer.Model");

        return {
            freelancer: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.other_skills}.freelancer_id`,
                    to: `${tableNames.freelancer}.id`,
                },
            },
        };
    }
}

Model.knex(db);

module.exports = OtherSkill;

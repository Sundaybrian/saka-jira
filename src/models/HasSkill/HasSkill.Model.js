const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./jobStatus.schema.json");

class HasSkill extends Model {
    
    static get tableName() {
        return tableNames.has_skill;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings(){
        const Skill = require("../Skill/Skill.Model");
        const Freelancer = require("../Freelancer/Freelancer.Model");
        return{
            freelancer: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.has_skill}.freelanceer_id`,
                    to:`${tableNames.freelancer}.id`,
                },
            },
            skill: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Freelancer,
                join: {
                    from: `${tableNames.has_skill}.skill_id`,
                    to:`${tableNames.skill}.id`,
                },
            },
        }
    }
}

Model.knex(db);

module.exports = HasSkill;

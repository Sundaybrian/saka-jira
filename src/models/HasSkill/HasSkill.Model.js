const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./hasSkill.schema.json");

class HasSkill extends Model {

    static get tableName() {
        return tableNames.has_skill;
    }

    static get modifiers() {
        return{
            
            defaultSelects(builder) {
                builder.select('id', 'freelancer_id', 'skill_id');
              },
        
        }
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
            skills: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Skill,
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

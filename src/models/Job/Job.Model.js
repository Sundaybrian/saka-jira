const { Model } = require("objection");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./job.schema.json");

class Job extends Model {

    static get tableName() {
        return tableNames.job;
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

        const HiringManager = require("../HiringManager/HiringManager.Model");

        return{
            owner: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: HiringManager,
                join: {
                    from: `${tableNames.job}.hiring_manager_id`,
                    to:`${tableNames.hiring_manager}.id`,
                },
            },
           
        }
    }
}

Model.knex(db);

module.exports = Job;

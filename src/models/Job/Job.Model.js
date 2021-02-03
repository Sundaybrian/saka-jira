const { Model } = require("objection");
const Cursor = require("../cursorPagination");

const tableNames = require("../../constants/tableNames");
const db = require("../../db");
const schema = require("./job.schema.json");

class Job extends Cursor(Model) {

    static get tableName() {
        
        return tableNames.job;
    }

    static modifiers = {
        defaultSelects(query) {
          const { ref } = User;
          query.select(ref('id'), ref('first_name'), ref('last_name'),ref('email'),ref('phone_number'),ref('active'),ref('image_url'));
        },
    
        // defaultSelects(builder) {
        //     builder.select('id', 'freelancer_id', 'skill_id');
        //   },
    }

    

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings(){

        const HiringManager = require("../HiringManager/HiringManager.Model");
        const JobStatus = require("../JobStatus/JobStatus.Model");
        const Industry = require("../Industry/Industry.Model");
        const PaymentType = require("../PaymentType/PaymentType.Model");

        return{
            hiringManager: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: HiringManager,
                join: {
                    from: `${tableNames.job}.hiring_manager_id`,
                    to:`${tableNames.hiring_manager}.id`,
                },
            },
            jobStatus: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: JobStatus,
                join: {
                    from: `${tableNames.job}.job_status_id`,
                    to:`${tableNames.job_status}.id`,
                },
            },industry: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: Industry,
                join: {
                    from: `${tableNames.job}.industry_id`,
                    to:`${tableNames.industry}.id`,
                },
            },paymentType: {
                // BelongsToOneRelation: Use this relation when the source model has the foreign key
                relation: Model.BelongsToOneRelation,
                modelClass: PaymentType,
                join: {
                    from: `${tableNames.job}.payment_type_id`,
                    to:`${tableNames.payment_type}.id`,
                },
            },
           
        }
    }
}

Model.knex(db);

module.exports = Job;

const Job = require("../models/Job/Job.Model");


class JobService {

    constructor() {}

    static async createJob(params) {
        try {
            const job = await Job.query().insert(params);

            return job;
        } catch (error) {
            throw error;
        }
    }

    static async getAllJobs(next=null, industry=null) {
        //TODO paginate and query params
        try {
            const jobs = await Job.query().orderBy('created_at').cursorPage();
            
            if(next){
                return await Job.query().orderBy('created_at').cursorPage(next);
            }
            return jobs;
            
        } catch (error) {
            throw error;
        }
    }

    static async getJobById(id) {
        try {
            const job = await this.getJob(id);
            if (!job) {
                return null;
            }

            return this.basicDetails(job);
        } catch (error) {
            throw error;
        }
    }


    static async updateJob(id, updateParams) {
        try {
            const updatedjob = await Job.query().patchAndFetchById(
                id,
                {
                    ...updateParams,
                }
            );
            return updatedjob;
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {

        try {
            
            const job = await this.getJob(id);
            if (!job) {
                return null;
            }
    
            await Job.query().deleteById(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // static async _getAllJobs(job_id){
    //     try {
    //         const mySkills = await Job.query().alias("f")
    //         .where("f.id", job_id).withGraphFetched('skills(selectNameAndId)')
    //         .modifiers({
    //             selectNameAndId(builder) {
    //                 builder
    //                     .select(
    //                         "has_skill.job_id",
    //                         "skill.skill_name",
    //                         "skill.id",
                            
    //                     )
    //                     .innerJoin("skill", "has_skill.skill_id", "skill.id");
    //             }});

    //         return mySkills
    //     } catch (error) {
    //         throw error
    //     }
    // }

    static async getJob(id) {
        const job = await Job.query()
            .alias("f")
            .where("f.id", id)
            .withGraphFetched({hiringManager, jobStatus, industry})
            // .select(
            //     "f.id",
            //     "title",
            //     "description",
            //     "f.hiring_manager_id",
            //     "f.industry_id",
            //     "f.job_status_id",
            //     "f.start_date",
            //     "f.end_date",
            //     "latitude",
            //     "longitude",
            //     "budget_range_min",
            //     "budget_range_max",
            //     "industry_name",
            //     "email",
            //     "phone_number",
            //     "first_name",
            //     "last_name"
            // )
            // .join(`${tableNames.industry} as inda`, "f.industry_id", `inda.id`)
            // .join(`${tableNames.user} as u`, "f.user_id", `u.id`)
            .first();

        return job;
    }

    static async basicDetails(Job) {
        const {
            id,
            title,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude
        } = Job;

        return {
            id,
            title,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude
        };
    }
}

module.exports = JobService;

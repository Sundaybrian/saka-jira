const Job = require("../models/Job/Job.Model");
const tableNames = require("../constants/tableNames");

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

    static async getAllJobs() {
        //TODO paginate and query params
        try {
            const jobs = await Job.query();
            return jobs;
            
        } catch (error) {
            throw jobs;
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

    static async _getAllJobs(job_id){
        try {
            const mySkills = await Job.query().alias("f")
            .where("f.id", job_id).withGraphFetched('skills(selectNameAndId)')
            .modifiers({
                selectNameAndId(builder) {
                    builder
                        .select(
                            "has_skill.job_id",
                            "skill.skill_name",
                            "skill.id",
                            
                        )
                        .innerJoin("skill", "has_skill.skill_id", "skill.id");
                }});

            return mySkills
        } catch (error) {
            throw error
        }
    }

    static async getJob(id) {
        const job = await Job.query()
            .alias("f")
            .where("f.id", id)
            .select(
                "f.id",
                "user_id",
                "latitude",
                "longitude",
                "industry_id",
                "industry_name",
                "email",
                "phone_number",
                "first_name",
                "last_name"
            )
            .join(`${tableNames.industry} as inda`, "f.industry_id", `inda.id`)
            .join(`${tableNames.user} as u`, "f.user_id", `u.id`)
            .first();

        return job;
    }

    static async basicDetails(Job) {
        const {
            id,
            latitude,
            longitude,
            industry_id,
            industry_name,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        } = Job;

        return {
            id,
            latitude,
            longitude,
            industry_id,
            industry_name,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        };
    }
}

module.exports = JobService;

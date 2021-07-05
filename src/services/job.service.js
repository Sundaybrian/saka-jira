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

    static async getAllJobs(next = null, match, limit) {
        try {
            let jobs = await Job.query()
                .where(match)
                .orderBy("created_at", "desc")
                .limit(limit)
                .cursorPage();

            if (next) {
                return await Job.query()
                    .where(match)
                    .orderBy("created_at", "desc")
                    .limit(limit)
                    .cursorPage(next);
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

            return job;
        } catch (error) {
            throw error;
        }
    }

    static async updateJob(id, updateParams) {
        console.log(updateParams);
        try {
            const updatedjob = await Job.query().patchAndFetchById(id, {
                ...updateParams,
            });
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

    static async getJob(id) {
        //TODO optionally fetch text_data or quill_data
        try {
            const job = await Job.query()
                .where("id", id)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[hiringManager(defaultSelects),industry(defaultSelects),jobStatus(defaultSelects)]`
                )
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
        } catch (error) {
            throw error;
        }
    }

    // TODO: deprecate infavour of objection modifiers
    static async basicDetails(Job) {
        const {
            id,
            title,
            main_skill,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude,
        } = Job;

        return {
            id,
            title,
            main_skill,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude,
        };
    }
}

module.exports = JobService;

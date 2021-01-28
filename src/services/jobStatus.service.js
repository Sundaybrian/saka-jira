const JobStatus = require("../models/JobStatus/JobStatus.Model");

class JobStatusService {
    constructor() {}

    static async createJobStatus(params) {
        try {
            const jobStatus = await JobStatus.query().insert(params);

            return this.basicDetails(jobStatus);
        } catch (error) {
            throw error;
        }
    }

    static async getAllJobStatuses() {
        const jobStatus = await JobStatus.query();
        return jobStatus;
    }
    static async updateJobStatus(id, params) {
        const updatedJobStatus = await JobStatus.query().patchAndFetchById(id, {
            ...params,
        });

        return updatedJobStatus;
    }

    static async getJobStatusById(id) {
        try {
            const jobStatus = await this.getJobStatus({ id });
            if (!jobStatus) {
                return null;
            }

            return this.basicDetails(jobStatus);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const jobStatus = await this.getJobStatus({ id });
        if (!jobStatus) {
            return null;
        }

        await JobStatus.query().deleteById(id);
        return true;
    }

    static async getJobStatus(params) {
        const jobStatus = await JobStatus.query()
            .where({ ...params })
            .first();

        return jobStatus;
    }

    static async basicDetails(JobStatus) {
        const { id, job_status_name } = JobStatus;

        return {
            id,
            job_status_name,
        };
    }
}

module.exports = JobStatusService;

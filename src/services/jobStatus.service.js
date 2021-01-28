const JobStatus = require("../models/JobStatus/JobStatus.Model");

class JobStatusService {
    constructor() {}

    static async createJobStatus(params) {
        try {
            const JobStatus = await JobStatus.query().insert(params);

            return this.basicDetails(JobStatus);
        } catch (error) {
            throw error;
        }
    }

    static async getAllJobStatuses() {
        const JobStatuss = await JobStatus.query();
        return JobStatuss;
    }
    static async updateJobStatus(id, params) {
        const updatedJobStatus = await JobStatus.query().patchAndFetchById(id, {
            ...params,
        });

        return updatedJobStatus;
    }

    static async getJobStatusById(id) {
        try {
            const JobStatus = await this.getJobStatus({ id });
            if (!JobStatus) {
                return null;
            }

            return this.basicDetails(JobStatus);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const JobStatus = await this.getJobStatus({ id });
        if (!JobStatus) {
            return null;
        }

        await JobStatus.query().deleteById(id);
        return true;
    }

    static async getJobStatus(params) {
        const JobStatus = await JobStatus.query()
            .where({ ...params })
            .first();

        return JobStatus;
    }

    static async basicDetails(JobStatus) {
        const { id, name } = JobStatus;

        return {
            id,
            name,
        };
    }
}

module.exports = JobStatusService;

const HiringManager = require("../models/HiringManager/HiringManager.Model");
const tableNames = require("../constants/tableNames");
const Job = require("../models/Job/Job.Model");

class HiringManagerService {
    constructor() {}

    static async createHiringManager(params) {
        try {
            const hiringManager = await HiringManager.query().insert(params);
            return hiringManager;
        } catch (error) {
            throw error;
        }
    }

    static async getAllHiringManagers() {
        //TODO paginate
        try {
            const hiringManagers = await HiringManager.query();
            return hiringManagers;
        } catch (error) {
            throw error;
        }
    }

    static async getHiringManagerById(id) {
        try {
            const hiringManager = await this.getHiringManager(id);

            if (!hiringManager) {
                return null;
            }

            return this.basicDetails(hiringManager);
        } catch (error) {
            throw error;
        }
    }

    static async updateHiringManager(id, updateParams) {
        try {
            const updatedhiringManager = await HiringManager.query().patchAndFetchById(
                id,
                {
                    ...updateParams,
                }
            );
            return updatedhiringManager;
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        try {
            const hiringManager = await this.getHiringManager(id);

            if (!hiringManager) {
                return null;
            }

            await HiringManager.query().deleteById(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async fetchHiringManager(params) {
        try {
            const hiring_manager = await HiringManager.query()
                .where(params)
                .first();
            return hiring_manager;
        } catch (error) {
            throw error;
        }
    }

    static async getHiringManager(id) {
        try {
            const hiringManager = await HiringManager.query()
                .alias("h")
                .where("h.id", id)
                .select(
                    "h.id",
                    "user_id",
                    "latitude",
                    "longitude",
                    "email",
                    "phone_number",
                    "first_name",
                    "last_name"
                )
                .join(`${tableNames.user} as u`, "h.user_id", `u.id`)
                .first();

            return hiringManager;
        } catch (error) {
            throw error;
        }
    }

    static async hiringManagerProfileStats(hiring_manager_id) {
        try {
            const [jobsPosted, jobsCompleted, rating] = await Promise.all([
                Job.query()
                    .where({ hiring_manager_id })
                    .count()
                    .as("jobsPosted"),

                Job.query()
                    .where({
                        hiring_manager_id,
                        job_status_id: 4, //completed
                    })
                    .count()
                    .as("jobsCompleted"),

                Proposal.query()
                    .whereIn(
                        "job_id",
                        Job.query()
                            .where({
                                hiring_manager_id,
                                job_status_id: 4, //completed
                            })
                            .select("id")
                    )
                    .avg("client_rating")
                    .as("rating"),
            ]);

            return {
                jobsPosted: parseInt(jobsPosted[0].count),
                jobsCompleted: parseInt(jobsCompleted[0].count),
                rating: rating[0].avg ? parseInt(rating[0].avg) : 0,
            };
        } catch (error) {}
    }
    static async basicDetails(HiringManager) {
        const {
            id,
            latitude,
            longitude,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        } = HiringManager;

        return {
            id,
            latitude,
            longitude,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        };
    }
}

module.exports = HiringManagerService;

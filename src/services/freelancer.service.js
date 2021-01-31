const Freelancer = require("../models/Freelancer/Freelancer.Model");
const tableNames = require("../constants/tableNames");
const { threadId } = require("worker_threads");

class FreelancerService {
    constructor() {}

    static async createFreelancer(params) {
        try {
            const freelancer = await Freelancer.query().insert(params);

            return freelancer;
        } catch (error) {
            throw error;
        }
    }

    static async getAllFreelancers() {
        //TODO paginate
        const freelancers = await Freelancer.query();
        return freelancers;
    }

    static async updateFreelancer(id, updateParams) {
        // TODO MAKE IT A MIDDLEWARE
        try {
            const isAllowed = await this.getFreelancer(id);

            if (!isAllowed) return null;

            const updatedfreelancer = await Freelancer.query().patchAndFetchById(
                id,
                {
                    ...updateParams,
                }
            );
            return updatedfreelancer;
        } catch (error) {
            throw error;
        }
    }

    static async getFreelancerById(id) {
        try {
            const freelancer = await this.getFreelancer(id);
            if (!freelancer) {
                return null;
            }

            return this.basicDetails(freelancer);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const freelancer = await this.getFreelancer(id);
        if (!freelancer) {
            return null;
        }

        await Freelancer.query().deleteById(id);
        return true;
    }

    static async getFreelancer(id) {
        const freelancer = await Freelancer.query()
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

        return freelancer;
    }

    static async basicDetails(Freelancer) {
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
        } = Freelancer;

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
        };
    }
}

module.exports = FreelancerService;
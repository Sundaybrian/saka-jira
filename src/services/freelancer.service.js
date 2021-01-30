const Freelancer = require("../models/Freelancer/Freelancer.Model");
const tableNames = require("../constants/tableNames");

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
        const isAllowed = await this.getFreelancer({ id });

        if (!isAllowed) return null;

        const updatedfreelancer = await Freelancer.query().patchAndFetchById(
            id,
            {
                ...updateParams,
            }
        );

        return updatedfreelancer;
    }

    static async getFreelancerById(id) {
        try {
            const freelancer = await this.getFreelancer({ id });
            if (!freelancer) {
                return null;
            }

            return this.basicDetails(freelancer);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const freelancer = await this.getFreelancer({ id });
        if (!freelancer) {
            return null;
        }

        await Freelancer.query().deleteById(id);
        return true;
    }

    static async getFreelancer(params) {
        const freelancer = await Freelancer.query()
            .where({ ...params })
            .leftJoin(
                tableNames.industry,
                `${tableNames.industry}_id`,
                `${tableNames.industry}.id`
            )
            .first();

        return freelancer;
    }

    static async basicDetails(Freelancer) {
        const { id, active, latitude, longitude, industry } = Freelancer;

        return { id, active, latitude, longitude, industry };
    }
}

module.exports = FreelancerService;

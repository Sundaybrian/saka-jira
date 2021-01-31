const FreelancerSubscription = require("../models/FreelancerSubscription/FreelancerSubscription.Model");
const tableNames = require("../constants/tableNames");

class FreelancerSubscriptionService {
    constructor() {}

    static async createFreelancerSubscription(freelancer_id) {
        try {
            const subscription = await FreelancerSubscription.query().insert({
                freelancer_id,
            });

            return subscription;
        } catch (error) {
            throw error;
        }
    }

    static async getAllFreelancersSubscriptions() {
        //TODO paginate and query params
        const subscriptions = await FreelancerSubscription.query();
        return subscriptions;
    }

    static async updateFreelancerSubscription(id) {
        try {
            // get current expiry date
            // check if current date is greater than expiry date
            /** expired so overwrite with currdae.setDate(currentDate() + numberof days)**/
            // else it means still a sub exists , so we top up
            // (current date minus expiry date) + extra date paid, then set expiry date

            const updatedfreelancer = await FreelancerSubscription.query().patchAndFetchById(
                id,
                {
                    expiry_date: new Date().toISOString(),
                }
            );
            return updatedfreelancer;
        } catch (error) {
            throw error;
        }
    }

    static async getFreelancerSubscriptionById(id) {
        try {
            const freelancer = await this.getFreelancerSubscription(id);
            if (!freelancer) {
                return null;
            }

            return this.basicDetails(freelancer);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const freelancer = await this.getFreelancerSubscription(id);
        if (!freelancer) {
            return null;
        }

        await FreelancerSubscription.query().deleteById(id);
        return true;
    }

    static async getFreelancerSubscription(id) {
        const freelancer = await FreelancerSubscription.query()
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

    static async basicDetails(FreelancerSubscription) {
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
        } = FreelancerSubscription;

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

module.exports = FreelancerSubscriptionSubscriptionService;

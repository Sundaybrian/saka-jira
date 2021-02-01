const FreelancerSubscription = require("../models/FreelancerSubscription/FreelancerSubscription.Model");

class FreelancerSubscriptionService {
    constructor() {}

    static async createFreelancerSubscription(freelancer_id, expiry_date) {
        // technically wont be used directly,
        // edge case will be when a manual creation is required!

        try {
            const subscription = await FreelancerSubscription.query()
                .insert({
                    freelancer_id,
                    expiry_date,
                })
                .returning("*");

            return subscription;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getAllFreelancersSubscriptions() {
        //TODO paginate and query params
        const subscriptions = await FreelancerSubscription.query();
        return subscriptions;
    }

    static async updateFreelancerSubscription(freelancer_id, expiry_date) {
        // technically will be run by payment sytem service
        try {
            const updatedSubscription = await FreelancerSubscription.query()
                .patch({
                    expiry_date,
                })
                .where({ freelancer_id })
                .returning("*")
                .first();

            return this.basicDetails(updatedSubscription);
        } catch (error) {
            throw error;
        }
    }

    static async getFreelancerSubscriptionById(freelancer_id) {
        try {
            const freelancerSubscription = await this.getFreelancerSubscription(
                freelancer_id
            );

            if (!freelancerSubscription) {
                return null;
            }

            return this.basicDetails(freelancerSubscription);
        } catch (error) {
            throw error;
        }
    }

    // TODO why would we want to delete a subscription??
    static async _delete(freelancer_id) {
        const freelancerSubscription = await this.getFreelancerSubscription(
            freelancer_id
        );
        if (!freelancerSubscription) {
            return null;
        }

        await FreelancerSubscription.query().delete.where({ freelancer_id });

        return true;
    }

    // helpers
    static async getFreelancerSubscription(freelancer_id) {
        const freelancerSubscription = await FreelancerSubscription.query()
            .where({ freelancer_id })
            .first();

        return freelancerSubscription;
    }

    static async basicDetails(FreelancerSubscription) {
        const { freelancer_id, expiry_date } = FreelancerSubscription;

        return {
            freelancer_id,
            expiry_date,
        };
    }
}

module.exports = FreelancerSubscriptionService;

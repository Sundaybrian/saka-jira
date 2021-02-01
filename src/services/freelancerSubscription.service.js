const FreelancerSubscription = require("../models/FreelancerSubscription/FreelancerSubscription.Model");
const tableNames = require("../constants/tableNames");
import DateService from "./date.service";

class FreelancerSubscriptionService {
    constructor() {}

    static async createFreelancerSubscription(freelancer_id) {
        // technically wont be used either
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

    static async updateFreelancerSubscription(id, number_of_days) {
        // technically will be run by payment sytem
        try {
            // get current expiry date
            const subscription = await this.getFreelancerSubscription(id);

            // check if current date is greater than expiry date
            const expired = await DateService.isExpired(
                subscription.expiry_date
            );

            let new_expiry_date;

            if (expired) {
                new_expiry_date = DateService.overWriteDate(number_of_days);
            } else {
                new_expiry_date = DateService.topUpDate(
                    subscription.expiry_date,
                    number_of_days
                );
            }

            const updatedSubscription = await subscription
                .$query()
                .patchAndFetch({
                    expiry_date: new_expiry_date,
                });
            return updatedSubscription;
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

    static async _delete(freelancer_id) {
        const freelancer = await this.getFreelancerSubscription(freelancer_id);
        if (!freelancer) {
            return null;
        }

        await FreelancerSubscription.query().deleteById(freelancer_id);

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

module.exports = FreelancerSubscriptionSubscriptionService;

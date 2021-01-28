const SubscriptionType = require("../models/SubscriptionType/SubscriptionType.Model");

class SubscriptionTypeService {
    constructor() {}

    static async createSubscriptionType(params) {
        try {
            const subscriptionType = await SubscriptionType.query().insert(
                params
            );

            return this.basicDetails(subscriptionType);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getAllSubscriptionType() {
        const subscriptionTypes = await SubscriptionType.query();
        return subscriptionTypes;
    }
    static async updateSubscriptionType(id, params) {
        const updatedSubscriptionType = await SubscriptionType.query().patchAndFetchById(
            id,
            {
                ...params,
            }
        );

        return updatedSubscriptionType;
    }

    static async getSubscriptionTypeById(id) {
        try {
            const subscriptionType = await this.getSubscriptionType({ id });
            if (!subscriptionType) {
                return null;
            }

            return this.basicDetails(subscriptionType);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const subscriptionType = await this.getSubscriptionType({ id });
        if (!subscriptionType) {
            return null;
        }

        await SubscriptionType.query().deleteById(id);
        return true;
    }

    static async getSubscriptionType(params) {
        const subscriptionType = await SubscriptionType.query()
            .where({ ...params })
            .first();

        return subscriptionType;
    }

    static async basicDetails(subscriptionType) {
        const {
            id,
            name,
            amount,
            subscription_duration,
            duration_in_days,
        } = subscriptionType;

        return {
            id,
            name,
            amount,
            subscription_duration,
            duration_in_days,
        };
    }
}

module.exports = SubscriptionTypeService;

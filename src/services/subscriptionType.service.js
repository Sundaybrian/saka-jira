const SubscriptionType = require("../models/SubscriptionType/SubscriptionType.Model");

class SubscriptionTypeService {
    constructor() {}

    static async createSubscriptionType(params) {
        subscriptionType = SubscriptionType.query().insert(params);
        return subscriptionType;
    }

    static async updateSubscriptionType(id, params) {
        const updatedSubscriptionType = SubscriptionType.query().patchAndFetchById(
            id,
            {
                ...params,
            }
        );

        return updatedSubscriptionType;
    }

    static async getAllSubscriptionType() {
        subscriptionTypes = SubscriptionType.query();
        return subscriptionTypes;
    }

    static async getSubscriptionTypeById(id) {
        subscriptionType = await this.getSubscriptionType({ id });
        if (!subscriptionType) {
            return null;
        }
        return basicDetails(subscriptionType);
    }

    static async _delete(queryParams) {
        SubscriptionType.query()
            .delete()
            .where({ ...queryParams });
    }

    static async getSubscriptionType(params) {
        subscriptionType = SubscriptionType.query()
            .where({ ...params })
            .first();

        return subscriptionType;
    }

    static async basicDetails(subscriptionType) {
        const {
            subscription_type_name,
            amount,
            subscription_duration,
            duration_in_days,
        } = subscriptionType;

        return {
            subscription_type_name,
            amount,
            subscription_duration,
            duration_in_days,
        };
    }
}

module.exports = SubscriptionTypeService;

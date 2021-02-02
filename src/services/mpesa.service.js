// impport services here
const FreelancerSubscriptionService = require("./freelancerSubscription.service");
const DateService = require("./date.service");

class MpesaService {
    // TODO IMPPLEMENT THIS SERVICE
    constructor() {}

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
                .patchAndFetchById(id, {
                    expiry_date: new_expiry_date,
                });
            return updatedSubscription;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MpesaService;

const PaymentType = require("../models/PaymentType/PaymentType.Model");

class PaymentTypeService {
    constructor() {}

    static async createPaymentType(params) {
        try {
            const paymentType = await PaymentType.query().insert(params);

            return this.basicDetails(paymentType);
        } catch (error) {
            throw error;
        }
    }

    static async getAllPaymentTypes() {
        const paymentType = await PaymentType.query();
        return paymentType;
    }

    static async updatePaymentType(id, params) {
        const updatedpaymentType = await PaymentType.query().patchAndFetchById(
            id,
            {
                ...params,
            }
        );

        return updatedpaymentType;
    }

    static async getPaymentTypeById(id) {
        try {
            const paymentType = await this.getPaymentType({ id });
            if (!paymentType) {
                return null;
            }

            return this.basicDetails(paymentType);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const paymentType = await this.getPaymentType({ id });
        if (!paymentType) {
            return null;
        }

        await PaymentType.query().deleteById(id);

        return true;
    }

    static async getPaymentType(params) {
        const paymentType = await PaymentType.query()
            .where({ ...params })
            .first();

        return paymentType;
    }

    static async basicDetails(paymentType) {
        const { id, payment_type_name } = paymentType;

        return {
            id,
            payment_type_name,
        };
    }
}

module.exports = PaymentTypeService;

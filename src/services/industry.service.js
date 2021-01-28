const Industry = require("../models/Industry/Industry.Model");

class IndustryService {
    constructor() {}

    static async createIndustry(params) {
        try {
            const industry = await Industry.query().insert(params);

            return this.basicDetails(industry);
        } catch (error) {
            throw error;
        }
    }

    static async getAllIndustries() {
        const industry = await Industry.query();
        return industry;
    }
    static async updateIndustry(id, params) {
        const updatedindustry = await Industry.query().patchAndFetchById(id, {
            ...params,
        });

        return updatedindustry;
    }

    static async getIndustryById(id) {
        try {
            const industry = await this.getIndustry({ id });
            if (!industry) {
                return null;
            }

            return this.basicDetails(industry);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const industry = await this.getIndustry({ id });
        if (!industry) {
            return null;
        }

        await Industry.query().deleteById(id);
        return true;
    }

    static async getIndustry(params) {
        const industry = await Industry.query()
            .where({ ...params })
            .first();

        return industry;
    }

    static async basicDetails(Industry) {
        const { id, industry_name } = Industry;

        return {
            id,
            industry_name,
        };
    }
}

module.exports = IndustryService;

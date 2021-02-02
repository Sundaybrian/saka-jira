const HasSkill = require("../models/HasSkill/HasSkill.Model");

class HasSkillService {
    constructor() {}

    static async createHasSkill(params) {
        try {
            const hasSkill = await HasSkill.query().insert(params);

            return this.basicDetails(hasSkill);
        } catch (error) {
            throw error;
        }
    }

    static async getAllHasSkilles() {
        const hasSkill = await HasSkill.query();
        return hasSkill;
    }
    static async updateHasSkill(id, params) {
        const updatedHasSkill = await HasSkill.query().patchAndFetchById(id, {
            ...params,
        });

        return updatedHasSkill;
    }

    static async getHasSkillById(id) {
        try {
            const hasSkill = await this.getHasSkill({ id });
            if (!hasSkill) {
                return null;
            }

            return this.basicDetails(hasSkill);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const hasSkill = await this.getHasSkill({ id });
        if (!hasSkill) {
            return null;
        }

        await HasSkill.query().deleteById(id);
        return true;
    }

    static async getHasSkill(params) {
        const hasSkill = await HasSkill.query()
            .where({ ...params })
            .first();

        return hasSkill;
    }

    static async basicDetails(HasSkill) {
        const { id,  freelancer_id,
            skill_id,} = HasSkill;

        return {
            id,
            freelancer_id,
            skill_id,
        };
    }
}

module.exports = HasSkillService;

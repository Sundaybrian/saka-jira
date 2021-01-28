const Skill = require("../models/Skill/Skill.Model");

class SkillService {
    constructor() {}

    static async createSkill(params) {
        try {
            const skill = await Skill.query().insert(params);

            return this.basicDetails(skill);
        } catch (error) {
            throw error;
        }
    }

    static async getAllIndustries() {
        const skill = await Skill.query();
        return skill;
    }

    static async updateSkill(id, params) {
        const updatedskill = await Skill.query().patchAndFetchById(id, {
            ...params,
        });

        return updatedskill;
    }

    static async getSkillById(id) {
        try {
            const skill = await this.getSkill({ id });
            if (!skill) {
                return null;
            }

            return this.basicDetails(skill);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const skill = await this.getSkill({ id });
        if (!skill) {
            return null;
        }

        await Skill.query().deleteById(id);

        return true;
    }

    static async getSkill(params) {
        const skill = await Skill.query()
            .where({ ...params })
            .first();

        return skill;
    }

    static async basicDetails(skill) {
        const { id, skill_name } = skill;

        return {
            id,
            skill_name,
        };
    }
}

module.exports = SkillService;

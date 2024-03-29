const OtherSkill = require("../models/OtherSkills/OtherSkills.Model");

class OtherSkillService {
    constructor() {}

    static async addSkill(params) {
        console.log(params, "-----------");
        try {
            const { skill_name, freelancer_id } = params;
            const skill = await OtherSkill.query().insert({
                skill_name,
                freelancer_id,
            });

            return skill;
        } catch (error) {
            throw error;
        }
    }

    static async getMySkills(freelancer_id) {
        try {
            const skills = await OtherSkill.query().where({ freelancer_id });
            return skills;
        } catch (error) {
            throw error;
        }
    }

    // owners can delete skills
    static async _removeSkill(params) {
        const { id, freelancer_id } = params;
        const skill = await this.getSkill({ id, freelancer_id });
        if (!skill) {
            return null;
        }

        await OtherSkill.query().deleteById(id);

        return true;
    }

    static async getSkill(params) {
        const skill = await OtherSkill.query()
            .where({ ...params })
            .first();

        return skill;
    }
}

module.exports = OtherSkillService;

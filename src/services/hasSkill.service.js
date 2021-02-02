const HasSkill = require("../models/HasSkill/HasSkill.Model");

class HasSkillService {
    constructor() {}

    static async addSkills(skills_array) {

        try {
            const hasSkill = await HasSkill.query().insert(skills_array);

            return this.basicDetails(hasSkill);
        } catch (error) {
            throw error;
        }
    }

    static async getMySkills(freelancer_id){
        try {
            const mySkills = await this.getHasSkill({freelancer_id});

            return mySkills;
        } catch (error) {
            throw error;
        }
    }

    // TODO ADD SEARCH BY SKILLS CRITERIA
    // static async getfREEs() {
    //     const hasSkill = await HasSkill.query();
    //     return hasSkill;
    // }


    static async _removeSkill(id) {
        try {
            // returns num of deleted row if any
           const removedSkill =  await HasSkill.query().deleteById(id);
            return removedSkill;
        } catch (error) {
            throw error
        }

    }

    // helper methods
    static async getHasSkill(params) {
        // fetches only freelancer_id for the modify
        // for eager loading only skill_name and its id
        const hasSkill = await HasSkill.query()
            .where({ ...params }).modify(
                'defaultSelects'
            )
            .withGraphFetched(`skills(selectNameAndId)`)
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

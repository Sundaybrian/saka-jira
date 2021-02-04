const HasSkill = require("../models/HasSkill/HasSkill.Model");
const FreelancerService = require("./freelancer.service");

class HasSkillService {
    constructor() {}

    static async addSkill(skill) {

        try {
            const hasSkill = await HasSkill.query().insert(skill);

            return this.basicDetails(hasSkill);
        } catch (error) {
            throw error;
        }
    }

    // insert many
    // TODO implement this
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
            const mySkills = await FreelancerService.getAllFreelancerSkills(freelancer_id);

            const {skills} = mySkills[0];
            return {skills};

        } catch (error) {
            throw error;
        }
    }

    // TODO ADD SEARCH BY SKILLS CRITERIA

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

const HasSkill = require("../models/HasSkill/HasSkill.Model");

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
            const mySkills = await this.getHasSkill({freelancer_id});

            return mySkills;
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
    static async getHasSkill(params) {
        // fetches only freelancer_id for the modify
        // for eager loading only skill_name and its id
        const hasSkill = await HasSkill.query()
            .where({ ...params }).modify(
                'defaultSelects'
            )
            .withGraphFetched('skills(selectNameAndId)')
            .modifiers({
                selectNameAndId(builder) {
                  builder.select('skill_name', 'id');
                },})
            .first();

            console.log(typeof(hasSkill.skills));
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

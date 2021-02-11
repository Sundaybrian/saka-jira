const Freelancer = require("../models/Freelancer/Freelancer.Model");
const tableNames = require("../constants/tableNames");

class FreelancerService {
    constructor() {}

    static async createFreelancer(params) {
        try {
            const freelancer = await Freelancer.query().insert(params);

            return freelancer;
        } catch (error) {
            throw error;
        }
    }

    static async getAllFreelancers() {
        //TODO paginate
        const freelancers = await Freelancer.query();
        return freelancers;
    }

    static async updateFreelancer(id, updateParams) {
        try {
            const updatedfreelancer = await Freelancer.query().patchAndFetchById(
                id,
                {
                    ...updateParams,
                }
            );
            return updatedfreelancer;
        } catch (error) {
            throw error;
        }
    }

    static async getFreelancerById(id) {
        try {
            const freelancer = await this.getFreelancer(id);
            if (!freelancer) {
                return null;
            }

            return this.basicDetails(freelancer);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const freelancer = await this.getFreelancer(id);
        if (!freelancer) {
            return null;
        }

        await Freelancer.query().deleteById(id);
        return true;
    }

    static async getAllFreelancerSkills(freelancer_id) {
        try {
            const mySkills = await Freelancer.query()
                .alias("f")
                .where("f.id", freelancer_id)
                .withGraphFetched("skills(selectNameAndId)")
                .modifiers({
                    selectNameAndId(builder) {
                        builder
                            .select(
                                "has_skill.freelancer_id",
                                "skill.skill_name",
                                "skill.id"
                            )
                            .innerJoin(
                                "skill",
                                "has_skill.skill_id",
                                "skill.id"
                            );
                    },
                });

            return mySkills;
        } catch (error) {
            throw error;
        }
    }

    static async getFreelancer(id) {
        const freelancer = await Freelancer.query()
            .alias("f")
            .where("f.id", id)
            .modify("defaultSelects")
            // .select(
            //     "f.id",
            //     "user_id",
            //     "latitude",
            //     "longitude",
            //     "email",
            //     )
            //     "phone_number",
            //     "first_name",
            //     "last_name"
            .withGraphFetched(
                `[industry(defaultSelects),skills(defaultSelects),user(defaultSelectsWithoutPass)]`
            )
            // .join(`${tableNames.industry} as inda`, "f.industry_id", `inda.id`)
            // .join(`${tableNames.user} as u`, "f.user_id", `u.id`)
            .first();

        console.log(freelancer, "===-----");

        return freelancer;
    }

    static async basicDetails(Freelancer) {
        const {
            id,
            latitude,
            longitude,
            industry_id,
            industry_name,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        } = Freelancer;

        return {
            id,
            latitude,
            longitude,
            industry_id,
            industry_name,
            email,
            phone_number,
            first_name,
            last_name,
            user_id,
        };
    }
}

module.exports = FreelancerService;

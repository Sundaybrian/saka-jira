const Freelancer = require("../models/Freelancer/Freelancer.Model");
const Proposal = require("../models/Proposal/Proposal.Model");
const Job = require("../models/Job/Job.Model");

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

    // TODO DEPRECATE WITHGRAPFETCHED SKILLS
    static async getAllFreelancers(next = null, match, limit) {
        try {
            let freelancers = await Freelancer.query()
                .where(match)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[industry(defaultSelects),skills(defaultSelects),user(defaultSelectsWithoutPass), customSkills(defaultSelects)]`
                )
                .orderBy("id")
                .limit(limit)
                .cursorPage();

            if (next) {
                freelancers = await Freelancer.query()
                    .where(match)
                    .modify("defaultSelects")
                    .withGraphFetched(
                        `[industry(defaultSelects),skills(defaultSelects),user(defaultSelectsWithoutPass),customSkills(defaultSelects)]`
                    )
                    .orderBy("id")
                    .limit(limit)
                    .cursorPage(next);
            }

            return freelancers;
        } catch (error) {
            throw error;
        }
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

    // TODO DEPRECATE IN FAVOUR OF CUSTOM SKILLS
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
        try {
            const freelancer = await Freelancer.query()
                .alias("f")
                .where("f.id", id)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[industry(defaultSelects),skills(defaultSelects),user(defaultSelectsWithoutPass),customSkills(defaultSelects)]`
                )
                .first();

            return freelancer;
        } catch (error) {
            throw error;
        }
    }

    static async freelancerProfileStats(
        freelancer_id,
        hiring_manager_id,
        inprogress_status,
        completed_status
    ) {
        try {
            const [
                inprogress,
                jobsPosted,
                completed,
                rating,
            ] = await Promise.all([
                // #inprogressjobs aggregate count(current_proposal_status) where freelancer_id and current_proposal_status == inprogress from proposal
                Proposal.query()
                    .where({
                        current_proposal_status_id: inprogress_status,
                        freelancer_id,
                    })
                    .count()
                    .as("inprogress"),

                // #jobsposted aggregate count(hr_id) jobs using where hr_id from table jobs
                Job.query()
                    .where({ hiring_manager_id })
                    .count()
                    .as("jobsPosted"),

                // #ratingfreelancer aggregate avg(rating) from table proposals where freelancer_id and current_proposal_status == completed
                Proposal.query()
                    .where({
                        freelancer_id,
                        current_proposal_status_id: completed_status,
                    })
                    .count()
                    .as("completed"),

                Proposal.query()
                    .where({
                        freelancer_id,
                        current_proposal_status_id: completed_status,
                    })
                    .avg("freelancer_rating")
                    .as("rating"),
            ]);
            // {
            //     inprogress: [ { count: '0' } ],
            //     jobsPosted: [ { count: '1' } ],
            //     completed: [ { count: '0' } ]
            //     rating: [{avg:'}]
            // }

            console.log(jobsPosted, rating);
            return {
                inprogress: parseInt(inprogress[0].count),
                jobsPosted: parseInt(jobsPosted[0].count),
                completed: parseInt(completed[0].count),
                rating: rating[0].avg ? parseInt(rating[0].avg) : 0,
            };
        } catch (error) {
            throw error;
        }
    }

    // TODO DEPRECATE
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

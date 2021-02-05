const Proposal = require("../models/Proposal/Proposal.Model");

class ProposalService {
    constructor() {}

    static async createProposal(params) {
        try {
            const job = await Proposal.query().insert(params);

            return job;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProposals(next = null, match, limit) {
        try {
            let jobs = await Proposal.query()
                .where(match)
                .orderBy("created_at")
                .limit(limit)
                .cursorPage();

            if (next) {
                return await Proposal.query()
                    .where(match)
                    .orderBy("created_at")
                    .limit(limit)
                    .cursorPage(next);
            }
            return jobs;
        } catch (error) {
            throw error;
        }
    }

    static async getProposalById(id) {
        try {
            const job = await this.getProposal(id);
            if (!job) {
                return null;
            }

            return this.basicDetails(job);
        } catch (error) {
            throw error;
        }
    }

    static async updateProposal(id, updateParams) {
        console.log(updateParams);
        try {
            const updatedjob = await Proposal.query().patchAndFetchById(id, {
                ...updateParams,
            });
            return updatedjob;
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        try {
            const job = await this.getProposal(id);
            if (!job) {
                return null;
            }

            await Proposal.query().deleteById(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async getProposal(id) {
        try {
            const job = await Proposal.query()
                .where("id", id)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[hiringManager(defaultSelects),industry(defaultSelects),jobStatus(defaultSelects)]`
                )
                // .select(
                //     "f.id",
                //     "title",
                //     "description",
                //     "f.hiring_manager_id",
                //     "f.industry_id",
                //     "f.job_status_id",
                //     "f.start_date",
                //     "f.end_date",
                //     "latitude",
                //     "longitude",
                //     "budget_range_min",
                //     "budget_range_max",
                //     "industry_name",
                //     "email",
                //     "phone_number",
                //     "first_name",
                //     "last_name"
                // )
                // .join(`${tableNames.industry} as inda`, "f.industry_id", `inda.id`)
                // .join(`${tableNames.user} as u`, "f.user_id", `u.id`)
                .first();

            return job;
        } catch (error) {
            throw error;
        }
    }

    static async basicDetails(Proposal) {
        const {
            id,
            title,
            main_skill,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude,
        } = Proposal;

        return {
            id,
            title,
            main_skill,
            description,
            budget_range_min,
            budget_range_max,
            start_date,
            end_date,
            jobStatus,
            hiringManager,
            industry,
            latitude,
            longitude,
        };
    }
}

module.exports = ProposalService;

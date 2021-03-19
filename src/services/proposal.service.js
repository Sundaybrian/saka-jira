const Proposal = require("../models/Proposal/Proposal.Model");

class ProposalService {
    constructor() {}

    static async sendProposal(params) {
        try {
            const proposal = await this.get_or_create(params);

            console.log(proposal, "9090909090909090");

            return proposal;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async get_or_create(params) {
        // checks for the existence of a proposal
        // if it exists return false
        // if it does not exist it creates one
        try {
            const { job_id, freelancer_id } = params;

            let proposal = await Proposal.query()
                .where({ job_id, freelancer_id })
                .first();

            console.log(proposal, "hapaaaa  imepatikan");
            if (proposal) {
                throw new Error("You have already submitted a bid");
            } else {
                // create one
                proposal = await Proposal.query().insert(params);
            }

            return proposal;
        } catch (error) {
            throw error;
        }
    }

    static async getProposals(next = null, match, limit) {
        // can be used by both freelancer to fetch all their proposals
        //can be used by hiring manager to fetch all proposals for a given job
        // power is in the match obj
        try {
            // proposals are bids just so you know
            // a bid is unique bu freelancer_id and job_id
            let proposals = await Proposal.query()
                .where(match)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[job(defaultSelects), freelancer(selectNameAndId)]`
                )
                .modifiers({
                    selectNameAndId(builder) {
                        builder
                            .select(
                                "freelancer.user_id",
                                "freelancer.description",
                                "email",
                                "phone_number",
                                "first_name",
                                "last_name",
                                "image_url"
                            )
                            .innerJoin("user", "freelancer.user_id", "user.id");
                    },
                })
                .orderBy("created_at")
                .limit(limit)
                .cursorPage();

            if (next) {
                return await Proposal.query()
                    .where(match)
                    .withGraphFetched(
                        `[job(defaultSelects), freelancer(selectNameAndId)]`
                    )
                    .orderBy("created_at")
                    .limit(limit)
                    .cursorPage(next);
            }

            return proposals;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getProposalStats(job_id) {
        try {
            const stats = Proposal.query()
                .where({
                    job_id,
                })
                .select("current_proposal_status_id")
                .count("current_proposal_status_id")
                .groupBy("current_proposal_status_id");

                // i believe it will be an array of this
                // [ { current_proposal_status_id: 1, count: '1' } ]
            return stats;
        } catch (error) {
            throw error;
        }
    }

    static async getProposalHistoryById(id) {
        try {
            const proposal = await this.getProposal(id);
            if (!proposal) {
                return null;
            }

            return proposal;
        } catch (error) {
            throw error;
        }
    }

    static async updateProposal(id, updateParams) {
        // job owner will update the bids status and or client comment and rating
        // user freelancer comment or rating
        try {
            const updatedproposal = await Proposal.query().patchAndFetchById(
                id,
                {
                    ...updateParams,
                }
            );
            return updatedproposal;
        } catch (error) {
            throw error;
        }
    }

    static async _deleteWithdrawProposal(id) {
        // freelancer will withdraw proposal aka delete
        try {
            const proposal = await Proposal.query().findById(id);

            if (!proposal) {
                return null;
            }

            return await Proposal.query().deleteById(id);
        } catch (error) {
            throw error;
        }
    }

    static async _deleteMany(ids) {
        // bulk delete proposals

        try {
            const proposals = await Proposal.query()
                .delete()
                .whereIn("id", ids);

            return ids;
        } catch (error) {
            throw error;
        }
    }

    // helpers =========================================
    static async getProposal(id, withHistory = true) {
        try {
            //default
            const proposal = await Proposal.query()
                .where("id", id)
                .modify("defaultSelects")
                // .withGraphFetched(`histories(defaultSelects)`)
                .first();

            if (!proposal) {
                return null;
            }
            return proposal;
        } catch (error) {
            throw error;
        }
    }

    static async basicDetails(Proposal) {
        const {
            id,
            job_id,
            freelancer_id,
            current_proposal_status,
            client_comment,
            client_rating,
            freelancer_comment,
            freelancer_rating,
            updated_at,
            created_at,
            history,
        } = Proposal;

        return {
            id,
            job_id,
            freelancer_id,
            current_proposal_status,
            client_comment,
            client_rating,
            freelancer_comment,
            freelancer_rating,
            updated_at,
            created_at,
            history,
        };
    }
}

module.exports = ProposalService;

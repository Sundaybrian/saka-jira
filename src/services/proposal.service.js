const Proposal = require("../models/Proposal/Proposal.Model");

class ProposalService {
    constructor() {}

    static async sendProposal(params) {
        try {
            const proposal = await Proposal.query().insert(params);

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
            return proposals;
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

            return this.basicDetails(proposal);
        } catch (error) {
            throw error;
        }
    }

    static async updateProposal(id, updateParams) {
        // job owner will update the bids
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
        // freelancer will withdraw proposal
        try {
            const proposal = await Proposal.query().findOne({ id });

            if (!proposal) {
                return null;
            }

            await Proposal.query().deleteById(id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // helpers
    static async getProposal(id) {
        try {
            const proposal = await Proposal.query()
                .where("id", id)
                .modify("defaultSelects")
                .withGraphFetched(
                    `[history(defaultSelects),proposalStatus(defaultSelects)]`
                )
                .first();

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

const ProposalStatus = require("../models/ProposalStatus/ProposalStatus.Model");

class ProposalStatusService {
    constructor() {}

    static async createProposalStatus(params) {
        try {
            const proposalStatus = await ProposalStatus.query().insert(params);

            return this.basicDetails(proposalStatus);
        } catch (error) {
            throw error;
        }
    }

    static async getAllProposalStatuses() {
        const proposalStatus = await ProposalStatus.query();
        return proposalStatus;
    }

    static async updateProposalStatus(id, params) {
        const updatedproposalStatus = await ProposalStatus.query().patchAndFetchById(
            id,
            {
                ...params,
            }
        );

        return updatedproposalStatus;
    }

    static async getProposalStatusById(id) {
        try {
            const proposalStatus = await this.getProposalStatus({ id });
            if (!proposalStatus) {
                return null;
            }

            return this.basicDetails(proposalStatus);
        } catch (error) {
            throw error;
        }
    }

    static async _delete(id) {
        const proposalStatus = await this.getProposalStatus({ id });
        if (!proposalStatus) {
            return null;
        }

        await ProposalStatus.query().deleteById(id);

        return true;
    }

    static async getProposalStatus(params) {
        const proposalStatus = await ProposalStatus.query()
            .where({ ...params })
            .first();

        return proposalStatus;
    }

    static async basicDetails(proposalStatus) {
        const { id, proposal_status_name } = proposalStatus;

        return {
            id,
            proposal_status_name,
        };
    }
}

module.exports = ProposalStatusService;

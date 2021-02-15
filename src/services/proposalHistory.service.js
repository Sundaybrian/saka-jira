const ProposalHistory = require("../models/ProposalHistory/ProposalHistory.Model");

class ProposalHistoryService {
    constructor() {}

    static async freelancerJobStats() {
        try {
            const freelancerStats = await ProposalHistory.query();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProposalHistoryService;

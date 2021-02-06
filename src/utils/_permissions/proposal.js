const ProposalService = require("../../services/proposal.service");

// permissions
function canUpdateProposalFreelancer(user, proposal) {
    return proposal.freelancer_id == user.freelancer.id;
}

function setFreelancerProposal(req, res, next) {
    const id = parseInt(req.params.id);

    ProposalService.getJobById(id, false)
        .then((proposal) => {
            req.proposal = proposal;
            next();
        })
        .catch(next);
}

function authUpdateFreelancerFeedBackProposal(req, res, next) {
    if (!canUpdateProposalFreelancer(req.user, req.proposal)) {
        return res.status(401).json("Action is Not Allowed");
    }
    next();
}

// module export
module.exports = {
    setHiringManager,
    authUpdateFreelancerFeedBackProposal,
    setFreelancerProposal,
};

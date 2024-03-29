const ProposalService = require("../../services/proposal.service");

// permissions
function canUpdateProposalFreelancer(user, proposal) {
    return proposal.freelancer_id == user.freelancer.id;
}

// permissions
function canUpdateClientFeedbackProposal(user, job) {
    return job.hiringManager.user_id == user.id;
}

function setFreelancerProposal(req, res, next) {
    const id = parseInt(req.params.id);

    ProposalService.getProposalHistoryById(id, false)
        .then((proposal) => {
            if (!proposal) return res.sendStatus(404);
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

function authUpdateClientFeedBackProposal(req, res, next) {
    if (!canUpdateClientFeedbackProposal(req.user, req.job)) {
        return res.status(401).json("Action is Not Allowed");
    }
    next();
}

// module export
module.exports = {
    authUpdateFreelancerFeedBackProposal,
    authUpdateClientFeedBackProposal,
    setFreelancerProposal,
};

const {
    createSchema,
    getJobProposalsSchema,
    updateSchemaClient,
    updateSchemaFreelancer,
    rejectProposalSchemaClient,
    bulkDeleteProposalsSchema,
} = require("./proposal.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const ProposalService = require("../../services/proposal.service");
const { Auth } = require("../../_middlewares/auth");
const {
    setHiringManagerJob,
    setHiringManagerJobProposal,
    authUpdateHiringManagerJob,
} = require("../../utils/_permissions/hiringManager");

const {
    setFreelancerProposal,
    authUpdateFreelancerFeedBackProposal,
    authUpdateClientFeedBackProposal,
} = require("../../utils/_permissions/proposal");

// controllers
router.post("/", Auth([Role.user]), createSchema, sendProposal);
router.get("/freelancerProposals", Auth([Role.user]), getProposalsFreelancer);
router.get(
    "/jobProposals/:job_id",
    Auth([Role.user]),
    setHiringManagerJobProposal,
    authUpdateHiringManagerJob,
    getProposalsByJob
);
// TODO NOT WORKING WITH GRAPH FETCHED
router.get("/:id/proposalHistory", Auth(), getProposalHistory);

router.patch(
    "/:id/freelancerFeedback",
    updateSchemaFreelancer,
    Auth([Role.user]),
    setFreelancerProposal,
    authUpdateFreelancerFeedBackProposal,
    freelancerJobFeedback
);

router.patch(
    "/:id/clientFeedback/:job_id",
    updateSchemaClient,
    Auth([Role.user]),
    setHiringManagerJobProposal,
    authUpdateClientFeedBackProposal,
    clientJobFeedback
);

router.delete(
    "/:id/withdrawProposal/",
    Auth([Role.user]),
    setFreelancerProposal,
    authUpdateFreelancerFeedBackProposal,
    withdrawProposal
);

router.delete(
    "/:id/rejectProposal/:job_id",
    Auth([Role.user]),
    setHiringManagerJobProposal,
    authUpdateHiringManagerJob,
    rejectProposal
);

router.post(
    "/bulkRejectProposals",
    bulkDeleteProposalsSchema,
    Auth([Role.user]),
    // setHiringManagerJobProposal,
    // authUpdateHiringManagerJob,
    bulkRejectProposal
);

module.exports = router;

// send bid
function sendProposal(req, res, next) {
    const payload = {
        job_id: parseInt(req.body.job_id),
        freelancer_id: parseInt(req.user.freelancer.id),
        current_proposal_status_id: 1, // will set status as sent
    };

    ProposalService.sendProposal(payload)
        .then((proposal) => res.json(proposal))
        .catch(next);
}

// fetch all your bid proposals freelancer
function getProposalsFreelancer(req, res, next) {
    let nextPage = null;

    const limit = parseInt(req.query.limit) || 50;

    // initialize with freelancer id
    const match = {
        freelancer_id: parseInt(req.user.freelancer.id),
    };

    // proposal status is passed aka bid status eg. sent
    if (req.query.proposalStatus) {
        match.current_proposal_status_id = parseInt(req.query.proposalStatus);
    }

    if (req.query.nextPage) {
        nextPage = req.query.nextPage;
    }

    ProposalService.getProposals(nextPage, match, limit)
        .then((bids) => {
            return bids ? res.json(bids) : res.sendStatus(404);
        })
        .catch(next);
}

// fetch bids by job id
// perm job.hiringManager to match req.user.hiringManager.id
function getProposalsByJob(req, res, next) {
    let nextPage = null;

    const limit = parseInt(req.query.limit) || 10;

    // initialize with job id
    const match = {
        job_id: parseInt(req.params.job_id),
        current_proposal_status_id: parseInt(req.query.proposalStatus) || 1,
    };

    if (req.query.nextPage) {
        nextPage = req.query.nextPage;
    }

    if (req.query.proposalStatus) {
        match.current_proposal_status_id = parseInt(req.query.proposalStatus);
    }

    ProposalService.getProposals(nextPage, match, limit)
        .then((bids) => {
            return bids ? res.json(bids) : res.sendStatus(404);
        })
        .catch(next);
}

// fetch proposal history
function getProposalHistory(req, res, next) {
    const id = parseInt(req.params.id);

    ProposalService.getProposalHistoryById(id)
        .then((proposalHistory) =>
            proposalHistory ? res.json(proposalHistory) : res.sendStatus(404)
        )
        .catch(next);
}

// update proposal freelancer comment and rating
function freelancerJobFeedback(req, res, next) {
    const id = parseInt(req.params.id);
    req.body.current_proposal_status_id = 3; //client feedback

    ProposalService.updateProposal(id, req.body)
        .then((proposal) =>
            proposal ? res.json(proposal) : res.sendStatus(404)
        )
        .catch(next);
}

// update proposal client comment and rating and possible status
function clientJobFeedback(req, res, next) {
    const id = parseInt(req.params.id); // proposal id

    const {
        current_proposal_status_id,
        client_comment,
        client_rating,
    } = req.body;

    const payload = {
        current_proposal_status_id,
        client_comment,
        client_rating,
    };

    ProposalService.updateProposal(id, payload)
        .then((updatedProposal) =>
            updatedProposal ? res.json(updatedProposal) : res.sendStatus(404)
        )
        .catch(next);
}

// for freelancer
function withdrawProposal(req, res, next) {
    // only freelancers can withdraw a proposal

    const id = parseInt(req.params.id);
    ProposalService._deleteWithdrawProposal(id)
        .then((proposal) => {
            return !proposal ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

//
function rejectProposal(req, res, next) {
    // only hiring managers can delete a proposal aka bid

    const id = parseInt(req.params.id);

    ProposalService._deleteWithdrawProposal(id)
        .then((proposal) => {
            return !proposal ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

//
function bulkRejectProposal(req, res, next) {
    // only hiring managers can delete a proposals aka bid

    const { ids } = req.body;

    ProposalService._deleteMany(ids)
        .then((proposals) => {
            return !proposals ? res.sendStatus(404) : res.json({ ids });
        })
        .catch(next);
}

const {
    createSchema,
    updateSchemaClient,
    updateSchemaFreelancer,
} = require("./jobStatus.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const ProposalService = require("../../services/proposal.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.user]), createSchema, sendProposal);
router.get("/", getAllJobStatuses);
router.get("/:id", getJobStatusById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteJobStatus);

module.exports = router;

function sendProposal(req, res, next) {
    const payload = {
        job_id: parseInt(req.body.job_id),
        freelancer_id: parseInt(req.user.freelancer.id),
        current_proposal_status_id: 1, // will sent status
    };

    ProposalService.sendProposal(payload)
        .then((proposal) => res.json(proposal))
        .catch(next);
}

function getAllJobStatuses(req, res, next) {
    ProposalService.getAllJobStatuses()
        .then((jobStatuss) => {
            return jobStatuss ? res.json(jobStatuss) : res.sendStatus(404);
        })
        .catch(next);
}

function getJobStatusById(req, res, next) {
    const id = parseInt(req.params.id);

    ProposalService.getJobStatusById(id)
        .then((jobStatus) =>
            jobStatus ? res.json(jobStatus) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    ProposalService.updateJobStatus(id, req.body)
        .then((jobStatus) =>
            jobStatus ? res.json(jobStatus) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteJobStatus(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    ProposalService._delete(id)
        .then((jobStatus) => {
            return !jobStatus ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

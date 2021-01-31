const { createSchema, updateSchema } = require("./proposalStatus.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const ProposalStatusService = require("../../services/proposalStatus.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllProposalStatuses);
router.get("/:id", getProposalStatusById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteProposalStatus);

module.exports = router;

function create(req, res, next) {
    ProposalStatusService.createProposalStatus(req.body)
        .then((proposal_status) => res.json(proposal_status))
        .catch(next);
}

function getAllProposalStatuses(req, res, next) {
    ProposalStatusService.getAllProposalStatuses()
        .then((proposal_statuss) => {
            return proposal_statuss
                ? res.json(proposal_statuss)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getProposalStatusById(req, res, next) {
    const id = parseInt(req.params.id);

    ProposalStatusService.getProposalStatusById(id)
        .then((proposal_status) =>
            proposal_status ? res.json(proposal_status) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    ProposalStatusService.updateProposalStatus(id, req.body)
        .then((proposal_status) =>
            proposal_status ? res.json(proposal_status) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteProposalStatus(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    ProposalStatusService._delete(id)
        .then((proposal_status) => {
            return !proposal_status ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

const { createSchema, updateSchema } = require("./jobStatus.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const JobStatusService = require("../../services/jobStatus.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllJobStatuses);
router.get("/:id", getJobStatusById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteJobStatus);

module.exports = router;

function create(req, res, next) {
    JobStatusService.createJobStatus(req.body)
        .then((jobStatus) => res.json(jobStatus))
        .catch(next);
}

function getAllJobStatuses(req, res, next) {
    JobStatusService.getAllJobStatuses()
        .then((jobStatuss) => {
            return jobStatuss ? res.json(jobStatuss) : res.sendStatus(404);
        })
        .catch(next);
}

function getJobStatusById(req, res, next) {
    const id = parseInt(req.params.id);

    JobStatusService.getJobStatusById(id)
        .then((jobStatus) =>
            jobStatus ? res.json(jobStatus) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    JobStatusService.updateJobStatus(id, req.body)
        .then((jobStatus) =>
            jobStatus ? res.json(jobStatus) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteJobStatus(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    JobStatusService._delete(id)
        .then((jobStatus) => {
            return !jobStatus ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

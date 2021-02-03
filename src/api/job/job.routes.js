
const router = require("express");
const { createSchema, updateSchema } = require("./freelancer.validators");
const Role = require("../../constants/roles");
const JobService = require("../../services/job.service");

const { Auth } = require("../../_middlewares/auth");

const {
    setHiringManager,
} = require("../../utils/_permissions/hiringManager");



router.post("/", Auth([Role.user]), setHiringManager,createSchema, create);
router.get("/", Auth(),getAllJobs);
router.get("/:id", Auth(),getJobById);
router.patch(
    "/:id",
    Auth(),
    setHiringManager,
    authUpdateHiringManagerJob,
    updateSchema,
    updateJob
);

router.delete("/:id", Auth([Role.admin]), deleteJob);

module.exports = router;

function create(req, res, next) {
    // adding required values to req.body
    req.body.hiring_manager_id = parseInt(req.hiringManager.id);
    req.body.job_status_id = 1;

    JobService.createJob(req.body)
        .then((job) => res.json(job))
        .catch(next);
}

// fetch all your tasks
// GET /tasks?completed=true
// GET /tasks?limit=3&skip=3
// GET /tasks?sortBy=createdAt:desc
function getAllJobs(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    JobService.getAllJobs()
        .then((freelancers) => {
            return freelancers ? res.json(freelancers) : res.sendStatus(404);
        })
        .catch(next);
}

function getFreelancerById(req, res, next) {
    const id = parseInt(req.params.id);

    JobService.getFreelancerById(id)
        .then((freelancer) =>
            freelancer ? res.json(freelancer) : res.sendStatus(404)
        )
        .catch(next);
}

function updateFreelancer(req, res, next) {
    const id = parseInt(req.params.id);

    JobService.updateFreelancer(id, req.body)
        .then((freelancer) =>
            freelancer ? res.json(freelancer) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteFreelancer(req, res, next) {
    // only admin can delete a subscription type
    // TODO DELETE USER ACCOUNT ALSO
    const id = parseInt(req.params.id);
    JobService._delete(id)
        .then((freelancer) => {
            return !freelancer ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

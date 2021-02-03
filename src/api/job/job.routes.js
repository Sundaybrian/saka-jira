
const router = require("express").Router();
const { createSchema, updateSchema } = require("./job.validators.validators");
const Role = require("../../constants/roles");
const JobService = require("../../services/job.service");

const { Auth } = require("../../_middlewares/auth");

const {
    setHiringManager,
    authUpdateHiringManagerJob,
    setHiringManagerJob
} = require("../../utils/_permissions/hiringManager");



router.post("/", Auth([Role.user]), setHiringManager,createSchema, create);
router.get("/", Auth(),getAllJobs);
router.get("/:id", Auth(),getJobById);
router.patch(
    "/:id",
    Auth(),
    setHiringManager,
    setHiringManagerJob,
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

// TODO PAGINATE
// GET /jobs?completed=true
// GET /jobs?limit=3&skip=3
// GET /jobs?sortBy=createdAt:desc
function getAllJobs(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    JobService.getAllJobs()
        .then((jobs) => {
            return jobs ? res.json(jobs) : res.sendStatus(404);
        })
        .catch(next);
}

function getJobById(req, res, next) {
    const id = parseInt(req.params.id);

    JobService.getJobById(id)
        .then((job) =>
            job ? res.json(job) : res.sendStatus(404)
        )
        .catch(next);
}

function updateJob(req, res, next) {
    const id = parseInt(req.params.id);

    JobService.updateJob(id, req.body)
        .then((job) =>
            job ? res.json(job) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteJob(req, res, next) {
    // only admin can delete a job
    const id = parseInt(req.params.id);
    JobService._delete(id)
        .then((job) => {
            return !job ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

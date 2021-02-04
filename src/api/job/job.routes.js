const router = require("express").Router();
const { createSchema, updateSchema } = require("./job.validators");
const Role = require("../../constants/roles");
const JobService = require("../../services/job.service");

const { Auth } = require("../../_middlewares/auth");

const {
    setHiringManager,
    authUpdateHiringManagerJob,
    setHiringManagerJob,
} = require("../../utils/_permissions/hiringManager");

router.post("/", Auth([Role.user]), setHiringManager, createSchema, create);
router.get("/", Auth(), getAllJobs);
router.get("/:id", Auth(), getJobById);
router.patch(
    "/:id",
    Auth([Role.user]),
    updateSchema,
    setHiringManagerJob,
    authUpdateHiringManagerJob,
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
// GET /jobs?industry=1&limit=20
// GET /jobs?industry=2
// GET /jobs?industry=1&limit=3&nextPage=flsdjfjdfjslfjlksdjfl&jobStatus=2
// GET /jobs?sortBy=created_at:desc //soon
function getAllJobs(req, res, next) {
    const nextPage = null; // will be used for cursor pagination

    const match = {
        job_status_id: 1, // will rep the initial state of job i.e accepting quotes
    };

    const limit = parseInt(req.query.limit) || 10;

    if (req.query.industry) {
        match.industry_id = parseInt(req.query.industry);
    }

    if (req.query.jobStatus) {
        match.job_status_id = parseInt(req.query.jobStatus);
    }

    if (req.query.nextPage) {
        nextPage = req.query.nextPage;
    }

    JobService.getAllJobs(nextPage, match, limit)
        .then((jobs) => {
            return jobs ? res.json(jobs) : res.sendStatus(404);
        })
        .catch(next);
}

function getJobById(req, res, next) {
    const id = parseInt(req.params.id);

    JobService.getJobById(id)
        .then((job) => (job ? res.json(job) : res.sendStatus(404)))
        .catch(next);
}

function updateJob(req, res, next) {
    const id = parseInt(req.params.id);
    console.log(id);

    JobService.updateJob(id, req.body)
        .then((job) => (job ? res.json(job) : res.sendStatus(404)))
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

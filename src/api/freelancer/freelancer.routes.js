const {
    createSchema,
    updateSchema,
    getStatsSchema,
} = require("./freelancer.validators");
const Role = require("../../constants/roles");
const FreelancerService = require("../../services/freelancer.service");

const { Auth } = require("../../_middlewares/auth");
const {
    setFreelancer,
    authUpdateFreelancer,
} = require("../../utils/_permissions/freelancer");

const Skills = require("../HasSkill/hasSkill.routes");

const router = require("express").Router({
    mergeParams: true,
});

//api/v1/freelancer/:freelancer_id/skills
router.use("/:id/skills", Skills);

router.post("/", Auth(), createSchema, create);
router.get("/", Auth(), getAllFreelancers);
router.get(
    "/:freelancer_id/freelancerStats/:hiring_manager_id/",
    Auth(),
    getStatsSchema,
    freelancerStats
);
router.get("/:id", Auth(), getFreelancerById);
router.patch(
    "/:id",
    Auth(),
    setFreelancer,
    authUpdateFreelancer,
    updateSchema,
    updateFreelancer
);

router.delete("/:id", Auth([Role.admin]), deleteFreelancer);

module.exports = router;

function create(req, res, next) {
    // add logged in userid
    req.body.user_id = parseInt(req.user.id);
    FreelancerService.createFreelancer(req.body)
        .then((freelancer) => res.json(freelancer))
        .catch(next);
}

// fetch all freelancers
// GET /freelancers?industry=1
// GET /freelancers?limit=30
function getAllFreelancers(req, res, next) {
    let nextPage = null;

    const limit = parseInt(req.query.limit) || 30;

    // initialize with job id
    const match = {
        industry_id: parseInt(req.params.industry) || 1,
    };

    if (req.query.nextPage) {
        nextPage = req.query.nextPage;
    }

    FreelancerService.getAllFreelancers(nextPage, match, limit)
        .then((freelancers) => {
            return freelancers ? res.json(freelancers) : res.sendStatus(404);
        })
        .catch(next);
}

function freelancerStats(req, res, next) {
    const completed_status = 7;
    const inprogress_status = 5;

    const { freelancer_id, hiring_manager_id } = req.params;

    FreelancerService.freelancerProfileStats(
        parseInt(freelancer_id),
        parseInt(hiring_manager_id),
        inprogress_status,
        completed_status
    )
        .then((stats) => (stats ? res.json(stats) : res.sendStatus(404)))
        .catch(next);
}

function getFreelancerById(req, res, next) {
    const id = parseInt(req.params.id);

    FreelancerService.getFreelancerById(id)
        .then((freelancer) =>
            freelancer ? res.json(freelancer) : res.sendStatus(404)
        )
        .catch(next);
}

function updateFreelancer(req, res, next) {
    const id = parseInt(req.params.id);

    FreelancerService.updateFreelancer(id, req.body)
        .then((freelancer) =>
            freelancer ? res.json(freelancer) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteFreelancer(req, res, next) {
    // only admin can delete a subscription type
    // TODO DELETE USER ACCOUNT ALSO
    const id = parseInt(req.params.id);
    FreelancerService._delete(id)
        .then((freelancer) => {
            return !freelancer ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

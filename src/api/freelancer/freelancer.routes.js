const { createSchema, updateSchema } = require("./freelancer.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const FreelancerService = require("../../services/freelancer.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth(), createSchema, create);
router.get("/", getAllFreelancers);
router.get("/:id", getFreelancerById);
router.patch("/:id", Auth([Role.user]), updateSchema, updateFreelancer);

router.delete("/:id", Auth([Role.admin]), deleteFreelancer);

module.exports = router;

function create(req, res, next) {
    // add logged in userid
    req.body.user_id = parseInt(req.user.id);
    FreelancerService.createFreelancer(req.body)
        .then((freelancer) => res.json(freelancer))
        .catch(next);
}

// fetch all your tasks
// GET /tasks?completed=true
// GET /tasks?limit=3&skip=3
// GET /tasks?sortBy=createdAt:desc
function getAllFreelancers(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    FreelancerService.getAllFreelancers()
        .then((freelancers) => {
            return freelancers ? res.json(freelancers) : res.sendStatus(404);
        })
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

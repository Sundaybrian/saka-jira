const {
    createSchema,
    updateSchema,
} = require("./freelancerSubscription.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const FreelancerSubscriptionService = require("../../services/freelancerSubscription.service");
const { Auth } = require("../../_middlewares/auth");
const {
    setFreelancer,
    authFetchFreelancerSubscription,
} = require("../../utils/_permissions/freelancer");

router.post(
    "/",
    Auth([Role.admin]),
    createSchema,
    createFreelancerSubscription
);
router.get("/", Auth([Role.admin]), getAllFreelancerSubscriptions);
router.get(
    "/:id",
    Auth(),
    setFreelancer,
    authFetchFreelancerSubscription,
    getFreelancerSubscriptionById
);
router.patch(
    "/:id",
    Auth([Role.admin]),
    updateSchema,
    updateFreelancerSubscription
);

router.delete("/:id", Auth([Role.admin]), deleteFreelancerSubscription);

module.exports = router;

function createFreelancerSubscription(req, res, next) {
    const { freelancer_id, expiry_date } = req.body;

    FreelancerSubscriptionService.createFreelancerSubscription(
        freelancer_id,
        expiry_date
    )
        .then((freelancer_subscription) => res.json(freelancer_subscription))
        .catch(next);
}

/// TODO paginations
function getAllFreelancerSubscriptions(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    FreelancerSubscriptionService.getAllFreelancersSubscriptions()
        .then((hiringManagers) => {
            return hiringManagers
                ? res.json(hiringManagers)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getFreelancerSubscriptionById(req, res, next) {
    const id = parseInt(req.params.id);

    FreelancerSubscriptionService.getFreelancerSubscriptionById(id)
        .then((freelancer_subscription) =>
            freelancer_subscription
                ? res.json(freelancer_subscription)
                : res.sendStatus(404)
        )
        .catch(next);
}

// TODO WILL be accessed via backend with endpoint or with admin
function updateFreelancerSubscription(req, res, next) {
    const { freelancer_id, expiry_date } = req.body;

    FreelancerSubscriptionService.updateFreelancerSubscription(
        freelancer_id,
        expiry_date
    )
        .then((freelancer_subscription) =>
            freelancer_subscription
                ? res.json(freelancer_subscription)
                : res.sendStatus(404)
        )
        .catch(next);
}

function deleteFreelancerSubscription(req, res, next) {
    // only admin can delete a subscription type
    // TODO DELETE USER subscripion ACCOUNT ALSO
    const id = parseInt(req.params.id);
    FreelancerSubscriptionService._delete(id)
        .then((freelancer_subscription) => {
            return !freelancer_subscription
                ? res.sendStatus(404)
                : res.json({ id });
        })
        .catch(next);
}

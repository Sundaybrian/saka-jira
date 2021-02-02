const {
    createSchema
} = require("./hasSkill.validators");
const Role = require("../../constants/roles");
const HasSkillService = require("../../services/hasSkill.service");


const { Auth } = require("../../_middlewares/auth");
const {
    setFreelancer,
    authUpdateFreelancer,
} = require("../../utils/_permissions/freelancer");


const router = require("express").Router({
    mergeParams: true,
});

router.post(
    "/",
    Auth(),
    setFreelancer,
    authUpdateFreelancer,
    createSchema,
    addSkill
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

function addSkill(req, res, next) {
    const { skill_id} = req.body;
    const payload = {
        skill_id,
        freelacer_id: parseInt(req.freelacer.id)
    }

    HasSkillService.addSkill(
        payload
    )
        .then((skill) => res.json(skill))
        .catch(next);
}

/// TODO paginations
function getAllFreelancerSubscriptions(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    HasSkillService.getAllFreelancersSubscriptions()
        .then((hiringManagers) => {
            return hiringManagers
                ? res.json(hiringManagers)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getFreelancerSubscriptionById(req, res, next) {
    const id = parseInt(req.params.id);

    HasSkillService.getFreelancerSubscriptionById(id)
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

    HasSkillService.updateFreelancerSubscription(
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
    HasSkillService._delete(id)
        .then((freelancer_subscription) => {
            return !freelancer_subscription
                ? res.sendStatus(404)
                : res.json({ id });
        })
        .catch(next);
}

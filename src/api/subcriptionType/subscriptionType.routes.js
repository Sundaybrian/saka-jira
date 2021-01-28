const { createSchema, updateSchema } = require("./subscriptionType.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const SubscriptionTypeService = require("../../services/subscriptionType.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllSubscriptionType);
router.get("/:id", getSubscriptionTypeById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteSubscriptionType);

module.exports = router;

function create(req, res, next) {
    SubscriptionTypeService.createSubscriptionType(req.body)
        .then((subscriptionType) => res.json(subscriptionType))
        .catch(next);
}

function getAllSubscriptionType(req, res, next) {
    SubscriptionTypeService.getAllSubscriptionType()
        .then((subscriptionTypes) => {
            return subscriptionTypes
                ? res.json(subscriptionTypes)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getSubscriptionTypeById(req, res, next) {
    const id = parseInt(req.params.id);

    SubscriptionTypeService.getSubscriptionTypeById(id)
        .then((subscriptionType) =>
            subscriptionType ? res.json(subscriptionType) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    SubscriptionTypeService.updateSubscriptionType(id, req.body)
        .then((subscriptionType) =>
            subscriptionType ? res.json(subscriptionType) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteSubscriptionType(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    SubscriptionTypeService._delete(id)
        .then((sub) => {
            return !sub ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

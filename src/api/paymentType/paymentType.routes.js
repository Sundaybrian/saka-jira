const { createSchema, updateSchema } = require("./paymentType.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const PaymentTypeService = require("../../services/paymentType.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllPaymentTypes);
router.get("/:id", getPaymentTypeById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deletePaymentType);

module.exports = router;

function create(req, res, next) {
    PaymentTypeService.createPaymentType(req.body)
        .then((payment_type) => res.json(payment_type))
        .catch(next);
}

function getAllPaymentTypes(req, res, next) {
    PaymentTypeService.getAllPaymentTypes()
        .then((payment_types) => {
            return payment_types
                ? res.json(payment_types)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getPaymentTypeById(req, res, next) {
    const id = parseInt(req.params.id);

    PaymentTypeService.getPaymentTypeById(id)
        .then((payment_type) =>
            payment_type ? res.json(payment_type) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    PaymentTypeService.updatePaymentType(id, req.body)
        .then((payment_type) =>
            payment_type ? res.json(payment_type) : res.sendStatus(404)
        )
        .catch(next);
}

function deletePaymentType(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    PaymentTypeService._delete(id)
        .then((payment_type) => {
            return !payment_type ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

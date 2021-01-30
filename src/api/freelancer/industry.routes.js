const { createSchema, updateSchema } = require("./industry.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const IndustryService = require("../../services/industry.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllIndustries);
router.get("/:id", getIndustryById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteIndustry);

module.exports = router;

function create(req, res, next) {
    IndustryService.createIndustry(req.body)
        .then((industry) => res.json(industry))
        .catch(next);
}

function getAllIndustries(req, res, next) {
    IndustryService.getAllIndustries()
        .then((industrys) => {
            return industrys ? res.json(industrys) : res.sendStatus(404);
        })
        .catch(next);
}

function getIndustryById(req, res, next) {
    const id = parseInt(req.params.id);

    IndustryService.getIndustryById(id)
        .then((industry) =>
            industry ? res.json(industry) : res.sendStatus(404)
        )
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    IndustryService.updateIndustry(id, req.body)
        .then((industry) =>
            industry ? res.json(industry) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteIndustry(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    IndustryService._delete(id)
        .then((industry) => {
            return !industry ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

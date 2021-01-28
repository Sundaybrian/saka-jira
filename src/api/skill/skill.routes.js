const { createSchema, updateSchema } = require("./skill.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const SkillService = require("../../services/skill.service");
const { Auth } = require("../../_middlewares/auth");

router.post("/", Auth([Role.admin]), createSchema, create);
router.get("/", getAllSkills);
router.get("/:id", getSkillById);
router.patch("/:id", Auth([Role.admin]), updateSchema, update);
router.delete("/:id", Auth([Role.admin]), deleteSkill);

module.exports = router;

function create(req, res, next) {
    SkillService.createSkill(req.body)
        .then((skill) => res.json(skill))
        .catch(next);
}

function getAllSkills(req, res, next) {
    SkillService.getAllSkills()
        .then((skills) => {
            return skills ? res.json(skills) : res.sendStatus(404);
        })
        .catch(next);
}

function getSkillById(req, res, next) {
    const id = parseInt(req.params.id);

    SkillService.getSkillById(id)
        .then((skill) => (skill ? res.json(skill) : res.sendStatus(404)))
        .catch(next);
}

function update(req, res, next) {
    const id = parseInt(req.params.id);
    SkillService.updateSkill(id, req.body)
        .then((skill) => (skill ? res.json(skill) : res.sendStatus(404)))
        .catch(next);
}

function deleteSkill(req, res, next) {
    // only admin can delete a subscription type

    const id = parseInt(req.params.id);
    SkillService._delete(id)
        .then((skill) => {
            return !skill ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

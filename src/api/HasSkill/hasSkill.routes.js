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
router.get("/", Auth(), setFreelancer,  authUpdateFreelancer,getMySkills);
router.delete("/:skill_id", Auth(), setFreelancer,  authUpdateFreelancer, removeSkill);

module.exports = router;

function addSkill(req, res, next) {
    const { skill_id} = req.body;
    const payload = {
        skill_id,
        freelancer_id: parseInt(req.freelancer.id)
    }

    HasSkillService.addSkill(
        payload
    )
        .then((skill) => res.json(skill))
        .catch(next);
}


function getMySkills(req, res, next) {

    const freelancer_id = parseInt(req.freelancer.id);

    HasSkillService.getMySkills(freelancer_id)
        .then((freelancer_and_skills) => {
            return freelancer_and_skills
                ? res.json(freelancer_and_skills)
                : res.sendStatus(404);
        })
        .catch(next);
}


function removeSkill(req, res, next) {
    // only admin can delete /freelancer can unrelate a skill from user 
    const id = parseInt(req.params.skill_id);
    HasSkillService._removeSkill(id)
        .then((freelancer_skill) => {
            return !freelancer_skill
                ? res.sendStatus(404)
                : res.json({ id });
        })
        .catch(next);
}

const { createSchema, updateSchema } = require("./hiringManager.validators");
const router = require("express").Router();
const Role = require("../../constants/roles");
const HiringManagerService = require("../../services/hiringManager.service");
const { Auth } = require("../../_middlewares/auth");
const {
    canUpdateHiringManager,
} = require("../../utils/_permissions/hiringManager");
const HiringManager = require("../../models/HiringManager/HiringManager.Model");

router.post("/", Auth(), createSchema, createHiringManager);
router.get("/", Auth(), getAllHiringManagers);
router.get("/:id", Auth(), getHiringManagerById);
router.patch(
    "/:id",
    Auth([Role.user]),
    setHiringManager,
    authUpdateHiringManager,
    updateSchema,
    updateHiringManager
);

router.delete(
    "/:id",
    Auth([Role.admin, Role.user]),
    setHiringManager,
    authUpdateHiringManager,
    deleteHiringManager
);

module.exports = router;

function createHiringManager(req, res, next) {
    // add logged in userid
    req.body.user_id = parseInt(req.user.id);
    HiringManagerService.createHiringManager(req.body)
        .then((hiringManager) => res.json(hiringManager))
        .catch(next);
}

// fetch all your tasks
// GET /tasks?completed=true
// GET /tasks?limit=3&skip=3
// GET /tasks?sortBy=createdAt:desc
function getAllHiringManagers(req, res, next) {
    // const limit = parseInt(req.query.limit) || 10;
    // const page = parseInt(req.query.page) || 1;

    HiringManagerService.getAllHiringManagers()
        .then((hiringManagers) => {
            return hiringManagers
                ? res.json(hiringManagers)
                : res.sendStatus(404);
        })
        .catch(next);
}

function getHiringManagerById(req, res, next) {
    const id = parseInt(req.params.id);

    HiringManagerService.getHiringManagerById(id)
        .then((hiringManager) =>
            hiringManager ? res.json(hiringManager) : res.sendStatus(404)
        )
        .catch(next);
}

function updateHiringManager(req, res, next) {
    const id = parseInt(req.params.id);

    HiringManagerService.updateHiringManager(id, req.body)
        .then((hiringManager) =>
            hiringManager ? res.json(hiringManager) : res.sendStatus(404)
        )
        .catch(next);
}

function deleteHiringManager(req, res, next) {
    // only admin can delete a subscription type
    // TODO DELETE USER ACCOUNT ALSO
    const id = parseInt(req.params.id);
    HiringManagerService._delete(id)
        .then((hiringManager) => {
            return !hiringManager ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

//
function setHiringManager(req, res, next) {
    HiringManager.query()
        .where("id", parseInt(req.params.id))
        .first()
        .then((manager) => {
            if (!manager) return res.sendStatus(404);
            req.manager = manager;
            next();
        })
        .catch(next);
}

function authUpdateHiringManager(req, res, next) {
    if (!canUpdateHiringManager(req.user, req.manager)) {
        res.status(401);
        return res.send("Action is Not Allowed");
    }

    next();
}

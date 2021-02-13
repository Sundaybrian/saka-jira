const router = require("express").Router();
const { Auth } = require("../../_middlewares/auth");
const Role = require("../../constants/roles");
const { createSchema, updateSchema } = require("./company.validators");
const {
    setCompanyOwner,
    authUpdateCompany,
} = require("../../utils/_permissions/company");

const CompanyService = require("../../services/company.service");

router.post("/", Auth([Role.user]), createSchema, create);
router.get("/", Auth([Role.admin]), getAllCompanies);
// router.get("/mine", Auth([Role.user]), getMyCompanies);
router.get("/:id", Auth(), getCompanyById);
router.patch(
    "/:id",
    Auth([Role.user, Role.admin]),
    setCompanyOwner,
    authUpdateCompany,
    updateSchema,
    update
);
router.delete("/:id", Auth([Role.admin, Role.user]), _deleteCompany);

module.exports = router;

function create(req, res, next) {
    req.body.owner_id = req.user.id;
    CompanyService.create(req.body)
        .then((company) => res.json(company))
        .catch(next);
}

function getAllCompanies(req, res, next) {
    let nextPage = null;

    const limit = parseInt(req.query.limit) || 30;

    const match = {
        active: true,
    };

    if (req.query.nextPage) {
        nextPage = req.query.nextPage;
    }

    CompanyService.getAllCompanies(nextPage, match, limit)
        .then((companies) => {
            return companies ? res.json(companies) : res.sendStatus(404);
        })
        .catch(next);
}

// function getMyCompanies(req, res, next) {
//     CompanyService.getMyCompanies(req.user.id)
//         .then((companies) =>
//             companies ? res.json(companies) : res.sendStatus(404)
//         )
//         .catch(next);
// }

function getCompanyById(req, res, next) {
    // TODO owner can get his company and the admin can get any company

    const id = parseInt(req.params.id);

    CompanyService.getCompanyById(id)
        .then((company) => {
            return company ? res.json(company) : res.sendStatus(404);
        })
        .catch(next);
}

function update(req, res, next) {
    // only owner can update their company
    CompanyService.updateCompany(
        { id: req.params.id, owner_id: req.user.id },
        req.body
    )
        .then((company) => res.json(company))
        .catch(next);
}

function _deleteCompany(req, res, next) {
    // only owner delete can delete their company
    CompanyService._delete({
        id: parseInt(req.params.id),
        owner_id: req.user.id,
    })
        .then(() => {
            res.json({ id: parseInt(req.params.id) });
        })
        .catch(next);
}

const { createSchema } = require("./companyDocs.validators");
// const Role = require("../../constants/roles");
const CompanyDocsService = require("../../../services/companyDocs.service");
const { Auth } = require("../../../_middlewares/auth");
const {
    setCompanyOwner,
    authUpdateCompany,
    authDeleteCompany,
} = require("../../../utils/_permissions/company");

const router = require("express").Router({
    mergeParams: true,
});

router.post(
    "/",
    Auth([Role.user]),
    setCompanyOwner,
    authUpdateCompany,
    createSchema,
    addDoc
);

router.get(
    "/",
    Auth([Role.user, Role.admin]),
    setCompanyOwner,
    authUpdateCompany,
    getDocs
);

router.delete("/:doc_id", Auth([Role.admin]), removeDoc);

module.exports = router;

function addDoc(req, res, next) {
    const payload = {
        ...req.body,
        company_id: parseInt(req.company.id),
    };

    CompanyDocsService.addSkill(payload)
        .then((doc) => res.json(doc))
        .catch(next);
}

function getDocs(req, res, next) {
    const company_id = parseInt(req.params.id);

    CompanyDocsService.getDocs(company_id)
        .then((docs) => {
            return docs ? res.json(docs) : res.sendStatus(404);
        })
        .catch(next);
}

function removeDoc(req, res, next) {
    // only admin can delete /freelancer can unrelate a skill from user
    const id = parseInt(req.params.doc_id);
    CompanyDocsService._removeDoc({ id })
        .then((doc) => {
            return !doc ? res.sendStatus(404) : res.json({ id });
        })
        .catch(next);
}

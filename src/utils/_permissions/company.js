const Role = require("../../constants/roles");
const CompanyService = require("../../services/company.service");

// permissions
function canUpdateCompany(user, company) {
    return user.role == Role.admin || user.id == company.owner_id;
}

// permissions
function canDeleteCompany(user, company) {
    return user.role == Role.admin || user.id == company.owner_id;
}

// permission middlewares
function setCompanyOwner(req, res, next) {
    const id = parseInt(req.params.id);
    CompanyService.getCompanyById(id)
        .then((company) => {
            if (!company) return res.sendStatus(404);
            req.company = company;
            next();
        })
        .catch(next);
}

function authUpdateCompany(req, res, next) {
    if (!canUpdateCompany(req.user, req.company)) {
        res.status(401);
        return res.send("Action is Not Allowed");
    }

    next();
}

function authDeleteCompany(req, res, next) {
    if (!canDeleteCompany(req.user, req.company)) {
        res.status(401);
        return res.send("Action is Not Allowed");
    }

    next();
}

// module export
module.exports = {
    setCompanyOwner,
    authUpdateCompany,
    authDeleteCompany,
};

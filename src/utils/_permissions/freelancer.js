const Role = require("../../constants/roles");
const FreelancerService = require("../../services/freelancer.service");

// permissions
function canUpdateFreelancer(user, freelancer) {
    return user.role == Role.admin || user.id == freelancer.user_id;
}

function canFetchFreelancerSubscription(user, freelancer) {
    return user.role == Role.admin || user.id == freelancer.user_id;
}

// permission middlewares
function setFreelancer(req, res, next) {
    FreelancerService.getFreelancerById(parseInt(req.params.id))
        .then((freelancer) => {
            req.freelancer = freelancer;
            next();
        })
        .catch(next);
}

function authFetchFreelancerSubscription(req, res, next) {
    if (!canFetchFreelancerSubscription(req.user, req.freelancer)) {
        res.status(401);
        return res.send("Action is Not Allowed");
    }

    next();
}

function authUpdateFreelancer(req, res, next) {
    if (!canUpdateFreelancer(req.user, req.freelancer)) {
        res.status(401);
        return res.send("Action is Not Allowed");
    }

    next();
}

// module export
module.exports = {
    canUpdateFreelancer,
    setFreelancer,
    authFetchFreelancerSubscription,
    authUpdateFreelancer,
};

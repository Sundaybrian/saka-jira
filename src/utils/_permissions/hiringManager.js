const HiringManagerService = require("../../services/hiringManager.service");
const JobService = require("../../services/job.service");

// permissions

// permissions
function canUpdateJob(user, job) {
    return job.hiringManager.user_id == user.id;
}
// function canUpdateHiringManager(user, hiring_manager) {
//     return user.role == Role.admin || user.id == hiring_manager.user_id;
// }

// function canCreateJob(user, hiring_manager) {
//     return user.role == Role.admin || user.id == freelancer.user_id;
// }

// permission middlewares
function setHiringManager(req, res, next) {
    HiringManagerService.fetchHiringManager({ user_id: parseInt(req.user.id) })
        .then((hiringManager) => {
            if (!hiringManager) return res.sendStaus(404);
            req.hiringManager = hiringManager;
            next();
        })
        .catch(next);
}

function setHiringManagerJob(req, res, next) {
    const id = parseInt(req.params.id) || parseInt(req.body.job_id);

    JobService.getJobById(id)
        .then((job) => {
            if (!job) return res.sendStaus(404);
            req.job = job;
            next();
        })
        .catch(next);
}

function authUpdateHiringManagerJob(req, res, next) {
    if (!canUpdateJob(req.user, req.job)) {
        return res.status(401).json("Action is Not Allowed");
    }
    next();
}

// module export
module.exports = {
    setHiringManager,
    authUpdateHiringManagerJob,
    setHiringManagerJob,
};

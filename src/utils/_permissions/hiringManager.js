const Role = require("../../constants/roles");
const HiringManagerService = require("../../services/hiringManager.service");

// permissions
// function canUpdateHiringManager(user, hiring_manager) {
//     return user.role == Role.admin || user.id == hiring_manager.user_id;
// }

// function canCreateJob(user, hiring_manager) {
//     return user.role == Role.admin || user.id == freelancer.user_id;
// }


// permission middlewares
function setHiringManager(req, res, next) {
    HiringManagerService.fetchHiringManager({user_id: parseInt(req.user.id)})
        .then((hiringManager) => {
            req.hiringManager = hiringManager;
            next();
        })
        .catch(next);
}




// module export
module.exports = {
    setHiringManager
    };


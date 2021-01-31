const Role = require("../../constants/roles");

async function canUpdateHiringManager(user, hiring_manager) {
    return user.role == Role.admin || user.id == hiring_manager.user_id;
}

module.exports = {
    canUpdateHiringManager,
};

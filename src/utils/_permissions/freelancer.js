const Role = require("../../constants/roles");

function canUpdateFreelancer(user, freelancer) {
    return user.role == Role.admin || user.id == freelancer.user_id;
}

module.exports = {
    canUpdateFreelancer,
};

const jwt = require("jsonwebtoken");
const config = require("../config/index");

function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            config.JWT_SECRET,
            {
                expiresIn: "3h",
            },
            (error, token) => {
                if (error) return reject(error);
                return resolve(token);
            }
        );
    });
}

module.exports = {
    sign,
};

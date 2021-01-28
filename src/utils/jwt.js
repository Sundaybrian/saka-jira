const jwt = require("jsonwebtoken");
const config = require("../config");

function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
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

const Joi = require("joi");

const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        skill_id: Joi.number().integer().required(),
    });
    validateRequest(req, next, schema);
};

// exports.deSchema = (req, res, next) => {
//     const schema = Joi.object({
//         freelancer_id: Joi.number().integer().required(),
//         skill_id: Joi.number().integer().required(),
//     });

//     validateRequest(req, next, schema);
// };

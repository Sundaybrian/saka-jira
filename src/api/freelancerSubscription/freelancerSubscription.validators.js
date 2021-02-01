const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        freelancer_id: Joi.number().integer().required(),
        expiry_date: Joi.date().iso().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        freelancer_id: Joi.number().integer().required(),
        expiry_date: Joi.date().iso().required(),
    });

    validateRequest(req, next, schema);
};

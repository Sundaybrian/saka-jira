const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        industry_id: Joi.number().integer(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        description: Joi.string().max(1000),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        industry_id: Joi.number().integer().empty(""),
        latitude: Joi.number().empty(""),
        longitude: Joi.number().empty(""),
        description: Joi.string().empty("").max(1000),
    });

    validateRequest(req, next, schema);
};

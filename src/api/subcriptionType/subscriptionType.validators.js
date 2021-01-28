const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        amount: Joi.number().required(),
        subscription_duration: Joi.string().required(),
        duration_in_days: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().empty(""),
        description: Joi.string().empty(""),
        amount: Joi.number().empty(""),
        subscription_duration: Joi.string().empty(""),
        duration_in_days: Joi.number().empty(""),
    });

    validateRequest(req, next, schema);
};

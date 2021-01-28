const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        subscription_type_name: Joi.string().required(),
        amount: Joi.number().required(),
        subscription_duration: Joi.string().required(),
        duration_in_days: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        subscription_type_name: Joi.string().required(),
        amount: Joi.number().required(),
        subscription_duration: Joi.string().required(),
        duration_in_days: Joi.number().required(),
    });

    validateRequest(req, next, schema);
};

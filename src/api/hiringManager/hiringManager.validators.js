const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        latitude: Joi.number().empty(""),
        longitude: Joi.number().empty(""),
    });

    validateRequest(req, next, schema);
};

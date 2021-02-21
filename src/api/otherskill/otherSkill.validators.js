const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        skill_name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

const Joi = require("joi");
const validateRequest = require("../../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        document_type: Joi.string().required(),
        description: Joi.string().required(),
        document_number: Joi.string().empty(""),
        document_url: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schemaRules = {
        document_type: Joi.string().required(),
        description: Joi.string().required(),
        document_number: Joi.string().empty(""),
        document_url: Joi.string().required(),
    };

    const schema = Joi.object(schemaRules);

    validateRequest(req, next, schema);
};

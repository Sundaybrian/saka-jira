const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        // current_proposal_status_id: Joi.number().integer(),
        job_id: Joi.number().integer().required(),
        // freealancer_id: Joi.number().integer().required(),
    });
    validateRequest(req, next, schema);
};

exports.getJobProposalsSchema = (req, res, next) => {
    const schema = Joi.object({
        job_id: Joi.number().integer().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchemaClient = (req, res, next) => {
    const schema = Joi.object({
        current_proposal_status_id: Joi.number().integer(),
        job_id: Joi.number().integer().required(),
        client_comment: Joi.string().max(30).empty(""),
        client_rating: Joi.number().integer().min(1).max(5),
    });

    validateRequest(req, next, schema);
};

exports.updateSchemaFreelancer = (req, res, next) => {
    const schema = Joi.object({
        job_id: Joi.number().integer().required(),
        freelancer_comment: Joi.string().max(1000).empty(""),
        freelancer_rating: Joi.number().integer().min(1).max(5),
    });

    validateRequest(req, next, schema);
};

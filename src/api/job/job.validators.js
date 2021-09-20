const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().max(100).required(),
        description: Joi.string().max(1000).required(),
        main_skill: Joi.string().max(100),
        text_data: Joi.string().empty(""),
        quill_data: Joi.any(),
        // hiring_manager_id: Joi.number().integer().required(),,
        industry_id: Joi.number().integer().required(),
        budget_range_min: Joi.number().integer(),
        start_date: Joi.date().iso().required().raw(),
        end_date: Joi.date().iso().required().raw(),
        budget_range_max: Joi.number().integer(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().max(30).empty(""),
        description: Joi.string().max(1000).empty(""),
        text_data: Joi.string().empty(""),
        quill_data: Joi.any().empty(""),
        main_skill: Joi.string().max(100),
        job_status_id: Joi.number().integer().empty(""),
        industry_id: Joi.number().integer().empty(""),
        budget_range_min: Joi.number().integer(),
        start_date: Joi.date().iso().empty("").raw(),
        end_date: Joi.date().iso().empty("").raw(),
        budget_range_max: Joi.number().integer(),
        latitude: Joi.number().empty(""),
        longitude: Joi.number().empty(""),
    });

    validateRequest(req, next, schema);
};

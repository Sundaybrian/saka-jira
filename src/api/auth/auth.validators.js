const Joi = require("joi");
const validateRequest = require("../../_middlewares/validateRequest");

exports.signupSchema = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.string().min(10).max(15).required(),
        image_url: Joi.string().empty(""),
        // role: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    validateRequest(req, next, schema);
};

exports.signinSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
    const schemaRules = {
        first_name: Joi.string().empty(""),
        last_name: Joi.string().empty(""),
        email: Joi.string().email().empty(""),
        role: Joi.string().min(5).empty(""),
        phone_number: Joi.string().min(10).max(15).empty(""),
        password: Joi.string().min(8).empty(""),
        confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
        image_url: Joi.string().empty(""),
    };

    //  TODO figure out how admin can update role
    const schema = Joi.object(schemaRules).with("password", "confirmPassword");

    validateRequest(req, next, schema);
};

exports.verifyEmailSchema = (req, res, next) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

exports.refreshTokenSchema = (req, res, next) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

exports.resetPasswordEmailSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });
    validateRequest(req, next, schema);
};

exports.validateResetTokenSchema = (req, res, next) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

exports.resetPasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    validateRequest(req, next, schema);
};

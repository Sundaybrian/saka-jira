import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import validateRequest from "../../_middlewares/validateRequest";

exports.signupSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().min(10).max(15).required(),
        // role: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    validateRequest(req, next, schema);
};

exports.signinSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    validateRequest(req, next, schema);
};

exports.updateSchema = (req: Request, res: Response, next: NextFunction) => {
    const schemaRules = {
        firstName: Joi.string().empty(""),
        lastName: Joi.string().empty(""),
        email: Joi.string().email().empty(""),
        role: Joi.string().min(5).empty(""),
        phoneNumber: Joi.string().min(10).max(15).empty(""),
        password: Joi.string().min(8).empty(""),
        confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
    };

    //  TODO figure out how admin can update role
    const schema = Joi.object(schemaRules).with("password", "confirmPassword");

    validateRequest(req, next, schema);
};

exports.verifyEmailSchema = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        token: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

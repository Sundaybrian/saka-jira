const { log } = require("console");

module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
        const message = `Validation error: ${error.details
            .map((x) => x.message)
            .join(", ")}`;

        console.log(message);
        next(message);
    } else {
        req.body = value;
        next();
    }
}

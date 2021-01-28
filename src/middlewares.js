function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const error = err.message || err;
    res.status(statusCode);

    if (process.env.NODE_ENV == "development") {
        console.log(error);
    }

    switch (true) {
        case typeof err === "string":
            // custom application error
            const is404 = err.toLowerCase().endsWith("not found");
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({
                message: error,
                stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
            });
        case err.name === "UnauthorizedError":
            // jwt authentication error
            return res.status(401).json({
                message: "Unauthorized",
                stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
            });
        default:
            return res.status(500).json({
                message: error,
                stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
            });
    }
}

module.exports = {
    notFound,
    errorHandler,
};

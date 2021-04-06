const EmailService = require("../services/email.service");

exports.sendWelcomeEmail = async (job, done) => {
    try {
        const { account, origin } = job.attrs.data;
        await EmailService.sendVerificationEmail(account, origin);
        done();
    } catch (error) {
        done(error);
    }
};

exports.sendAlreadyRegisteredEmail = async (job, done) => {
    try {
        const { email, origin } = job.attrs.data;
        await EmailService.sendAlreadyRegisteredEmail(email, origin);
        done();
    } catch (error) {
        done(error);
    }

    exports.sendPasswordResetEmail = async (job, done) => {
        try {
            const { account, origin } = job.attrs.data;
            await EmailService.sendPasswordResetEmail(account, origin);
            done();
        } catch (error) {
            done(error);
        }
    };
};

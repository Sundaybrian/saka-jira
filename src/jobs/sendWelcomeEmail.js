const EmailService = require("../services/email.service");

const SendWelcomeEmail = async (job, done) => {
    try {
        const { account, origin } = job.attrs.data;
        await EmailService.sendVerificationEmail(account, origin);
        done();
    } catch (error) {
        done(error);
    }
};

module.exports = SendWelcomeEmail;

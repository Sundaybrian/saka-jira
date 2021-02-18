const EmailService = require("../services/email.service");

class SendWelcomeEmail {

    async static handler(job, done){
        const { account, origin}= job.attrs.data;
        await EmailService.sendVerificationEmail(account, origin);
        done();
    }
}

module.exports = SendWelcomeEmail
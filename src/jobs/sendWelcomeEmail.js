const EmailService = require("../services/email.service");

class SendWelcomeEmail {

    async static handler(job, done){
        const { email}= job.attrs.data;
        await EmailService.sendVerificationEmail(email);
        done();
    }
}

module.exports = SendWelcomeEmail
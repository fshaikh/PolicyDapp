module.exports = (function(){
    const sgMail = require('@sendgrid/mail');
    const config = require('../infrastructure/config');

    async function sendEmail(emailRequest){
        sgMail.setApiKey(config.apiKey);
        const msg = {
          to: emailRequest.toEmail,
          from: config.from,
          subject: emailRequest.subject,
          text: emailRequest.body,
         
        };
        var response = await sgMail.send(msg);
        return response;
    }

    return {
        sendEmail : sendEmail
    };
})();
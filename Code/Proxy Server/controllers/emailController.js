

// Email Controller. 

module.exports = (function () {
    const controllerHelper = require('./controllerHelper');
    const emailService = require('../services/emailService.js');
    
    var _init = function (app, options) {
        // add controller initialisation here
        _defineRoutes(options.router);
    }

    /**
     * Defines routes for the form controller
     * @param router - Express Router object
     */
    var _defineRoutes = function (router) {
        // POST /api/email/send
        router.route('/email/send').post(sendEmail);

        
    }

    
    /**
     * Action method for sending email
     * @param req - Request object
     * @param res - Response object
     */
    // POST /api/email/send
    async function sendEmail(req, res) {
        // Read the form json sent in the body of the POST request
        let emailRequest = req.body;
        console.log(emailRequest);
        var response = await emailService.sendEmail(emailRequest);

        
        controllerHelper.handleResponse(res, response, controllerHelper.getCreateResponse);
    }

   
    

    

    


    return {
        init : _init,
        sendEmail : sendEmail
    };
})();
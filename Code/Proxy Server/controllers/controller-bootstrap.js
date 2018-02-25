// All controllers are initialised here.
module.exports = (function () {
    
    // add require for each controllers here
    var emailController = require('./emailController.js');

    /**
     * 
     * @param app
     * @param options
     */
    var _bootstrapControllers = function (app, options) {
        _setupBaseRoute(app,options);
        
        emailController.init(app, options);
    };


    function _setupBaseRoute(app,options){
        // define the base route for all apis
        app.use('/api', options.router);
    }

    return {
        bootstrapControllers: _bootstrapControllers
    };
})();

// add require for each controllers here

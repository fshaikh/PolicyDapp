// Express bootstrapping goes here

module.exports = (function () {
    var express = require('express');
    // body-parser for json parsing used in POST/PUT. It extracts the body of an incoming HTTP request, parses based on one of the 4 strategies:
    // JSON,urlencoded,raw, text
    var bodyParser = require('body-parser');


    // require bootstrapper
    var bootstrapper = require('../controllers/controller-bootstrap.js');

    // CORS middleware
    var cors = require('../middleware/cors.js');


   

    var _jsonParser;
    // express router object. This object is used for configuring api routes
    var _router = express.Router();

    // express applicaton object
    var _app;

    _init();

    async function _init() {
        // Create the express app
        _app = express();

        

        // setup the middleware
        _setupRequestMiddleware();

        

        // bootstrap controllers
        bootstrapper.bootstrapControllers(_app, _getOptions());

        
    }

   

    function _setupRequestMiddleware() {
        _setupBodyParsers();

        // Setup CORS
        _router.use(cors.setupCors);
    }

    function _setupBodyParsers() {
        // Enable urlencoded to parse query string 
        _app.use(bodyParser.urlencoded({ extended: true }));
        // Enable JSON parsing. This allows the json posted in body of the request to be available in controllers
        _jsonParser = bodyParser.json();
        _app.use(_jsonParser);
    }

    
    function _getOptions() {
        return {
            router: _router,
            jsonParser: _jsonParser
        };
    }

    return {
        app: _app
    };
})();
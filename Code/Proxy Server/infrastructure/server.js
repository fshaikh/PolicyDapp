var http = require('http');
var appBootstrap = require('./app-bootstrap.js');
var config = require('./config.js');


// Start the server
startServer();

function startServer() {

    console.log(`Node Processs : ${process.pid} launched`);
    // Create server
    var server = http.createServer(appBootstrap.app);

    _registerHandlers(server);
    
    // start listening
    server.listen(config.env.port,function(){
        console.log(`Server listening on : ${config.env.port}`);
    });

    
}

/**
 * Register global handlers
 * @param server - Http Server object
 */
function _registerHandlers(server) {
    // register for error events from http.Server and https.Server
    server.on("error", _handleHttpError);

    // Register catchall uncaught exception at process level
    process.on('uncaughtException', _handleUncaughtException);

    // Create custom stack trace formatter
    Error.prepareStackTrace = function(error,stackTrace){
        return JSON.stringify({
            message : error.message,
            stackTrace: stackTrace.map(frame => ({
                file: frame.getFileName(),
                column: frame.getColumnNumber(),
                line: frame.getLineNumber(),
                functionName: frame.getFunctionName()
            }))
        })
    };
       
}

/**
 * Event handler for error event from http
 * @param err - Object containing error information
 */
function _handleHttpError(err) {
    console.log(`Error in http connection: ${err}`);
}

/**
 * Event handler for uncaught exception
 * @param err - Object containing error information
 */
function _handleUncaughtException(error) {
    console.log(`Uncaught Exception: ${error}`);
    console.log(error.stack.replace(error.message, ''))
}
module.exports = (function () {
    var config = {};

    // environment related configuration
    config.env = {};
    //Cloud hosts(AWS, Azure,etc) use the PORT variable to tell you on which port your server should listen for the routing to work properly.
    // determine the port to listen on by checking PORT first and giving it a default value otherwise
    config.env.port = process.env.PORT || 4000;

    config.apiKey = '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';
    config.from = 'furqan_shaikh_1999@hotmail.com'

    return config;
})();



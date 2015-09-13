var convict = require('convict');

var config = convict({
    json: {
        url: {
            doc:     'The JSON file url.',
            default: 'foo',
            format:  String,
            env:    'JSON_FILE_URL'
        }
    }
});

module.exports = config;
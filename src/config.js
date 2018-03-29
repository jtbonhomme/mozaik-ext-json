var convict = require('convict');

var config = convict({
    json: {
        path: {
            doc:     'The JSON resource path in fs.',
            default: '',
            format:  String,
            env:     'JSON_PATH'
        },

        url: {
            doc:     'The JSON resource url.',
            default: '',
            format:  String,
            env:     'JSON_RES_URL'
        },
        headers : {
            doc:     'Some headers',
            default: {},
            format:  Object,
            env:     'JSON_REQ_HEADERS'
        }
    }
});

module.exports = config;

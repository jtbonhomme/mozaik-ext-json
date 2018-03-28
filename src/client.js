const _ = require('lodash');
const config = require('./config');
const chalk = require('chalk');

const request = require('superagent');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest() {
        const url     = config.get('json.url');
        const headers = config.get('json.headers');

        mozaik.logger.info(chalk.yellow(`[json] calling ${ url }`));

        return request.get(url).set(headers || {}).promise();
    }

    const apiCalls = {
        data(params) {
            return buildApiRequest()
                .then(res => JSON.parse(res.text))
            ;
        }
    };
    return apiCalls;
};

module.exports = client;

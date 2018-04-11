const _ = require('lodash');
const chalk = require('chalk');
const Promise = require('bluebird');

const readFileAsync = Promise.promisify(require('fs').readFile);

const request = require('superagent');
require('superagent-bluebird-promise');

const cacheManager = require('cache-manager');
const cache = cacheManager.caching({
    store: 'memory',
    ttl: 10 * 60, // seconds, 10 min
});

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => ({
    data(params) {
        const {cacheOptions, path:pathToFile, dataPath, url} = params;

        const cacheKey = `mozaik-ext-json::${pathToFile || url}`;

        return cache.wrap(cacheKey, function() {
            mozaik.logger.info(chalk.yellow(`[json] fetching ${pathToFile || url}`));

            return pathToFile
                ? getFSData(params)
                : getAPIData(params);
            ;
        }, cacheOptions || {}).then(jsonData => {
            return {
                value: _.get(jsonData, dataPath)
            }
        });
    }
});

module.exports = client;

function getFSData(params) {
    const {path:pathToFile} = params;
    return getJSONFromFile(pathToFile);
}

function getAPIData(params) {
    const {url, headers={}} = params;

    return request
        .get(url)
        .set(headers || {}).promise()
        .then(res => _.get(res, 'body'))
}

function getJSONFromFile(pathToFile) {
    return readFileAsync(pathToFile)
        .then(data => safeJSONParse(data));
}

function safeJSONParse(data){
    return _.attempt(JSON.parse.bind(null, data));
}


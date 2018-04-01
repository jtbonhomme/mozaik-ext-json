const _ = require('lodash');
const chalk = require('chalk');
const Promise = require('bluebird');

const readFileAsync = Promise.promisify(require('fs').readFile);

const request = require('superagent');
require('superagent-bluebird-promise');

const cacheManager = require('cache-manager');
const cacheStore = require('cache-manager-fs');
const cacheOptions = {
    maxsize: 1000 * 1000, // bytes, 1 mb
    path: 'tmp/cache',
    preventfill: false,
    ttl: 60 * 60, // seconds, 1 hr
};
const cache = cacheManager.caching({store: cacheStore, options: cacheOptions});

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {
    return {
        data(params) {
            const {path:pathToFile, dataPath, url} = params;

            const cacheKey = `mozaik-ext=json::${pathToFile || url}`;

            // TODO: make TTL configurable
            return cache.wrap(cacheKey, function() {
                mozaik.logger.info(chalk.yellow(`[json] fetching ${pathToFile || url}`));

                return pathToFile
                    ? getFSData(params)
                    : getAPIData(params);
                ;
            }).then(jsonData => {
                return {
                    value: _.get(jsonData, dataPath)
                }
            });
        }
    };
};

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


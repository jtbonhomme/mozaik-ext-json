import request from 'superagent-bluebird-promise';
import config  from './config';
import Promise from 'bluebird';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    const apiCalls = {
        data(params) {
            let url = params.url;
            let req   = request.get(url);

            mozaik.logger.info(chalk.yellow(`[json] calling ${ url }`));

            return req.promise()
                .then(res => res.body)
            ;
        }
    };
    return apiCalls;
};


export { client as default };
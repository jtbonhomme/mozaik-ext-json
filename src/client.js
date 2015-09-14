import request from 'superagent-bluebird-promise';
import config  from './config';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildApiRequest() {
        let url     = config.get('json.url');
        let headers = config.get('json.headers');
        let req     = request.get(url);

        headers.forEach(function(header){
            req.set(header.name, header.value);
        });
        mozaik.logger.info(chalk.yellow(`[json] calling ${ url }`));

        return req.promise();
    }

    const apiCalls = {
        data(params) {
            console.log("[data] params : " + JSON.stringify(params));

            return buildApiRequest()
                .then(res => JSON.parse(res.text))
            ;
        }
    };
    return apiCalls;
};

export { client as default };
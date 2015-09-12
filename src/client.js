import request from 'superagent';
import config  from './config';
import Promise from 'bluebird';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest() {
        let url = config.get('json.url');

        mozaik.logger.info(chalk.yellow(`[json] fetching from ${ url }`));

        return request.get(url)
          .promise();
    }

    return {
        data() {
            return buildRequest()
              .then(res => res.body);
        }
    };
};


export { client as default };
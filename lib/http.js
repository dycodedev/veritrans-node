'use strict';

const request = require('superagent');
const validUrl = require('valid-url');
const _ = require('lodash');
const querystring = require('querystring');

const utils = require('../lib/utils');


// parameter `authorization` should be in username:password format
function setAuthorization(authorization) {
    if (!/(\w+)\:(\w+)/g.test(authorization)) {
        return false;
    }

    return utils.toBase64(authorization);
}

module.exports = {
    get(url, params, options, callback) {
        if (!validUrl.isWebUri(url)) {
            return callback(new Error('Invalid url'));
        }

        const mergedQuery = _.merge(this.getQueryFromUrl(url), params);
        const stringified = querystring.stringify(mergedQuery);
        const newUrl = (stringified.length < 1) ? url : `${url}?${stringified}`;

        let constructRequest = request.get(newUrl);

        if (utils.hasProperty(options, 'authorization')) {
            const authorization = setAuthorization(options.authorization);

            if (!authorization) {
                return callback(new Error('Invalid authorization format'));
            }

            constructRequest = constructRequest.set('Authorization', `Basic ${setAuthorization(options.authorization)}`);
        }

        return constructRequest.end(callback);
    },

    getQueryFromUrl(url) {
        if (typeof url !== 'string') {
            return false;
        }

        if (!validUrl.isWebUri(url)) {
            return false;
        }

        if (url.indexOf('?') < 0) {
            return {};
        }

        const qs = querystring.parse(url.split('?')[1]);

        return qs;
    },
};

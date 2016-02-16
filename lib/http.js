'use strict';

const request = require('superagent');
const validUrl = require('valid-url');
const _ = require('lodash');
const URL = require('url');
const querystring = require('querystring');

const utils = require('../lib/utils');


// parameter `authorization` should be in username:password format
function setAuthorization(authorization) {
    if (!/(\w+)\:+(\w*)/g.test(authorization)) {
        return false;
    }

    return utils.toBase64(authorization);
}

function getQueryFromUrl(url) {
    if (typeof url !== 'string') {
        return false;
    }

    if (!validUrl.isWebUri(url)) {
        return false;
    }

    const parsed = URL.parse(url);

    return querystring.parse(parsed.query);
};

module.exports = {
    getQueryFromUrl,

    get(url, params, options, callback) {
        if (!validUrl.isWebUri(url)) {
            return callback(new Error('Invalid url'));
        }

        const mergedQuery = _.merge(getQueryFromUrl(url), params);
        const stringified = querystring.stringify(mergedQuery);
        const newUrl = (stringified.length < 1) ? url : `${url}?${stringified}`;

        let constructRequest = request.get(newUrl);

        if (utils.hasProperty(options, 'authorization')) {
            const authorization = setAuthorization(options.authorization);

            if (!authorization) {
                return callback(new Error('Invalid authorization format'));
            }

            constructRequest = constructRequest.set('Authorization', `Basic ${authorization}`);
        }

        constructRequest = constructRequest.set('Accept', 'application/json');

        return constructRequest.end(callback);
    },

    post(url, body, options, callback) {
        if (!validUrl.isWebUri(url)) {
            return callback(new Error('Invalid url'));
        }

        let constructRequest = request.post(url);

        if (utils.hasProperty(options, 'authorization')) {
            const authorization = setAuthorization(options.authorization);

            if (!authorization) {
                return callback(new Error('Invalid authorization format'));
            }

            constructRequest = constructRequest.set('Authorization', `Basic ${authorization}`);
        }

        return constructRequest
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(body)
            .end(callback);
    },
};

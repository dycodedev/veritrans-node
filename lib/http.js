'use strict';

const request = require('superagent');
const validUrl = require('valid-url');
const querystring = require('querystring');
const utils = require('../lib/utils');

module.exports = {
    get(url, params, options, callback) {
        if (!validUrl.isWebUri(url)) {
            return callback(new Error('Invalid url'));
        }

        let constructRequest = request.get(url);

        if (utils.hasProperty(options, 'authorization')) {
            constructRequest = constructRequest.set('Authorization', `Basic ${options.authorization}`);
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

'use strict';

const request = require('superagent');
const utils = require('../lib/utils');

module.exports = {
    get(url, params, options, callback) {
        let constructRequest = request.get(url);

        if (utils.hasProperty(options, 'authorization')) {
            constructRequest = constructRequest.set('Authorization', `Basic ${options.authorization}`);
        }

        return constructRequest.end(callback);
    },
};

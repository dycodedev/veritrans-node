'use strict';

const URL = require('url');

const utils = require('../utils');
const http = require('../http');
const validate = require('./validate_transaction');

module.exports = function (Veritrans) {

    function makeApiCall(method, url, params, callback) {
        const parsedUrl = URL.parse(url).href;
        const availableMethods = ['get', 'post'];
        const options = {
            authorization: Veritrans.credentials.serverKey + ':',
        };

        let callee;

        if (availableMethods.indexOf(method.toLowerCase()) < 0) {
            return callback(new Error('Invalid method'));
        }

        if (method.toLowerCase() === 'get') {
            callee = http.get;
        } else if (method.toLowerCase() === 'post') {
            callee = http.post;
        }

        return callee(parsedUrl, params, options, (err, response) => {
            if (err) {
                return callback(err);
            }

            const body = response.body;

            if (parseInt(body.status_code) >= 400) {
                const error = new Error(body.status_message);
                error.code = body.status_code;

                return callback(error);
            }

            return callback(null, body);
        });

    }

    const transactions = {
        status(id, callback) {
            return makeApiCall('GET', `${Veritrans.baseUrl}/${id}/status`, {}, (err, result) => {
                if (err) return callback(err);

                return callback(null, result);
            });
        },

        charge(payload, callback) {
            validate.validatePayload(payload, err => {
                if (err) {
                    return callback(err);
                }

                return makeApiCall('POST', `${Veritrans.baseUrl}/charge`, payload, callback);
            });
        },

        approve(id, callback) {
            return makeApiCall('POST', `${Veritrans.baseUrl}/${id}/approve`, {}, callback);
        },

        capture(payload, callback) {
            if (!utils.hasProperty(payload, 'transaction_id')) {
                return callback(new Error('This method requires transaction_id!'));
            }

            return makeApiCall('POST', `${Veritrans.baseUrl}/capture`, payload, callback);
        },

        cancel(id, callback) {
            return makeApiCall('POST', `${Veritrans.baseUrl}/${id}/cancel`, {}, callback);
        },

        expire(id, callback) {
            return makeApiCall('POST', `${Veritrans.baseUrl}/${id}/expire`, {}, callback);
        },
    };

    return transactions;
};

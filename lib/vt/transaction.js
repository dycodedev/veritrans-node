'use strict';

const URL = require('url');

const utils = require('../utils');
const http = require('../http');
const validate = require('./validate_transaction');

module.exports = function(Veritrans) {
    const options = {
        authorization: Veritrans.credentials.serverKey + ':',
    };

    const transactions = {
        status(id, callback) {
            const parsedUrl = URL.parse(`${Veritrans.baseUrl}/${id}/status`).href;

            http.get(parsedUrl, {}, options, (err, response) => {
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
        },

        charge(payload, callback) {
            validate.validatePayload(payload, err => {
                if (err) {
                    return callback(err);
                }

                http.post(`${Veritrans.baseUrl}/charge`, payload, options, (err, response) => {
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
            });
        },

        approve(id, callback) {
            const parsedUrl = URL.parse(`${Veritrans.baseUrl}/${id}/approve`).href;

            http.post(parsedUrl, {}, options, (err, response) => {
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
        },

        capture(payload, callback) {
            if (!utils.hasProperty(payload, 'transaction_id')) {
                return callback(new Error('This method requires transaction_id!'));
            }

            const parsedUrl = URL.parse(`${Veritrans.baseUrl}/capture`).href;

            http.post(parsedUrl, payload, options, (err, response) => {
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
        },

        cancel(id, callback) {
            const parsedUrl = URL.parse(`${Veritrans.baseUrl}/${id}/cancel`).href;

            http.post(parsedUrl, {}, options, (err, response) => {
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
        },

        expire(id, callback) {
            const parsedUrl = URL.parse(`${Veritrans.baseUrl}/${id}/expire`).href;

            http.post(parsedUrl, {}, options, (err, response) => {
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
    };

    return transactions;
};

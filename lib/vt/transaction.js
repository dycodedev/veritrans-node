'use strict';

const URL = require('url');

const utils = require('../utils');
const http = require('../http');

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
                    error.statusCode = body.status_code;

                    return callback(error);
                }

                return callback(null, body);
            });
        },
    };

    return transactions;
};

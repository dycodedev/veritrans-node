'use strict';

const _ = require('lodash');

const utils = require('./lib/utils');
const http = require('./lib/http');

function Veritrans(options) {
    if (!utils.hasProperty(options, ['url', 'merchantId', 'clientKey', 'serverKey'])) {
        throw new Error('options must contains url, serverKey and serverPass property!');
    }

    this.baseURL = options.URL;
    this.credentials = _.pick(options, ['serverKey', 'serverPass']);
}

Veritrans.prototype.credentials = {
    setServerPass(serverPass) {
        this.credentials.serverPass = serverPass;
    },

    getServerPass() {
        return this.credentials.serverPass;
    },

    setServerKey
};

Veritrans.prototype.transaction = {

    status(orderId, callback) {
        http.get(`${this.baseURL}/${orderId}/status`, {}, this.prototype.credentials, (err, response) => {
            if (err) {
                return callback(err);
            }

            const body = response.body;

            if (body.status_code >= 400) {
                const error = new Error(body.status_message);
                error.statusCode = body.status_code;

                return callback(error);
            }

            return callback(null, body);
        });
    },
};

module.exports = Veritrans;

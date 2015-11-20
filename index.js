'use strict';

const _ = require('lodash');

function Veritrans(options) {
    if (!utils.hasProperty(options, ['url', 'merchantId', 'clientKey', 'serverKey'])) {
        throw new Error('options must contains url, serverKey and serverKey property!');
    }

    this.baseURL = options.URL;
    this.credentials = _.pick(options, ['serverKey', 'clientKey', 'merchantId']);
}

Veritrans.prototype.credential = {
    setServerKey(serverKey) {
        this.credentials.serverKey = serverKey;
    },

    getServerKey() {
        return this.credentials.serverKey;
    },

    setClientKey(clientKey) {
        this.credentials.clientKey = serverKey;
    },

    getClientKey() {
        return this.credentials.clientKey;
    },

    setMerchantId(id) {
        this.credentials.merchantId = id;
    },

    getMerchantId() {
        return this.credentials.merchantId;
    }
};

Veritrans.prototype.transaction = {
};

module.exports = Veritrans;

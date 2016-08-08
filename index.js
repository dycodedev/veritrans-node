'use strict';

const utils = require('./lib/utils');

function Veritrans(options) {
    if (!utils.hasProperty(options, ['url', 'clientKey', 'serverKey'])) {
        throw new Error('options must contains url, serverKey and serverKey property!');
    }

    this.baseUrl = options.url;
    this.credentials = {
        serverKey: options.serverKey,
        clientKey: options.clientKey,
    };
    this.transaction = require('./lib/vt/transaction')(this);
}

module.exports = Veritrans;

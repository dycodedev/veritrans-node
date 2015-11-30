'use strict';

const _ = require('lodash');
const utils = require('./lib/utils');

function Veritrans(options) {
    if (!utils.hasProperty(options, ['url', 'clientKey', 'serverKey'])) {
        throw new Error('options must contains url, serverKey and serverKey property!');
    }

    this.baseUrl = options.url;
    this.credentials = _.pick(options, ['serverKey', 'clientKey']);
    this.transaction = require('./lib/vt/transaction')(this);
    this.creditcard = require('./lib/vt/creditcard')(this);
}

module.exports = Veritrans;

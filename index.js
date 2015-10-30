'use strict';

const utils = require('./lib/utils');

function Veritrans(options) {
    if (!utils.hasProperty(options, ['url', 'serverKey', 'serverPass'])) {
        throw new Error('options must contains url, serverKey and serverPass property!');
    }

    this.options = options;
}

module.exports = Veritrans;

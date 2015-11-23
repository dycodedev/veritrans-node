'use strict';

// NOTE: specify your own config file...
// It must contains merchantId, clientKey, serverKey, and url.
const expect = require('chai').expect;
const Veritrans = require('../');
const utils = require('../lib/utils');
const config = require('../config.json');

const vt = new Veritrans(config);

// Change the values with your transaction ids,
const validTransactIds = [
    'Sample Order-1',
]

describe('lib/vt/transaction.js', function() {
    this.timeout(30000);

    describe('status(id, callback)', () => {
        it('Should carry error if using invalid order id', done => {
            vt.transaction.status('notavalidId', (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;
                return done();
            });
        });

        it('Should carry results if using valid id', done => {
            vt.transaction.status(validTransactIds[0], (err, body) => {
                expect(err).to.be.nulll
                expect(body).not.to.be.empty;

                return done();
            });
        });
    });
});
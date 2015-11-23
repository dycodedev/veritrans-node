'use strict';

// NOTE: specify your own config file...
// It must contains merchantId, clientKey, serverKey, and url.
const expect = require('chai').expect;
const Veritrans = require('../');
const utils = require('../lib/utils');
const config = require('../config.json');

const vt = new Veritrans(config);

describe('lib/creditcard.js', function() {
    this.timeout(30000);

    describe('token(payload, callback)', done => {
        it('Should carry error if some payload fields are missing', done => {
            const payload = {
                'card_number': '4011 1111 1111 1112',
                'card_cvv': '123',
                'expiry_month': '01'
            };


            vt.creditcard.token(payload, (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;

                return done();
            });
        });

        it('Should carry result if payload is valid', done => {
            const payload = {
                'card_number': '4011 1111 1111 1112',
                'card_cvv': '123',
                'card_exp_month': '01',
                'card_exp_year': '2020',
            };


            vt.creditcard.token(payload, (err, body) => {
                expect(err).to.be.null;
                expect(body).not.to.be.empty;

                return done();
            });
        });
    });
});
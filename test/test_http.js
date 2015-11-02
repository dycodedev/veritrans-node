'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const libHttp = require('../lib/http');
const utils = require('../lib/utils');

describe('lib/http.js', () => {
    const fakeBase = 'http://127.0.0.1:8000';
    let fakeServer;

    beforeEach(done => {
        fakeServer = nock(fakeBase);

        return done();
    });

    describe('get(url, params, options, callback)', (done) => {
        it('Should get 200 for valid endpoint', () => {
            fakeServer
                .get('/test')
                .reply(200, []);

            libHttp.get(`${fakeBase}/test`, {}, {}, (err, response) => {
                expect(err).to.be.null;
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');

                return done();
            });
        });

        it('Should get 400 for invalid endpoint', (done) => {
            fakeServer
                .get('/notfound')
                .reply(404, '');

            libHttp.get(`${fakeBase}/notfound`, {}, {}, (err, response) => {
                expect(err).not.to.be.null;
                expect(response.status).to.equal(404);
                expect(response.body).to.be.empty;

                return done();
            });
        });

        it('Should accept both buffer and string token for auth', (done) => {

        });

        it('Should send proper authorization value type (base64)', (done) => {

        });
    });

    after(done => {
        nock.restore();
        return done();
    });
});

'use strict';

const async = require('async');
const expect = require('chai').expect;
const nock = require('nock');
const libHttp = require('../lib/http');
const utils = require('../lib/utils');

const base64RegEx = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

describe('lib/http.js', () => {
    const fakeBase = 'http://127.0.0.1:8000';
    let fakeServer;

    // Built in URL object ships with Node.js v5.0.0 :|
    describe('getQueryFromUrl(url)', () => {
        it('Should accepts only string', () => {
            expect(libHttp.getQueryFromUrl({})).to.equal(false);
            expect(libHttp.getQueryFromUrl([])).to.equal(false);
            expect(libHttp.getQueryFromUrl(1)).to.equal(false);
            expect(libHttp.getQueryFromUrl('http://google.com')).to.not.equal(false);
        });

        it('Should return empty object if url has no query string', () => {
            expect(libHttp.getQueryFromUrl('http://google.com')).not.to.be.undefined;
            expect(libHttp.getQueryFromUrl('http://google.com')).to.be.empty;
            expect(libHttp.getQueryFromUrl('http://test.com?name=winter')).not.to.be.empty;
            expect(libHttp.getQueryFromUrl('http://test.com?name=winter')).to.be.an('object');
        });

        it('Should return correct object according to querystring', () => {
            const query = libHttp.getQueryFromUrl('http://test.com?name=winter&occupation=backend');

            expect(utils.hasProperty(query, ['name', 'occupation'])).to.equal(true);
            expect(query.name).to.equal('winter');
            expect(query.occupation).to.equal('backend');
        });
    });

    describe('get(url, params, options, callback)', (done) => {
        beforeEach(done => {
            fakeServer = nock(fakeBase);

            return done();
        });

        it('Should throw error if receive invalid web url', (done) => {

            const invalidWebUris = [
                'mqtt://mqtt.org',
                'ssh://ssh:22',
                'some://invalidUrl.me',
            ];

            async.each(invalidWebUris, (uri, callback) => {
                libHttp.get(uri, {}, {}, (err, response) => {
                    expect(err).not.to.be.null;
                    return callback();
                });
            }, () => done());

        });

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

        it('Should throw error if authorization data is not in `username:password` format', (done) => {
            fakeServer
                .get('/')
                .reply(200, '');

            const auth = [
                'myUsername&myPassword',
                'myUsername=alwin&myPassword=alwin',
            ];

            async.each(auth, (authorization, cb) => {
                libHttp.get('`${fakeBase}/', {}, { authorization }, (err, response) => {
                    expect(err).not.to.be.null;
                    return cb();
                });
            }, () => done());
        });

        it('Should send proper authorization value type (base64)', (done) => {
            return done();
        });

        it('Should merge parameters to existing querystring in url', (done) => {
            return done();
        });

        after(done => {
            nock.restore();
            return done();
        });
    });
});

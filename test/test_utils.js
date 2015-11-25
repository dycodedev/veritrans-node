'use strict';

const expect = require('chai').expect;
const utils = require('../lib/utils');

describe('lib/utils.js', () => {
    describe('.hasProperty(object, properties)', () => {
        const object = {
            name: 'vt',
            platform: 'node.js',
        };

        it('should return boolean', () => {
            expect(utils.hasProperty({}, 'me')).to.be.a('boolean');
            expect(utils.hasProperty({}, ['me', 'want', 'icecream'])).to.be.a('boolean');
        });

        it('should return false if `properties` parameter is neither a string nor array', () => {
            expect(utils.hasProperty(object, null)).to.equal(false);
        });

        it('should return false if `object` is not an object', () => {
            expect(utils.hasProperty(null, null)).to.equal(false);
            expect(utils.hasProperty(null, 'me')).to.equal(false);
            expect(utils.hasProperty('me', null)).to.equal(false);
            expect(utils.hasProperty('me', 'name')).to.equal(false);
            expect(utils.hasProperty([], null)).to.equal(false);
            expect(utils.hasProperty([], 'name')).to.equal(false);
            expect(utils.hasProperty([0, 1, 2], [0, 1, 2])).to.equal(false);
        });

        it('should return false if `object` does not have a property (string param)', () => {
            expect(utils.hasProperty(object, 'version')).to.equal(false);
        });

        it('should return false if `object` doest not have some properties (array param)', () => {
            expect(utils.hasProperty(object, ['version', 'name'])).to.equal(false);
        });

        it('should return false if `object` has no `version` property even if it has `name` and `platform` property', () => {
            expect(utils.hasProperty(object, ['name', 'version', 'platform'])).to.equal(false);
        });

        it('should return true if `object` has `name` and `platform` property', () => {
            expect(utils.hasProperty(object, ['name', 'platform'])).to.equal(true);
            expect(utils.hasProperty(object, ['name'])).to.equal(true);
            expect(utils.hasProperty(object, ['platform'])).to.equal(true);
            expect(utils.hasProperty(object, 'name')).to.equal(true);
            expect(utils.hasProperty(object, 'platform')).to.equal(true);
        });

        it('should return true if `object` properties is matched with empty array', () => {
            expect(utils.hasProperty(object, [])).to.equal(true);
        });

    });

    describe('.toBase64(source)', () => {
        const base64RegEx = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        it('should return false if it is passed invalid argument type', () => {
            expect(utils.toBase64(1)).to.equal(false);
            expect(utils.toBase64(.5)).to.equal(false);
            expect(utils.toBase64({})).to.equal(false);
            expect(utils.toBase64([])).to.equal(false);

            expect(utils.toBase64(new Buffer('a'))).to.be.a('string');
            expect(utils.toBase64('a')).to.be.a('string');
        });

        it('should return valid base64 string', () => {
            // see: http://stackoverflow.com/questions/475074/regex-to-parse-or-validate-base64-data/475217#475217

            expect(base64RegEx.test(utils.toBase64(new Buffer('a')))).to.equal(true);
            expect(base64RegEx.test(utils.toBase64('a'))).to.equal(true);
        });
    });
});

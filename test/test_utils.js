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

    });
});

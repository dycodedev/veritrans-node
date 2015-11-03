'use strict';

module.exports = {
    hasProperty(object, properties) {
        if (!object || !properties) {
            return false;
        }

        if (object.constructor !== Object) {
            return false;
        }

        if (properties.constructor && properties.constructor === Array) {
            try {
                properties.forEach(property => {
                    if (!object.hasOwnProperty(property)) {
                        throw new Error(`Object does not have ${property} property`);
                    }
                });

                return true;
            }catch (error) {
                return false;
            }
        }

        return object.hasOwnProperty(properties);
    },

    toBase64(source) {
        if (typeof source !== 'string' && (source.constructor && source.constructor !== Buffer)) {
            return false;
        }

        if (typeof source === 'string') {
            return new Buffer(source).toString('base64');
        }

        return source.toString('base64');
    },
};


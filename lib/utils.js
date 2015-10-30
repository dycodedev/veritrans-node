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
};


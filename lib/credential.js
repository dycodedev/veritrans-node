'use strict';

module.exports = function(Veritrans) {
    return {
        setServerKey(serverKey) {
            Veritrans.credentials.serverKey = serverKey;
        },

        getServerKey() {
            return Veritrans.credentials.serverKey;
        },

        setClientKey(clientKey) {
            Veritrans.credentials.clientKey = clientKey;
        },

        getClientKey() {
            return Veritrans.credentials.clientKey;
        },

        setMerchantId(id) {
            Veritrans.credentials.merchantId = id;
        },

        getMerchantId() {
            return Veritrans.credentials.merchantId;
        }
    };
};
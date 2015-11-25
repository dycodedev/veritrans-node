'use strict';

const utils = require('../utils');

const validators = module.exports = {
    validatePayload(payload, callback) {
        const requiredFields = [
            'payment_type',
            'transaction_details',
        ];
        let requiredByMethod = [];

        if (!utils.hasProperty(payload, requiredFields)) {
            return callback(new Error('Required fields: ' + requiredFields + ' are missing'));
        }

        const requiredItemDetailsProps = [
            'id',
            'price',
            'quantity',
            'name'
        ];

        if (utils.hasProperty(payload, 'item_details')) {
            if (!utils.hasProperty(payload.item_details, requiredItemDetailsProps)) {
                return callback(new Error('item_details field requires: ' + requiredItemDetailsProps + ' fields'));
            }
        }

        const requiredTransactionDetails = [
            'order_id',
            'gross_amount',
        ];

        if (!utils.hasProperty(payload.transaction_details, requiredTransactionDetails)) {
            return callback(new Error('transaction_details requires: ' + requiredTransactionDetails + ' fields'));
        }

        if (payload.payment_type === 'credit_card') {
            requiredByMethod = ['token_id', 'bank'];

            return this.validateTransactionPayload(payload, requiredByMethod, callback);
        }

        if (payload.payment_type === 'bank_transfer') {
            requiredByMethod = ['bank'];

            return this.validateTransactionPayload(payload, requiredByMethod, callback);
        }

        return callback(new Error('Not supported payment type'));
    },

    validateTransactionPayload(payload, requiredFields, callback) {
        const type = payload.payment_type;

        if (!utils.hasProperty(payload, type)) {
            return callback(new Error(`Not a valid ${type} transaction payload`));
        }

        if (!utils.hasProperty(payload[type], requiredFields)) {
            return callback(new Error(`${type} transaction requires ${requiredFields.toString()} fields`));
        }

        return callback(null);
    },

    validateForToken(payload, callback) {
        const required = [
            'card_number',
            'card_cvv',
            'card_exp_month',
            'card_exp_year'
        ];

        if (!utils.hasProperty(payload, required)) {
            return callback(new Error('Required parameters are missing'));
        }

        return callback(null);
    },
}
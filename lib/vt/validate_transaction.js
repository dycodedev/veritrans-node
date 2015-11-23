'use strict';

const utils = require('../utils');

module.exports = {
    validatePayload(payload, callback) {
        const requiredFields = [
            'payment_type',
            'transaction_details',
        ];

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
            return this.validateCreditCard(payload, callback);
        }

        return callback(new Error('Not supported payment type'));
    },

    validateCreditCard(payload, callback) {
        if (!utils.hasProperty(payload, 'credit_card')) {
            return callback(new Error('Not a valid credit card payload'));
        }

        const requiredFields = [
            'token_id',
            'bank',
        ];

        if (!utils.hasProperty(payload.credit_card, requiredFields)) {
            return callback(new Error('Credit card payment requires: ' + requiredFields + ' fields'));
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
    }
}
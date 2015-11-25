'use strict';

const utils = require('../utils');

const validPaymentTypes = [
    'vtweb',
    'credit_card',
    'bank_transfer',
    'echannel',
    'mandiri_clickpay',
    'cimb_clicks',
    'bri_epay',
    'bca_klikpay',
    'telkomsel_cash',
    'xl_tunai',
    'bbm_money',
    'indosat_dompetku',
    'mandiri_ecash',
    'cstore'
];

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

        if (validPaymentTypes.indexOf(payload.payment_type) < 0) {
            return callback(new Error('Not a valid payment type, check veritrans website for valid payment types list'));
        }

        const requiredTransactionDetails = ['order_id', 'gross_amount'];

        if (!utils.hasProperty(payload.transaction_details, requiredTransactionDetails)) {
            return callback(new Error('transaction_details requires: ' + requiredTransactionDetails + ' fields'));
        }

        else if (payload.payment_type === 'credit_card') {
            requiredByMethod = ['token_id', 'bank'];
        }

        else if (payload.payment_type === 'bank_transfer') {
            requiredByMethod = ['bank'];
        }

        else if (payload.payment_type === 'echannel') {
            requiredByMethod = ['bill_info1', 'bill_info2'];

            if (!utils.hasProperty(payload, 'item_details')) {
                return callback(new Error('Mandiri e-channel requires item_details field to be included'));
            }

        }

        else if (payload.payment_type === 'mandiri_clickpay') {
            requiredByMethod = [
                'card_number',
                'input1',
                'input2',
                'input3',
                'token',
            ];
        }

        else if (payload.payment_type === 'cimb_clicks') {
            requiredByMethod = ['description'];
        }

        else if (payload.payment_type === 'bca_klikpay') {
            requiredByMethod = ['type', 'description'];
        }

        else if (payload.payment_type === 'telkomsel_cash') {
            requiredByMethod = ['customer', 'promo', 'is_reversal'];
        }

        else if (payload.payment_type === 'indosat_dompetku') {
            requiredByMethod = ['msisdn'];
        }

        else if (payload.payment_type === 'mandiri_ecash') {
            requiredByMethod = ['description'];
        }

        else if (payload.payment_type === 'vtweb') {
            requiredByMethod = ['credit_card_3d_secure'];
        }

        return this.validateTransactionPayload(payload, requiredByMethod, callback);
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
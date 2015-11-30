veritrans-node
==============

Veritrans integration module for Node.js platform.

__Note:__ This module is written in ES6 standards, so in order to make it works you have to run your app using Node.js v4.x.x or use `--harmony` flag to enable ES6 features. Also you can use [babel](https://babeljs.io/) to transpile ES6 codes to ES5 codes if you are working with old version of Node.js.

### Veritrans API Documentation

This module follows Veritrans official API documentation. Please see [this](http://docs.veritrans.co.id/en/api/methods.html) for API reference.

### Install

```
npm install veritrans
```

### Usage

Examples bellow are using express. Description for transaction / payment payloads can be found on [Veritrans official API documentation](http://docs.veritrans.co.id/en/api/methods.html).

`require('veritrans');` returns `Veritrans` constructor function that should be instantiated using `new` keyword. It only requires one argument that define its configuration.

__Config__:
* serverKey (*String*) - Used to pass basic auth that is required by Veritrans API.
* clientKey (*String*) - Used to pass basic auth that is required by Veritrans API.
* url (*String*) - Base url for API call. There are two types of url that can be used for sandbox mode and production mode.

The values for those fields can be obtained through [Veritrans MAP](https://my.veritrans.co.id/login).

```js
const config = {
    serverKey: 'Your-Server-Key',
    clientKey: 'Your-Client-Key',
    url: 'https://api.sandbox.veritrans.co.id/v2'
};

const Veritrans = require('veritrans');
const vt = new Veritrans(config);

```

#### 1. Charge transaction

`vt.transaction.charge(transaction, callback)` - All payment methods that are provided by Veritrans are supported by this module. Example below is using `credit_card` payment type.

__Params__:

* `transaction` (*Object*) - An object representing transaction payload. `payment_type`, `transaction_details` fields + one that is named after `payment_type` value are __required__.
* `callback(err, response)` (*Function*) - Callback function that will be fired once transaction is finished.

```js
route.post('/pay', (req, res, next) => {
    const transaction = {
        payment_type: 'credit_card',
        transaction_details: {
            order_id: 'sample-order-1',
            gross_amount: '1000000',
        },
        credit_card: {
            token_id: 'your-credit-card-token',
            bank: 'bni',
        },
    };


    vt.transaction.charge(transaction, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/pay/error');
        }

        return res.redirect('/pay/success')
    });
});
```

#### 2. Check Transaction / Order Status

`vt.transaction.status(id, callback)` - Check the status of transaction / order that is identified by `id`.

__Params__:

* `id` (*String*) - Identifier of a transaction / order.
*  `callback(err, response)` (*Function*) - Callback function that will be called once the status is checked.

```js
route.post('/status/:id', (req, res, next) => {
    const id = req.params.id;


    vt.transaction.status(id, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/transaction/' + req.params.id);
        }

        return res.redirect('/transaction/' + req.params.id);
    });
});
```

#### 3. Capture Transaction

`vt.transaction.capture(payload, callback)` - Charge a pre-authorized transaction in which `transaction_status` is `authorize`.

__Params__:

* `payload` (*Object*) - Consists of `transaction_id` and `gross_amount` fields. `transaction_id` is required.
* `callback(err, response)` (*Function*) - Callback function that will be called once transaction is captured.

```js
route.get('/capture/:id', (req, res, next) => {
    const payload = {
        transaction_id: req.params.id,
        gross_amount: 100000,
    };


    vt.transaction.capture(payload, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/transaction/' + req.params.id);
        }

        return res.redirect('/transaction/' + req.params.id);
    });
});
```

#### 4. Approve Transaction

`vt.transaction.approve(id, callback)` - Accept card payment transaction in which the `fraud_status` is `challenge`.

__Params__:

* `id` (*String*) - Identifier of a transaction / order.
*  `callback(err, response)` (*Function*) - Callback function that will be called once the transaction is approved.

```js
route.get('/approve/:id', (req, res, next) => {
    const id = req.params.id;


    vt.transaction.approve(id, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/transaction/' + req.params.id);
        }

        return res.redirect('/transaction/' + req.params.id);
    });
});
```

#### 5. Cancel Transaction

`vt.transaction.cancel(id, callback)` - Cancel card payment transaction if the transaction has not been settled yet.

__Params__:

* `id` (*String*) - Identifier of a transaction / order.
*  `callback(err, response)` (*Function*) - Callback function that will be called once the transaction is canceled.

```js
route.get('/cancel/:id', (req, res, next) => {
    const id = req.params.id;


    vt.transaction.cancel(id, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/transaction/' + req.params.id);
        }

        return res.redirect('/transaction/' + req.params.id);
    });
});
```

#### 6. Expire Transaction

`vt.transaction.expire(id, callback)` - Expire a transaction which payment has not yet completed by the customer.

__Params__:

* `id` (*String*) - Identifier of a transaction / order.
*  `callback(err, response)` (*Function*) - Callback function that will be called once the transaction is expired.

```js
route.get('/expire/:id', (req, res, next) => {
    const id = req.params.id;


    vt.transaction.expire(id, (err, result) => {
        if (err) {
            console.error(err);

            return res.redirect('/transaction/' + req.params.id);
        }

        return res.redirect('/transaction/' + req.params.id);
    });
});
```

### License

MIT License
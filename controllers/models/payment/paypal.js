const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const paypal_config = require('../../../js/paypal');

router.post('/checkout', (req, res) => {
    const amount = req.body.amount;

    // Set up payment details
    let payment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/paypal/success',
            cancel_url: 'http://localhost:3000/paypal/cancel'
        },
        transactions: [
            {
                amount: {
                    total: amount,
                    currency: 'USD'
                }
            }
        ]
    };

    paypal.payment.create(payment, (error, payment) => {
        if (error) {
            throw error;
        } else {
            for (let link of payment.links) {
                if (link.rel === 'approval_url') {
                    res.redirect(link.href);
                }
            }
        }
    });
});

module.exports = router;
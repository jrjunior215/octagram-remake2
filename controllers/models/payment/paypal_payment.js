const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
    client_secret: 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-'
});

router.post('/checkout', (req, res) => {
    const price = req.body.price;

    const billingPlanAttributes = {
        name: 'Monthly Subscription Plan',
        description: 'Recurring monthly subscription plan',
        type: 'INFINITE',
        payment_definitions: [
            {
                name: 'Regular Payment',
                type: 'REGULAR',
                frequency_interval: '1',
                frequency: 'MONTH',
                cycles: '0',
                amount: {
                    currency: 'USD',
                    value: price // Monthly subscription amount
                }
            }
        ],
        merchant_preferences: {
            return_url: 'http://localhost:4002/paypal/success',
            cancel_url: 'http://localhost:4002/paypal/cancel',
            auto_bill_amount: 'YES',
            initial_fail_amount_action: 'CONTINUE'
        }
    };

    paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
        if (error) {
            console.error(error);
            throw error;
        } else {
            const planId = billingPlan.id;

            paypal.billingPlan.update(planId, [
                {
                    op: 'replace',
                    path: '/',
                    value: {
                        state: 'ACTIVE'
                    }
                }
            ], (error, updatedBillingPlan) => {
                if (error) {
                    console.error(error);
                    throw error;
                } else {
                    console.log('Plan created and activated successfully');
                    console.log(updatedBillingPlan);

                    res.send('Plan created and activated successfully');
                }
            });
        }
    });
});

router.get('/success', (req, res) => {
    const token = req.query.token;

    paypal.billingAgreement.execute(token, {}, (error, billingAgreement) => {
        if (error) {
            console.error(error);
            throw error;
        } else {
            // Handle successful subscription
            const agreementId = billingAgreement.id;

            // Debugging: Output the agreementId to the console
            console.log('Agreement ID:', agreementId);

            // Add your business logic here to handle the successful subscription

            res.send(`Subscription successful! Agreement ID: ${agreementId}`);
        }
    });
});

router.get('/cancel', (req, res) => {
    res.send('Subscription was canceled.');
});

module.exports = router;
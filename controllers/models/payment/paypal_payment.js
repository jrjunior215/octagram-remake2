const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
    client_secret: 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-'
});

router.post('/checkout', (req, res) => {
    const data = req.body;
    const { price, name, package_name, creator_name } = data;
    console.log('Extracted Price:', price);

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
                    currency: 'THB',
                    value: price
                }
            }
        ],
        merchant_preferences: {
            return_url: 'http://localhost:4002/paypal/success',
            cancel_url: 'http://localhost:4002/paypal/cancel',
            auto_bill_amount: 'YES',
            initial_fail_amount_action: 'CONTINUE'
        },
    };

    paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
        if (error) {
            console.error(error);
            res.send('Error creating billing plan.');
        } else {
            console.log('Billing plan created:', billingPlan);
            const billingPlanId = billingPlan.id;
            paypal.billingPlan.update(billingPlanId, [
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
                    res.send('Error activating billing plan.');
                } else {
                    console.log('Billing plan activated:', updatedBillingPlan);
                    const futureStartDate = new Date();
                    futureStartDate.setDate(futureStartDate.getDate() + 1); 
                    const formattedStartDate = futureStartDate.toISOString();

                    const billingAgreementAttributes = {
                        name: 'Your Billing Agreement',
                        description: 'Description of your billing agreement',
                        start_date: formattedStartDate,
                        plan: {
                            id: billingPlan.id,
                        },
                        payer: {
                            payment_method: 'paypal',
                        },
                    };

                    paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
                        if (error) {
                            console.error(error);
                            console.log(billingAgreementAttributes);
                            res.send('Error creating billing agreement.');
                        } else {
                            console.log('Billing agreement created:', billingAgreement);

                            for (const link of billingAgreement.links) {
                                if (link.rel === 'approval_url') {
                                    res.redirect(link.href);
                                }
                            }
                        }
                    });
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
            const agreementId = billingAgreement.id;
            const startDate = billingAgreement.start_date;
            const nextBillingDate = billingAgreement.agreement_details.next_billing_date;

            console.log('Agreement ID:', agreementId);
            console.log('Start Date:', startDate);
            console.log('Next Billing Date:', nextBillingDate);

            res.send(`
                Subscription successful!
                Agreement ID: ${agreementId}<br>
                Start Date: ${startDate}<br>
                Next Billing Date: ${nextBillingDate}
            `);
        }
    });
});

router.get('/cancel', (req, res) => {
    res.send('Subscription was canceled.');
});

module.exports = router;
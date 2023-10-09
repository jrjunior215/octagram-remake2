const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const moment = require('moment-timezone');
const Member = require('../../../models/Member');
const { SERVER_PORT, SERVER_IP } = require('../../../js/server_setting');
const paypalConfig = require('../../../js/paypal/paypal_config');

paypal.configure(paypalConfig);

router.post('/checkout', (req, res) => {
    const data = req.body;
    const { price, name, package_name, creator_name, id_creator, id_user, id_package } = data;

    const billingPlanAttributes = {
        name: package_name,
        description: `This package name create by ${creator_name} in Octagram`,
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
            return_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/success`,
            cancel_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/cancel`,
            auto_bill_amount: 'YES',
            initial_fail_amount_action: 'CONTINUE'
        },
    };

    paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
        if (error) {
            console.error(error);
            res.send('Error creating billing plan.');
        } else {
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
                    const futureStartDate = new Date();
                    futureStartDate.setSeconds(futureStartDate.getSeconds() + 10);
                    const formattedStartDate = futureStartDate.toISOString();

                    const billingAgreementAttributes = {
                        name: `${package_name}`,
                        description: `User ${name} have purchase package ${package_name} by creator ${creator_name}`,
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
                            console.log('Error details:', error.response.details);
                            console.log(billingAgreementAttributes);
                            res.send('Error creating billing agreement.');
                        } else {
                            req.session.creator_name_pay = creator_name;
                            req.session.id_creator_pay = id_creator;
                            req.session.id_user_pay = id_user;
                            req.session.id_package_pay = id_package

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

router.get('/success', async (req, res) => {
    const token = req.query.token;
    const creator_name = req.session.creator_name_pay;
    const id_creator = req.session.id_creator_pay;
    const id_user = req.session.id_user_pay;
    const id_package = req.session.id_package_pay;

    paypal.billingAgreement.execute(token, {}, async (error, billingAgreement) => {
        if (error) {
            console.error(error);
            throw error;
        } else {
            const agreementId = billingAgreement.id;
            const startDateUtc = moment(billingAgreement.start_date).utc();

            const startDateThai = startDateUtc.tz('Asia/Bangkok');
            const endDateThai = startDateThai.clone().add(1, 'month');

            const formattedStartDate = startDateThai.format('DD/MM/YYYY');
            const formattedEndDate = endDateThai.format('DD/MM/YYYY');

            await Member.create(id_creator,id_package,id_user,agreementId);

            res.locals.layout = 'home/payment/layout';
            res.render('home/payment/success', { agreementId: agreementId, formattedStartDate: formattedStartDate, formattedEndDate: formattedEndDate, creator_name: creator_name });

        }
    });

});

router.get('/cancel', (req, res) => {
    res.send('Subscription was canceled.');
});

module.exports = router;
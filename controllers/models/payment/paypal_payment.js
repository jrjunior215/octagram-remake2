const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const moment = require('moment-timezone');
const Member = require('../../../models/Member');
const { SERVER_PORT, SERVER_IP } = require('../../../js/server_setting');
const paypalConfig = require('../../../js/paypal/paypal_config');

paypal.configure(paypalConfig);

router.post('/checkout', async (req, res) => {
    try {
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

        const billingPlan = await new Promise((resolve, reject) => {
            paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingPlan);
                }
            });
        });

        const billingPlanId = billingPlan.id;

        await new Promise((resolve, reject) => {
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
                    reject(error);
                } else {
                    resolve(updatedBillingPlan);
                }
            });
        });

        const futureStartDate = new Date();
        futureStartDate.setSeconds(futureStartDate.getSeconds() + 10);
        const formattedStartDate = futureStartDate.toISOString();

        const billingAgreementAttributes = {
            name: `${package_name}`,
            description: `User ${name} have purchased package ${package_name} by creator ${creator_name}`,
            start_date: formattedStartDate,
            plan: {
                id: billingPlan.id,
            },
            payer: {
                payment_method: 'paypal',
            },
        };

        const billingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        req.session.creator_name_pay = creator_name;
        req.session.id_creator_pay = id_creator;
        req.session.id_user_pay = id_user;
        req.session.id_package_pay = id_package;

        for (const link of billingAgreement.links) {
            if (link.rel === 'approval_url') {
                res.redirect(link.href);
            }
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});

router.get('/success', async (req, res) => {
    try {
        const token = req.query.token;
        const creator_name = req.session.creator_name_pay;
        const id_creator = req.session.id_creator_pay;
        const id_user = req.session.id_user_pay;
        const id_package = req.session.id_package_pay;

        const billingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.execute(token, {}, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        const agreementId = billingAgreement.id;
        const startDateUtc = moment(billingAgreement.start_date).utc();
        const startDateThai = startDateUtc.tz('Asia/Bangkok');
        const endDateThai = startDateThai.clone().add(1, 'month');
        const formattedStartDate = startDateThai.format('DD/MM/YYYY');
        const formattedEndDate = endDateThai.format('DD/MM/YYYY');

        await Member.create(id_creator, id_package, id_user, agreementId);

        res.locals.layout = 'home/payment/layout';
        res.render('home/payment/success', { agreementId: agreementId, formattedStartDate: formattedStartDate, formattedEndDate: formattedEndDate, creator_name: creator_name });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});

router.get('/cancel', (req, res) => {
    res.send('/home');
});

router.post('/reoder/wores', async (req, res) => {
    try {
        const data = req.body;
        const { id_member, tran_id, price, name, package_name, creator_name, id_creator, id_user, id_package } = data;
        const cancel_note = { "note": "Canceling the agreement" };

        const billingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.get(tran_id, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        const nextBillingDate = billingAgreement.agreement_details.next_billing_date;
        const lastPaymentDate = billingAgreement.agreement_details.last_payment_date;
        const startDate = billingAgreement.start_date;

        const nextBillingDateThaiTime = moment(nextBillingDate).format('YYYY-MM-DD HH:mm:ss');
        const lastPaymentDateThaiTime = moment(lastPaymentDate).format('YYYY-MM-DD HH:mm:ss');
        const startDateThaiTime = moment(startDate).format('YYYY-MM-DD HH:mm:ss');

        await new Promise((resolve, reject) => {
            paypal.billingAgreement.cancel(tran_id, cancel_note, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });

        await Member.delete(id_member);

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
                return_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/reoder/success`,
                cancel_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/reoder/cancel`,
                auto_bill_amount: 'YES',
                initial_fail_amount_action: 'CONTINUE'
            },
        };

        const billingPlan = await new Promise((resolve, reject) => {
            paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingPlan);
                }
            });
        });

        const billingPlanId = billingPlan.id;

        await new Promise((resolve, reject) => {
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
                    reject(error);
                } else {
                    resolve(updatedBillingPlan);
                }
            });
        });

        const futureStartDate = new Date(nextBillingDate);
        const formattedStartDate = futureStartDate.toISOString();

        const billingAgreementAttributes = {
            name: `${package_name}`,
            description: `User ${name} have purchased package ${package_name} by creator ${creator_name}`,
            start_date: formattedStartDate,
            plan: {
                id: billingPlan.id,
            },
            payer: {
                payment_method: 'paypal',
            },
        };

        const newBillingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        req.session.creator_name_pay = creator_name;
        req.session.id_creator_pay = id_creator;
        req.session.id_user_pay = id_user;
        req.session.id_package_pay = id_package;
        req.session.nextBillingDateThaiTime = nextBillingDateThaiTime;
        req.session.lastPaymentDateThaiTime = lastPaymentDateThaiTime;
        req.session.startDateThaiTime = startDateThaiTime;

        for (const link of newBillingAgreement.links) {
            if (link.rel === 'approval_url') {
                res.redirect(link.href);
            }
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});

router.post('/reoder/better', async (req, res) => {
    try {
        const data = req.body;
        const { id_member, tran_id, price, name, package_name, creator_name, id_creator, id_user, id_package, total_price } = data;
        const cancel_note = { "note": "Canceling the agreement" };

        const billingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.get(tran_id, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        const nextBillingDate = billingAgreement.agreement_details.next_billing_date;
        const lastPaymentDate = billingAgreement.agreement_details.last_payment_date;
        const startDate = billingAgreement.start_date;

        const nextBillingDateThaiTime = moment(nextBillingDate).format('YYYY-MM-DD HH:mm:ss');
        const lastPaymentDateThaiTime = moment(lastPaymentDate).format('YYYY-MM-DD HH:mm:ss');
        const startDateThaiTime = moment(startDate).format('YYYY-MM-DD HH:mm:ss');

        await new Promise((resolve, reject) => {
            paypal.billingAgreement.cancel(tran_id, cancel_note, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });

        await Member.delete(id_member);

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
                return_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/reoder/success`,
                cancel_url: `http://${SERVER_IP}:${SERVER_PORT}/paypal/reoder/cancel`,
                auto_bill_amount: 'YES',
                initial_fail_amount_action: 'CONTINUE'
            },
        };

        const billingPlan = await new Promise((resolve, reject) => {
            paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
                if (error) {
                    console.error(error);
                    // ลองแสดงข้อมูล details
                    console.log(error.response.details);
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        const billingPlanId = billingPlan.id;

        await new Promise((resolve, reject) => {
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
                    reject(error);
                } else {
                    resolve(updatedBillingPlan);
                }
            });
        });

        const futureStartDate = new Date(nextBillingDate);
        const formattedStartDate = futureStartDate.toISOString();

        const billingAgreementAttributes = {
            name: `${package_name}`,
            description: `User ${name} have purchased package ${package_name} by creator ${creator_name}`,
            start_date: formattedStartDate,
            plan: {
                id: billingPlan.id,
            },
            payer: {
                payment_method: 'paypal',
            },
            override_merchant_preferences: {
                setup_fee: {
                    currency: 'THB',
                    value: total_price,
                },
            },
        };

        const newBillingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        req.session.creator_name_pay = creator_name;
        req.session.id_creator_pay = id_creator;
        req.session.id_user_pay = id_user;
        req.session.id_package_pay = id_package;
        req.session.nextBillingDateThaiTime = nextBillingDateThaiTime;
        req.session.lastPaymentDateThaiTime = lastPaymentDateThaiTime;
        req.session.startDateThaiTime = startDateThaiTime;

        for (const link of newBillingAgreement.links) {
            if (link.rel === 'approval_url') {
                res.redirect(link.href);
            }
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }

});

router.get('/reoder/success', async (req, res) => {
    try {
        const token = req.query.token;
        const creator_name = req.session.creator_name_pay;
        const id_creator = req.session.id_creator_pay;
        const id_user = req.session.id_user_pay;
        const id_package = req.session.id_package_pay;
        const nextBillingDateThaiTime = req.session.nextBillingDateThaiTime;
        const lastPaymentDateThaiTime = req.session.lastPaymentDateThaiTime;
        const startDateThaiTime = req.session.startDateThaiTime;

        const billingAgreement = await new Promise((resolve, reject) => {
            paypal.billingAgreement.execute(token, {}, (error, billingAgreement) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(billingAgreement);
                }
            });
        });

        const agreementId = billingAgreement.id;

        await Member.reoder(id_creator, id_package, id_user, agreementId, nextBillingDateThaiTime, lastPaymentDateThaiTime, startDateThaiTime);

        res.locals.layout = 'home/payment/layout';
        res.render('home/payment/success', { agreementId: agreementId, formattedStartDate: startDateThaiTime, formattedEndDate: nextBillingDateThaiTime, creator_name: creator_name });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
});

router.get('/reoder/cancel', (req, res) => {
    res.send('Subscription was canceled.');
});

module.exports = router;

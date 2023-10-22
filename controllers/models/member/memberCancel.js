const paypal = require('paypal-rest-sdk');
const Member = require('../../../models/Member');
const paypalConfig = require('../../../js/paypal/paypal_config');

paypal.configure(paypalConfig);

module.exports = async (req, res) => {
    try {
        const id_member = req.query.id_member;
        const id_tran = req.query.trans;
        const cancel_note = {
            "note": "Canceling the agreement"
        };

        paypal.billingAgreement.cancel(id_tran, cancel_note, async function (error, response) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("Cancel Billing Agreement Response");
                console.log(response);

                const billingAgreement = await getBillingAgreement(id_tran);
                await Member.cancel(id_member);
                await res.redirect('/subscribe');
            }
        });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
}

async function getBillingAgreement(id_tran) {
    return new Promise((resolve, reject) => {
        paypal.billingAgreement.get(id_tran, (error, billingAgreement) => {
            if (error) {
                reject(error);
            } else {
                resolve(billingAgreement);
            }
        });
    });
}

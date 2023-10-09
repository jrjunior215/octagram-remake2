const paypal = require('paypal-rest-sdk');
const Member = require('../../../models/Member');
const paypalConfig = require('../../../js/paypal/paypal_config');

paypal.configure(paypalConfig);

module.exports = async (req, res) => {

  const id_member = req.query.id_member;
  const id_tran = req.query.trans;
  const cancel_note = {
    "note": "Canceling the agreement"
  };

  paypal.billingAgreement.cancel(id_tran, cancel_note, function (error, response) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Cancel Billing Agreement Response");
      console.log(response);

      paypal.billingAgreement.get(id_tran, async function (error, billingAgreement) {
        if (error) {
          throw error;
        } else {
          await Member.cancel(id_member);
          await res.redirect('/subscribe');
        }
      });
    }
  });

}

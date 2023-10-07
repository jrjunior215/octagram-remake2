const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
  client_secret: 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-',
});

async function processPaypalStatus() {
  try {
    const subscription_id = 'I-2G137V28WNS8';
    const subscription = await paypal.billingSubscription.get(subscription_id);
    console.log(subscription);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  processPaypalStatus
};
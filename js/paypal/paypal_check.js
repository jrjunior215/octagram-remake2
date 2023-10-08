const paypal = require('paypal-rest-sdk');
const Paypal = require('../../models/Paypal');

paypal.configure({
  mode: 'sandbox',
  client_id: 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
  client_secret: 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-',
});

async function processPaypalStatus() {
  const memberships = await Paypal.select();
  const statusCounts = {};

  for (const membership of memberships) {
    const { tran_id } = membership;

    try {
      const subscription = await getPaypalSubscription(tran_id);

      const status = subscription.state;
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      // อัปเดตสถานะในฐานข้อมูล
      if (status === 'Cancelled') {
        await updateSubscriptionStatus(tran_id, 0);
      } else if (status === 'Active') {
        await updateSubscriptionStatus(tran_id, 1);
      } else if (status === 'Suspended') {
        await updateSubscriptionStatus(tran_id, 3);
      }
      
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  }

  // สรุปรายการทั้งหมด
  console.log('Status Counts:', statusCounts);

  // สรุปจำนวน subscriptions ทั้งหมด
  const totalSubscriptions = Object.values(statusCounts).reduce((acc, count) => acc + count, 0);
  console.log('Total Subscriptions:', totalSubscriptions);
}

async function updateSubscriptionStatus(tran_id, status) {
  await Paypal.update(tran_id, status);
}

async function getPaypalSubscription(tran_id) {
  return new Promise((resolve, reject) => {
    paypal.billingAgreement.get(tran_id, (error, subscription) => {
      if (error) {
        reject(error);
      } else {
        resolve(subscription); 
      }
    });
  });
}

module.exports = {
  processPaypalStatus
};
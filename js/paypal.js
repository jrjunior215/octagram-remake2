const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: 'AaYqnuLBvj1k_-E1zW4jJPNKOPT9qa4GD-i8unxXx9HtRGUIQVo9QTgyu0Kb9XQp1JwAqmBUtMmt_HuG',
  client_secret: 'EBOYNOX3wS1F_uflOaeae93iqsGgoruucM9-ygilyPjmqhwWFKJu7VtOil23WRFLhcFImXrZ9B643tL-'
});

module.exports = paypal;
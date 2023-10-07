const dbConnection = require('../js/database');
const moment = require('moment-timezone');

const Paypal = {};

Paypal.select = async () => {
  const queryString = `SELECT * FROM memberships`;

  try {
    const [rows] = await dbConnection.execute(queryString);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = Paypal;
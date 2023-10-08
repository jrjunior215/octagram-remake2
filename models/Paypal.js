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


Paypal.update = async (tran_id, status) => {

  const queryString = `UPDATE memberships SET status = "${status}" WHERE tran_id = '${tran_id}';`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Paypal;
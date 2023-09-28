const dbConnection = require('../js/database');
const moment = require('moment-timezone');

const Category = {};

Category.create = async (data) => {
  const { id_admin, category_name } = data;
  const thaiTimezone = 'Asia/Bangkok';
  const now = moment().tz(thaiTimezone);

  const create_date = now.format('YYYY-MM-DD HH:mm:ss');

  const queryString = `INSERT INTO categories(id_admin, category_name, create_category_date)VALUES('${id_admin}','${category_name}','${create_date}')`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Category.admin = async () => {
  const queryString = `SELECT * FROM categories JOIN users ON categories.id_admin = users.id ORDER BY categories.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

module.exports = Category;
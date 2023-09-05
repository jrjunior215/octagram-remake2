const dbConnection = require('../js/database');

const Search = {};

Search.find = async (data) => {
  const query = data;
  const queryString = `SELECT * FROM creators WHERE creator_name LIKE '%${query}%' AND STATUS = 1`
  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })
};

module.exports = Search;
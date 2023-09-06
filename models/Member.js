const dbConnection = require('../js/database');

const Member = {};

Member.check = async (id_creator, id_user) => {
  const queryString = `SELECT * FROM memberships WHERE id_creator = ${id_creator} AND id_user = ${id_user}`
  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          if (rows.length > 0) {
              resolve(rows);
          } else {
              resolve(false);
          }
      }).catch(err => {
          if (err) throw err;
      });
  })
};

module.exports = Member;
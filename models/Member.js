const dbConnection = require('../js/database');
const moment = require('moment-timezone');

const Member = {};

Member.check = async (id_creator, id_user) => {
  const queryString = `SELECT * FROM memberships WHERE id_creator = ${id_creator} AND id_user = ${id_user}`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      if (rows.length > 0) {
        resolve(rows);
      } else {
        reject(false);
      }
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.navbar = async (id_user) => {
  const queryString = `SELECT * FROM memberships JOIN creators ON memberships.id_creator = creators.id WHERE memberships.id_user = '${id_user}'`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.creator = async (id_creator) => {
  const queryString = `SELECT * FROM memberships JOIN users ON memberships.id_user = users.id JOIN packages ON memberships.id_package = packages.id WHERE memberships.id_creator = '${id_creator}' ORDER BY memberships.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};


Member.admin = async () => {
  const queryString = `SELECT * FROM users ORDER BY id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.admin_creator = async () => {
  const queryString = `SELECT * FROM users JOIN creators ON users.id = creators.id_user WHERE users.role = "CREATOR" and creators.status = "1" ORDER BY users.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.admin_new_creator = async () => {
  const queryString = `SELECT * FROM users JOIN creators ON users.id = creators.id_user WHERE users.role = "CREATOR" and creators.status = "0" ORDER BY users.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.sub = async (id_user) => {
  const queryString = `SELECT * FROM memberships JOIN creators ON memberships.id_creator = creators.id JOIN packages ON memberships.id_package = packages.id WHERE memberships.id_user = '${id_user}' ORDER BY memberships.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Member.create = async (id_creator, id_package, id_user, agreementId) => {
  const thaiTimezone = 'Asia/Bangkok';
  const now = moment().tz(thaiTimezone);

  const create_date = now.format('YYYY-MM-DD HH:mm:ss');
  const start_date = now.format('YYYY-MM-DD HH:mm:ss');
  const end_date = now.add(1, 'month').format('YYYY-MM-DD HH:mm:ss');

  const queryString = `
    INSERT INTO memberships(id_creator, id_user, id_package, tran_id, status, create_date, start_date, end_date) 
    VALUES('${id_creator}','${id_user}','${id_package}','${agreementId}','1','${create_date}','${start_date}','${end_date}')
  `;

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  });
};

Member.show = async (id_creator) => {

  const queryString = `SELECT * FROM memberships WHERE id_creator = '${id_creator}' ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Member.all = async () => {

  const queryString = `SELECT * FROM memberships`

  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })

};

Member.list = async (id_package) => {

  const queryString = `SELECT * FROM memberships WHERE id_package = '${id_package}'`

  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })

};

module.exports = Member;
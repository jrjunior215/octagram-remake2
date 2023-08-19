const dbConnection = require('../js/database');
const bcrypt = require('bcrypt')

const User = {};

User.register = async (data) => {

  const { name, email, pass } = data;
  const role = 'USER'
  const img_pic = '/img/profile.png';

  return new Promise(function (resolve, reject) {
    const query_check_email = `SELECT email FROM users WHERE email = '${email}'`;
    dbConnection.execute(query_check_email).then(async ([rows]) => {
      if (rows.length > 0) {
        reject("This email already in use!");
      } else {
        const hash = await bcrypt.hash(pass, 10).then((hash_pass) => {
          const query_register = `INSERT INTO users(name,email,password,role,img) VALUES('${name}','${email}','${hash_pass}','${role}','${img_pic}')`;
          dbConnection.execute(query_register);
        }).catch(err => {
          if (err) throw err;
        });
        resolve();
      }
    }).catch(err => {
      if (err) throw err;
    });
  });

};

User.login = async (data) => {

  const { email, pass } = data;

  return new Promise(function (resolve, reject) {
    const query_check_email = `SELECT email FROM users WHERE email = '${email}'`;
    dbConnection.execute(query_check_email).then(async ([rows]) => {
      if (rows.length == 1) {
        const query_login = `SELECT * FROM users WHERE email = '${email}'`;
        dbConnection.execute(query_login).then(async ([rows]) => {
          const hash = await bcrypt.compare(pass, rows[0].password).then(function (result) {
            if (result === true) {
              resolve(rows);
            } else {
              reject("Incorrect email or password.");
            }
          }).catch(err => {
            if (err) throw err;
          });
        }).catch(err => {
          if (err) throw err;
        });
      } else {
        reject("No email.");
      }
    });
  });

};

module.exports = User;
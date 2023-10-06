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

User.creator = async (id_user) => {

  const queryString = `UPDATE users SET role = 'CREATOR' WHERE id = ${id_user};`
  await dbConnection.execute(queryString);

};

User.relogin = async (id_user) => {
  const queryString = `SELECT * FROM users WHERE id = '${id_user}'`

  return new Promise(function (resolve) {
      dbConnection.execute(queryString).then(async ([rows]) => {
        if (rows[0].role === "CREATOR") {
          const queryCreator = `SELECT *,creators.id AS creator_id, creators.img AS creator_img FROM creators JOIN users ON creators.id_user = users.id WHERE creators.id_user = '${id_user}'`
          dbConnection.execute(queryCreator).then(async ([rows]) => {
            resolve(rows)
          }).catch(err => {
            if (err) throw err;
        });
        } else {
          resolve(rows)
        }
      }).catch(err => {
          if (err) throw err;
      });
  })

};

User.creator_login = async (id_user) => {
  const queryString = `SELECT * FROM users WHERE id = '${id_user}'`

  return new Promise(function (resolve) {
      dbConnection.execute(queryString).then(async ([rows]) => {
        if (rows[0].role === "CREATOR") {
          const queryCreator = `SELECT *,creators.id AS creator_id, creators.img AS creator_img FROM creators JOIN users ON creators.id_user = users.id WHERE creators.id_user = '${id_user}'`
          dbConnection.execute(queryCreator).then(async ([rows]) => {
            resolve(rows)
          }).catch(err => {
            if (err) throw err;
        });
        } else {
          resolve(rows)
        }
      }).catch(err => {
          if (err) throw err;
      });
  })

};

User.profiletext = async (data) => {
  const { id_user, name, email, img} = data;
  const queryString = `UPDATE users SET name = '${name}', email = '${email}',img = '${img}' WHERE id = ${id_user}`

  return new Promise(function (resolve) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })

};

User.profileImg = async (data, imageUrl) => {
  const { id_user, name, email } = data;
  const queryString = `UPDATE users SET name = '${name}', email = '${email}',img = '${imageUrl}' WHERE id = ${id_user}`

  return new Promise(function (resolve) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })

};

User.all = async () => {

  const queryString = `SELECT * FROM users`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

User.deny = async (id_user) => {

  const queryString = `UPDATE users SET role = 'USER' WHERE id = '${id_user}'`
  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })

};

module.exports = User;
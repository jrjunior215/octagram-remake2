const { query } = require('express');
const dbConnection = require('../js/database');

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
  const queryString = `SELECT * FROM memberships JOIN users ON memberships.id_creator = users.id WHERE memberships.id_creator = '${id_creator}'`
  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
        resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })
};

module.exports = Member;
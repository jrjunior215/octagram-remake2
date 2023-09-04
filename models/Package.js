const dbConnection = require('../js/database');

const Package = {};

Package.create = async (data) => {

  const { id_creator, package_name, package_desc, package_price } = data;
  const queryString = `INSERT INTO packages(id_creator, package_name, package_desc, package_price) 
  VALUES("${id_creator}", "${package_name}", "${package_desc}", "${package_price}")`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Package.list = async (id_creator) => {

  const queryString = `SELECT * FROM packages WHERE id_creator = '${id_creator}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Package.select = async (id_package) => {

  const queryString = `SELECT * FROM packages WHERE id = '${id_package}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Package.edit = async (data) => {

  const { package_name, package_desc, package_price, id_package } = data;
  const queryString = `UPDATE packages SET package_name = "${package_name}", package_desc = "${package_desc}", package_price = "${package_price}" WHERE id = '${id_package}';`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Package.delete = async (data) => {

  const queryString = `DELETE FROM packages WHERE id = '${data}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Package;
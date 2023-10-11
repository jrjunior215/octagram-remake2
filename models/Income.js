const dbConnection = require('../js/database');

const Income = {};

Income.select = async () => {
  const queryString = `SELECT memberships.*, packages.package_name, packages.package_desc, packages.package_price, packages.package_date
  FROM memberships
  JOIN packages ON memberships.id_package = packages.id WHERE status = '1';`;

  try {
    const [rows] = await dbConnection.execute(queryString);
    return rows;
  } catch (error) {
    throw error;
  }

};

Income.create_creator = async (creators_income) => {
  try {
    for (const creator of creators_income) {
      const { id_creator, income, total_income, fee } = creator;
      const queryString = `INSERT INTO creators_income (id_creator, income, total_income, fee) VALUES (?, ?, ?, ?)`;
      const [rows] = await dbConnection.execute(queryString, [id_creator, income, total_income, fee]);
    }
  } catch (error) {
    throw error;
  }
};

Income.create_octagram = async (totalDeduction) => {

  const queryString = `INSERT INTO octagram_income(income)VALUES('${totalDeduction}')`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Income.select = async (id_creator) => {

  const queryString = `SELECT * FROM creators_income WHERE id_creator = '${id_creator}'`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

module.exports = Income;
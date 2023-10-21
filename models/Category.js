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
  const queryString = `SELECT *,categories.id AS id_category FROM categories JOIN users ON categories.id_admin = users.id ORDER BY categories.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Category.admin_creator = async () => {
  const queryString = `SELECT *,categories_creator.id AS id_category FROM categories_creator JOIN creators ON creators.id = categories_creator.id_creator JOIN categories ON categories.id = categories_creator.id_category ORDER BY categories_creator.id DESC`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Category.find = async (data) => {
  const query = data;
  const queryString = `SELECT * FROM categories WHERE category_name LIKE '%${query}%'`
  return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
          resolve(rows);
      }).catch(err => {
          if (err) throw err;
      });
  })
};

Category.add = async (id_category, id_creator) => {
  const thaiTimezone = 'Asia/Bangkok';
  const now = moment().tz(thaiTimezone);
  const add_date = now.format('YYYY-MM-DD HH:mm:ss');

  const queryString = `INSERT INTO categories_creator(id_creator, id_category, add_date)VALUES('${id_creator}','${id_category}','${add_date}')`
  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })
};

Category.show = async (id_creator) => {

  const queryString = `SELECT * FROM categories_creator JOIN categories ON categories.id = categories_creator.id_category WHERE id_creator = '${id_creator}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Category.list = async () => {

  const queryString = `SELECT * FROM categories`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Category.reset = async (id_creator) => {

  const queryString = `DELETE FROM categories_creator WHERE id_creator = '${id_creator}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Category.creator_list = async (id_category) => {

  const queryString = `SELECT * FROM categories_creator JOIN creators ON categories_creator.id_creator = creators.id WHERE id_category = '${id_category}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Category.edit = async (data) => {

  const { category_name_edit, id_category } = data;

  const queryString = `UPDATE categories SET category_name = '${category_name_edit}' WHERE id = '${id_category}';`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Category.delete = async (id_creator) => {

  const queryString = `DELETE FROM categories WHERE id = '${id_creator}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Category;
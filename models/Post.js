const dbConnection = require('../js/database');

const Post = {};

Post.show = async (id_creator) => {

  const queryString = `SELECT * FROM posts WHERE id_creator = '${id_creator}' ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.text = async (data) => {

  const { post_title, post_desc, permission, id_creator } = data;
  const queryString = `INSERT INTO posts(id_creator, post_title, post_desc, permission) 
  VALUES("${id_creator}", "${post_title}", "${post_desc}", "${permission}")`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Post;
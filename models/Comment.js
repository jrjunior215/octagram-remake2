const dbConnection = require('../js/database');

const Comment = {};

Comment.create_user = async (data) => {

  const { id_post, id_user, comment } = data;
  const queryString = `INSERT INTO comments(id_post, id_user, comment) 
    VALUES("${id_post}", "${id_user}", '${comment}')`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Comment.create_creator = async (data) => {

  const { id_post, id_creator, comment } = data;
  const queryString = `INSERT INTO comments(id_post, id_creator, comment) 
    VALUES("${id_post}", "${id_creator}", '${comment}')`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Comment.show = async (postId) => {

  const queryString = `SELECT comments.*,users.name,users.img AS img_user,creators.creator_name,creators.img AS img_creator FROM comments LEFT JOIN users ON comments.id_user = users.id LEFT JOIN creators ON comments.id_creator = creators.id WHERE id_post = '${postId}' ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Comment.edit = async (data) => {

  const { id_comment, comment } = data;
  const queryString = `UPDATE comments SET comment = '${comment}' WHERE id = '${id_comment}';`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Comment.delete = async (id_comment) => {

  const queryString = `DELETE FROM comments WHERE id='${id_comment}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Comment;
const dbConnection = require('../js/database');

const Comment = {};

Comment.create_user = async (data) => {

    const { id_post, id_user, comment } = data;
    const queryString = `INSERT INTO comments(id_post, id_user, comment) 
    VALUES("${id_post}", "${id_user}", "${comment}")`
  
    return new Promise(function (resolve, reject) {
      dbConnection.execute(queryString).then(async ([rows]) => {
        resolve(rows);
      }).catch(err => {
        if (err) throw err;
      });
    })
  
  };

module.exports = Comment;
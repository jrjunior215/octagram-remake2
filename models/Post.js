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
  VALUES("${id_creator}", "${post_title}", '${post_desc}', "${permission}")`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.show_check1 = async (id_creator, permission) => {

  const queryString = `SELECT * FROM posts WHERE id_creator = '${id_creator}' AND (permission LIKE '%${permission}%' OR permission = 'ALL') ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.show_check2 = async (id_creator) => {

  const queryString = `SELECT * FROM posts WHERE id_creator = '${id_creator}' AND permission = 'ALL' ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.feed = async (id_user) => {

  const queryString = `SELECT * FROM memberships WHERE id_user = '${id_user}' ORDER BY id DESC`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {

        if (rows.length > 0) {

            const id_creator = [];
            const id_package = [];

            for (var i = 0; i < rows.length; i++) {
                const id_creators = rows[i].id_creator
                id_creator.push(id_creators);
                if ( rows[i].id_package === null ) {
                } else {
                  const id_packages = rows[i].id_package
                  id_package.push(id_packages);
                }
            }

            const postString = `SELECT * FROM posts JOIN creators ON posts.id_creator = creators.id WHERE posts.id_creator IN (${id_creator}) AND (permission IN (${id_package}) OR permission = 'ALL') ORDER BY posts.id DESC`
            dbConnection.execute(postString).then(async ([rows]) => {
                resolve(rows);
            }).catch(err => {
                if (err) throw err;
            });

        } else {
            resolve(rows);
        }

    }).catch(err => {
        if (err) throw err;
    });
})

};

Post.post_edit_select = async (id_post) => {

  const queryString = `SELECT * FROM posts WHERE id = '${id_post}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.post_edit = async (data) => {

  const { post_title, post_desc, permission, id_post } = data;
  const queryString = `UPDATE posts SET post_title = '${post_title}', post_desc = "${post_desc}", permission = '${permission}' WHERE id = ${id_post}`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

Post.delete = async (data) => {

  const queryString = `DELETE FROM posts WHERE id='${data}'`

  return new Promise(function (resolve, reject) {
    dbConnection.execute(queryString).then(async ([rows]) => {
      resolve(rows);
    }).catch(err => {
      if (err) throw err;
    });
  })

};

module.exports = Post;
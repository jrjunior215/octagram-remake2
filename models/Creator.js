const dbConnection = require('../js/database');

const Creator = {};

Creator.create = async (data, imageUrl) => {

    const { id_user, creator_name, creator_desc, fname, lname, phone, birthdate, location, explain } = data;
    const queryString = `INSERT INTO creators(id_user, creator_name, creator_desc, fname, lname, phone , birthdate, location, \`explain\`, img, status) 
    VALUES('${id_user}','${creator_name}','${creator_desc}','${fname}','${lname}','${phone}','${birthdate}','${location}','${explain}','${imageUrl}','0')`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.page = async (creator_name) => {

    const queryString = `SELECT * FROM creators WHERE creator_name = '${creator_name}'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.profiletext = async (data) => {
    const { id_creator, creator_name, creator_desc, img } = data;
    const queryString = `UPDATE creators SET creator_name = '${creator_name}', creator_desc = '${creator_desc}',img = '${img}' WHERE id = ${id_creator}`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.profileImg = async (data, imageUrl) => {

    const { id_creator, creator_name, creator_desc } = data;
    const queryString = `UPDATE creators SET creator_name = '${creator_name}', creator_desc = '${creator_desc}',img = '${imageUrl}' WHERE id = ${id_creator}`

    return new Promise(function (resolve) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.all = async () => {

    const queryString = `SELECT * FROM creators`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.all_index = async () => {

    const queryString = `SELECT * FROM creators LIMIT 7`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};


Creator.all_reg = async () => {

    const queryString = `SELECT * FROM creators WHERE status = '0'`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.select = async (id_creator) => {

    const queryString = `SELECT * FROM creators WHERE id = '${id_creator}'`

    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.edit = async (data) => {

    const { id_creator, creator_name, creator_desc, fname, lname, phone, birthdate, location, explain } = data;
    const queryString = `UPDATE creators SET creator_name = '${creator_name}', creator_desc = '${creator_desc}', fname = '${fname}', lname = '${lname}', phone = '${phone}', birthdate = '${birthdate}', location = '${location}', \`explain\` = '${explain}' WHERE id = ${id_creator}`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.confirm = async (id_creator) => {

    const queryString = `UPDATE creators SET status = '1' WHERE id = '${id_creator}'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

Creator.deny = async (id_creator) => {

    const queryString = `DELETE FROM creators WHERE id = '${id_creator}'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

module.exports = Creator;
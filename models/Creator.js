const dbConnection = require('../js/database');

const Creator = {};

Creator.create = async (data, imageUrl) => {
    
    const { id_user, creator_name, creator_desc, fname, lname, phone , birthdate, location} = data; 
    const queryString = `INSERT INTO creators(id_user, creator_name, creator_desc, fname, lname, phone , birthdate, location, img, status) 
    VALUES('${id_user}','${creator_name}','${creator_desc}','${fname}','${lname}','${phone}','${birthdate}','${location}','${imageUrl}','0')`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })

};

module.exports = Creator;
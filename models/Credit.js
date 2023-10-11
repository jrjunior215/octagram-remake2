const dbConnection = require('../js/database');

const Credit = {};

Credit.create = async (data) => {

    const { card_number, card_holder, card_bank, id_creator } = data;

    const queryString = `INSERT INTO creators_credit (id_creator, card_number, card_holder, card_bank) VALUES('${id_creator}','${card_number}','${card_holder}','${card_bank}')`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Credit.select = async (id_creator) => {

    const queryString = `SELECT * FROM creators_credit WHERE id_creator = '${id_creator}'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

Credit.edit = async (data) => {

    const { card_number, card_holder, card_bank, id_creator } = data;

    const queryString = `UPDATE creators_credit SET card_number = '${card_number}', card_holder = '${card_holder}', card_bank = '${card_bank}' WHERE id_creator = '${id_creator}'`
    return new Promise(function (resolve, reject) {
        dbConnection.execute(queryString).then(async ([rows]) => {
            resolve(rows);
        }).catch(err => {
            if (err) throw err;
        });
    })
};

module.exports = Credit;
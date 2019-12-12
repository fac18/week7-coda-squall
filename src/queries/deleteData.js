const dbConnection = require("../database/db_connection");

const deleteChar = (name, cb) => {
  dbConnection.query(`DELETE FROM characters WHERE name = $1;`, [name], (err, result) => {
    if (err) return cb(err);
    cb(null, result);
  })
}

module.exports = {deleteChar};

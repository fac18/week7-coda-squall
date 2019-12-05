const dbConnection = require("../database/db_connection");

const getAllChar = cb => {
  dbConnection.query("SELECT * FROM characters", (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getChar = (name, cb) => {
  dbConnection.query(
    `SELECT * FROM characters WHERE name=${name}`,
    (err, result) => {
      if (err) return cb(err);
      cb(null, result.rows);
    }
  );
};

const getPow = cb => {
  console.log("This is get Pow1");
  dbConnection.query("SELECT * FROM powers", (err, result) => {
    console.log("This is get Pow");
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

module.exports = {
  getAllChar,
  getChar,
  getPow
};

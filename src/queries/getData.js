const dbConnection = require("../database/db_connection");

const getAllChar = cb => {
  dbConnection.query(
    "SELECT score,characters.name,talisman,battle_cry,powers.name AS powers_name,image_path FROM characters INNER JOIN powers ON characters.powers_id=powers.id",
    (err, result) => {
      if (err) return cb(err);
      cb(null, result.rows);
    }
  );
};

const getChar = (name, cb) => {
  dbConnection.query(
    `SELECT name,powers_id,talisman,battle_cry,score FROM characters WHERE name=$1`,
    [name],
    (err, result) => {
      if (err) return cb(err);
      cb(null, result.rows);
    }
  );
};

const getPow = cb => {
  dbConnection.query("SELECT * FROM powers", (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getHashedPassword = (name, cb) => {
  dbConnection.query(
    `SELECT hashed_password FROM characters WHERE name=$1`,
    [name],
    (err, result) => {
      if (err) return cb(err);
      cb(null, result.rows);
    }
  );
};

module.exports = {
  getAllChar,
  getChar,
  getPow,
  getHashedPassword
};

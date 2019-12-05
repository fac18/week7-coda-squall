const dbConnection = require("../database/db_connection");

const postChar = (name, powers_id, talisman, battle_cry, cb) => {
  dbConnection.query(
    "INSERT INTO characters (name, powers_id, talisman, battle_cry) VALUES ($1, $2, $3, $4)",
    [name, powers_id, talisman, battle_cry],
    (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    }
  );
};

module.exports = postChar;

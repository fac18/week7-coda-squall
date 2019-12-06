const dbConnection = require("../database/db_connection");

const postChar = (character, cb) => {
  dbConnection.query(
    "INSERT INTO characters (name, powers_id, talisman, battle_cry) VALUES ($1, $2, $3, $4)",
    [
      character.name,
      parseInt(character.powers_id),
      character.talisman,
      character.battle_cry
    ],
    (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    }
  );
};

module.exports = postChar;

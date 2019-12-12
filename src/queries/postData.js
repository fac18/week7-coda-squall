const dbConnection = require("../database/db_connection");

const postChar = (character, cb) => {
  console.log({character})
  console.log(typeof character.powers_id)
  dbConnection.query(
    "INSERT INTO characters (name, hashed_password, powers_id, talisman, battle_cry) VALUES ($1, $2, $3, $4, $5)",
    [
      character.name,
      character.hashed_password,
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

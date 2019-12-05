const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");

tape("Tape is working", t => {
  t.equal(1, 1, "one is equal to one");
  t.end();
});

tape("Get all powers", t => {
  runDbBuild((err, res) => {
    if (err) console.log(err);
    return;
  });
  let expected = [
    {
      id: 1,
      name: "Electricity",
      description: "Description here...",
      image_path: "electricity.png"
    },
    {
      id: 2,
      name: "Radiation",
      description: "Description here...",
      image_path: "radiation.png"
    },
    {
      id: 3,
      name: "Punch",
      description: "Description here...",
      image_path: "punch.png"
    },
    {
      id: 4,
      name: "Clairvoyant",
      description: "Description here...",
      image_path: "clairvoyant.png"
    },
    {
      id: 5,
      name: "Telekinesis",
      description: "Description here...",
      image_path: "telekinesis.png"
    },
    {
      id: 6,
      name: "Shape shifting",
      description: "Description here...",
      image_path: "shape-shifting.png"
    },
    {
      id: 7,
      name: "Time manipulation",
      description: "Description here...",
      image_path: "time-manipulation.png"
    }
  ];
  getData.getPow((err, res) => {
    if (err) return err;
    t.deepEqual(res, expected, "These are all the powers : ");
    t.end();
  });
});

tape("Create character", t => {
  runDbBuild((err, res) => {
    if (err) console.log(err);
    return;
  });
  let expected = {
    command: "INSERT",
    rowCount: 1
  };
  let character = {
    name: "Heroku",
    talisman: "enchanted amulet",
    power_id: "3",
    battle_cry: "Your app isn't working"
  };
  postData(character, (err, res) => {
    if (err) return err;
    t.deepEqual(res.command, expected.command, "Command should be INSERT");
    t.deepEqual(res.rowCount, expected.rowCount, "New rows should be 1");
    t.end();
  });
});

tape("Get specific character", t => {
  runDbBuild((err, res) => {
    if (err) console.log(err);
    return;
  });
  let expected = [
    {
      id: 1,
      name: "Travis",
      powers_id: 4,
      talisman: "golden moustache",
      battle_cry: "Your build is not passing"
    }
  ];
  getData.getChar("Travis", (err, res) => {
    if (err) return err;
    t.deepEqual(res, expected, "This is Travis : ");
    t.end();
  });
});

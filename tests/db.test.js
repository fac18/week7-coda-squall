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

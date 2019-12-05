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
  let actual = getData.getPow((err, res) => {
    if (err) return err;
    return res;
  });
  let expected = "";
  t.deepEqual(actual, expected, "These are all the powers : ");
  t.end();
});

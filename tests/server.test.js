const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");

test("Tape is working", t => {
  t.equals(1, 1, "1 is equal to 1");
  t.end();
});

test("Home loads correctly", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", /html/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("Public route should render css", t => {
  supertest(router)
    .get("/public/css/main.css")
    .expect(200)
    .expect("content-type", /css/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("Public route should render js", t => {
  supertest(router)
    .get("/public/js/main.js")
    .expect(200)
    .expect("content-type", /javascript/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("Public route should render favicon", t => {
  supertest(router)
    .get("/public/img/favicon.png")
    .expect(200)
    .expect("content-type", /png/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("create-char route should post character obj", t => {
  supertest(router)
    .post("/create-char")
    .send(
      "name=dragon&password=$2a$10$a9zQ0BfeloJxoPzcvauISegrdTM6Fn4EbbFrWFirKeJXfKPPzZm8a&powerId=4&talisman=ankh&battleCry=AHH"
    )
    .expect(302)
    .expect("Location", "/")
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("check-char route should get character obj", t => {
  supertest(router)
    .get("/check-char?name=dragon")
    .expect(200)
    .expect("content-type", /json/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("get-all-char route should get all characters arr", t => {
  supertest(router)
    .get("/get-all-char")
    .expect(200)
    .expect("content-type", /json/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

test("404 page is served correctly", t => {
  supertest(router)
    .get("/nowhere")
    .expect(404)
    .expect("content-type", /html/)
    .end((err, res) => {
      t.error(err, "Error is null");
      t.end();
    });
});

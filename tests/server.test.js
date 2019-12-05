const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test("Tape is working", t => {
    t.equals(1, 1, "1 is equal to 1");
    t.end();
});

test("Home loads correctly", t => {
    supertest(router)
        .get('/')
        .expect(200)
        .expect( 'content-type', /html/ )
        .end((err, res) => {
            t.error(err, 'Error is null'); 
            t.end();
        })
});

test('Public route should render css', t => {
    supertest(router)
        .get('/public/css/main.css')
        .expect(200)
        .expect('content-type', /css/)
        .end((err,res) => {
            t.error(err, 'Error is null')
            t.end();
        })
});

test('Public route should render js', t => {
    supertest(router)
        .get('/public/js/main.js')
        .expect(200)
        .expect('content-type', /js/)
        .end((err,res) => {
            t.error(err, 'Error is null')
            t.end();
        })
});

test('Public route should render favicon', t => {
    supertest(router)
        .get('/public/img/favicon.png')
        .expect(200)
        .expect('content-type', /png/)
        .end((err,res) => {
            t.error(err, 'Error is null')
            t.end();
        })
});

// test('create-char route should fetch character obj', t => {
//     supertest(router)
//         .get('/create-char')
//         .
// });
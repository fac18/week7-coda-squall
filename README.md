# week6-coda-squall

[![Build Status](https://travis-ci.org/fac18/week6-coda-squall.svg?branch=master)](https://travis-ci.org/fac18/week6-coda-squall)

[![codecov](https://codecov.io/gh/fac18/week6-coda-squall/branch/master/graph/badge.svg)](https://codecov.io/gh/fac18/week6-coda-squall)

## We are:
* Dan 🎮
* Renata 🐰
* Roshan 🙆🏾
* Gillian 🍬

## Installation Guide

1. git clone this repo
2. `npm install` to set up node modules
3. Initialise a local database
4. Create .env file in project route
5. Add DB_URL/TEST_DB_URL values to your .env

## Project
This week's project will involve setting up a database which you connect to via a node.js server. You'll use your data to make a dynamic web app for your front-end.

Some suggested project ideas are below. Feel free to modify according to your interest, provided your idea has similar functionality.

### Requirements

- [X] Simple web app with a node server and a database
- [x] Your database comes with a schema, which should be documented in your readme (along with any other architectural decisions)
- [X] Database hosted on Heroku, or locally
- [x] Build script for your database
- [x] Security concerns appropriately considered (you must protect against script injections!)
- [X] Content dynamic, but DOM manipulation kept to a minimum
- [X] Mobile-first design
- [X] Clear user journey (even if you take one of our suggested ideas, document the user journey in your readme)
- [x] test your server routes with supertest
- [ ] test your pure functions both server and client side
- [x] set up a test database so that you can test your database queries

### :pencil: Schema
![schema](https://imgur.com/coS9CZI.jpg)

### Things we learned
* Requiring a file also runs that file - which you don't normally notice, but we saw surprise console logs in our testing
* How to make reusable XML requests (finally!)
```javascript
const backendCall = (url, method, data, cb) => {
  const xml = new XMLHttpRequest();
  xml.onreadystatechange = () => {
    if (xml.readyState === 4 && xml.status === 200) {
      let apiResponse = JSON.parse(xml.responseText);
      cb(apiResponse);
    }
  };
  xml.open(method, url, true);
  xml.send();
};
```

### Accessibility

### Future improvements

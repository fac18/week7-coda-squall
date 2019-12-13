# <font color="red">SQ</font>UAL<font color="red">L</font>

![Build Status](https://travis-ci.org/fac18/week7-coda-squall.svg?branch=master)

---

## We are:
* Dan 🎮
* Renata 🐰
* Roshan 🙆🏾
* Gillian 🍬

---

## Installation Guide

1. git clone this repo
2. `npm install` to set up node modules
3. Initialise a local database
4. Create .env file in project route
5. Add DB_URL/TEST_DB_URL values to your .env

---

## This is Week 2

Catch up with our story so far on the [previous week's repo](https://github.com/fac18/week6-coda-squall/)

---

## Requirements this time

As per the [project brief](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-7/project.md)

- [x] Login form with 2 fields - username and password
- [x] Users only have to log in once (i.e. implement a cookie-based session on login)
- [ ] Username is visible on each page of the site after logging in
- [ ] Any user-submitted content should be labelled with the authors username
- [x] There should be protected routes and unprotected routes that depend on the user having a cookie or not
- [x] Website content should be stored in a database
- [x] Include thorough tests on the back-end, testing pure functions and testing routes using Supertest. If you make external API calls, use Nock to mock the response for your tests
- [ ] Test front-end logic, we don't expect tests on the DOM

---

### Or much prettier: as issues

![](https://i.imgur.com/ryVnlhi.png)

---

## New wireframe

Split depending on whether the user is logged in.

![](https://i.imgur.com/ceY3rx8.jpg)

---


# Client side validation

---

<h2>
password validation 
</h2>


```javascript=
const charPw = document.getElementById("char-form-password");
const pwErr = document.getElementById("pwErr");

let checkPw = () => {
  if (charPw.validity.patternMismatch) {
    displayErr(
      pwErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (charPw.validity.valueMissing) {
    displayErr(pwErr, "Please enter a password");
  } else {
    displayErr(pwErr, "");
    return true;
  }
};
```

---

<h2>Existing user validation</h2>

```javascript=
const checkUniqueUser = cb => {
  backendCall(`/check-char?=${charName.value}`, "GET", null, char => {
    cb(char);
  });
};

const checkName = () => {
    checkUniqueUser(char => {
      if (char.length != 0) {
        displayErr(nameErr, "Player name is already taken");
        nameOk = false;
      } else if (!charName.value) {
        displayErr(nameErr, "Please enter a name");
        nameOk = false;
      } else {
        displayErr(nameErr, "");
        nameOk = true;
      }
    });
  };
```

---

# Cookie

![](https://media2.giphy.com/media/CoWGqp7Q7mx8c/giphy.gif?cid=790b7611636a482f64f2af8926814326341c12274e3d4d68&rid=giphy.gif)

---

<h2>
Deleting cookie from the front-end
</h2>

```javascript=
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", e => {
  const result = window.confirm(
    "Are you sure you want to delete your character?"
  );
  if (result) {
    deleteExistingPlayer(document.cookie);
    document.cookie = "player=0; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  } else {
    e.preventDefault();
  }
});
```

---

# HttpOnly

---

## To be improved

[![codecov](https://codecov.io/gh/fac18/week7-coda-squall/branch/master/graph/badge.svg)](https://codecov.io/gh/fac18/week7-coda-squall)

We wrote loads of new code but no new tests

---


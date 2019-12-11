# <font color="red">SQ</font>UAL<font color="red">L</font>

[![Build Status](https://travis-ci.org/fac18/week6-coda-squall.svg?branch=master)](https://travis-ci.org/fac18/week6-coda-squall)

[![codecov](https://codecov.io/gh/fac18/week6-coda-squall/branch/master/graph/badge.svg)](https://codecov.io/gh/fac18/week6-coda-squall)

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

- [ ] Simple web app with a node server and a database
- [ ] Database comes with schema
- [ ] Database hosted on Heroku, or locally
- [ ] Build script for your database
- [ ] Security concerns appropriately considered
- [ ] Content dynamic, but DOM manipulation kept to a minimum
- [ ] Clear user journey
- [ ] Test your server routes with supertest
- [ ] Set up a test database so that you can test your database queries

---

# <font color="red">Brainstorm</font>

![](https://i.imgur.com/t2RebOo.jpg)

---

# <font color="red">Prototype</font>

![](https://i.imgur.com/OrAqGnx.jpg)

---

# <font color="red">Schema</font>

![](https://i.imgur.com/pfGJA4a.png)

---

# <font color="red">Things we learned</font>

---

<h2> Reusable XML requests </h2>

```javascript=
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

---

We later updated this to the following:

```javascript
const backendCall = (url, method, data, cb) => {
  const xml = new XMLHttpRequest();
  xml.onload = () => {
    if (xml.status.toString().startsWith('2')) {
      if (xml.responseText) {
      let apiResponse = JSON.parse(xml.responseText);
      cb(apiResponse);
      }
    }
  };
  xml.open(method, url, true);
  xml.send(data);
};
```

---

<font color="red">
This is to enable the function:

a) to work with any 2xx status code (because we were serving a 201 on successful POST)

b) to work in the case that the response has no body (because for safety reasons, our POST does not return anything)
</font>

---

### <font color="red">Other things we learnt

Requiring a file also runs that file - which you don't normally notice, but we saw surprise console logs in our testing
</font>

---

<font color="red">Radio button stuff</font>

![](https://media.giphy.com/media/ER9ew0BbQGCDC/giphy.gif)

---

### <font color='red'> HTML </font>

```html
<label for="power-id-1" class="char-form__radio-label">
            <input
              type="radio"
              class="char-form__radio-input"
              name="power-id"
              value="1"
              id="power-id-1"
            />
            <img
              src="public/img/electricity.png"
              alt="electricity power icon"
              class="char-form__radio-img"
            />
          </label>
```

---

### <font color='red'> CSS </font>

```css
.char-form__radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.char-form__radio-img {
  cursor: pointer;
  width: 88px;
  height: 88px;
}

.char-form__radio-input:checked + img {
  outline: 2px solid white;
}
```

---

# <font color="red">Accessibility</font>

![](https://i.imgur.com/ZIYVYvN.png)


---

# <font color="red">CSS</font>

![css](https://imgur.com/1mzfzUN.jpg)

---

# <font color="red">Testing</font>

* Generally ok, although easy to make them fail when there are so many moving pieces

* Weird 10s hang when query includes 'WHEN'!!

![](https://imgur.com/xOf25aX.jpg)

---

# <font color="red">THANK YOU</font> 

![](https://media2.giphy.com/media/7ywpENs4MoQko/giphy.webp?cid=790b7611c585508caf0ababbacb18e138ba492a714c57fd7&rid=giphy.webp)




const getData = require("./queries/getData");
const postData = require("./queries/postData");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const SECRET = process.env.SECRET;

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "../public/index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, a problem on our end!</h1>");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = (request, response) => {
  // const extension = request.url.split('.')[1]
  const extension = path.extname(request.url).split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    png: "image/png",
    jpg: "image/jpg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml"
  };
  const filePath = path.join(__dirname, "..", request.url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, a problem on our end!</h1>");
    } else {
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    }
  });
};

const handleCreateChar = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("error", error => {
    throw error;
  });
  request.on("end", () => {
    const character = querystring.parse(data);
    postData(character, (error, res) => {
      if (error) {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, a problem on our end!</h1>");
      } else {
        response.writeHead(201, { Location: `/` });
        response.end();
      }
    });
  });
};

const handleGetChar = (request, response, endpoint) => {
  // endpoint is of the form '/get-char?q=[name]'
  let name = endpoint.split("=")[1];
  getData.getChar(name, (err, res) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1> This is not a character. Try again.</h1>");
    } else {
      // here 'res' is an object containing all data for character with given name
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(res));
    }
  });
};

const handleGetAllChar = (request, response) => {
  getData.getAllChar((err, res) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1> Sorry, there was a problem on our end! </h1>");
    } else {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(res));
    }
  });
};

const handleLogIn = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("error", error => {
    throw error;
  });
  request.on("end", () => {
    const userAuth = querystring.parse(data);
    getData.getHashedPassword(userAuth.name, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, a problem on our end!</h1>");
      } else {
        bcrypt.compare(userAut.password, hashedPassword, (err, match) => {
          if (err) {
            console.log(err);
            response.writeHead(500, { "content-type": "text/html" });
            response.end("<h1>Sorry, a problem on our end!</h1>");
          } else {
            if (match) {
              const payload = {
                logged_in: true,
                name: userAuth.name
              };
              jwt.sign(payload, SECRET, (err, token) => {
                // 1. write head token as cookie
                // 2. sent to home location '/'
              });
            } else {
              console.log("Bad credentials!");
            }
          }
        });
      }
    });
  });
};

const handle404 = (request, response) => {
  const filePath = path.join(__dirname, "../public/404.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1> Sorry, there was a problem on our end! </h1>");
    } else {
      response.writeHead(404, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

module.exports = {
  handleHome,
  handlePublic,
  handleCreateChar,
  handleGetChar,
  handleGetAllChar,
  handle404
};

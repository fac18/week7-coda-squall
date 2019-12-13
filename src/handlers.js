const getData = require("./queries/getData");
const postData = require("./queries/postData");
const deleteData = require("./queries/deleteData");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const SECRET = process.env.SECRET;

const handleHome = (request, response) => {
  let clientCookie = request.headers.cookie;
  if (clientCookie) {
    //there are cookies, check what they are
    let clientToken = cookie.parse(clientCookie).player;
    //check that there actually is a cookie called player
    if (clientToken) {
      jwt.verify(clientToken, SECRET, (err, clientDecoded) => {
        if (err) {
          //in case there is an error with jwt verify
          console.log(err);
          response.writeHead(500, { "content-type": "text/html" });
          response.end("<h1>Sorry, a problem on our end!</h1>");
        } else {
          //check the token is valid, if so send to logged in home
          if (clientDecoded) {
            const filePath = path.join(
              __dirname,
              "../public/index-loggedin.html"
            );
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
          } else {
            //if the token was not valid (they had a cookie called player but not one we recognise) send them back to normal home
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
          }
        }
      });
    } else {
      //there is a cookie but not a player cookie, go to normal home
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
    }
  } else {
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
  }
};

const handlePublic = (request, response) => {
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
    console.log(character);
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        console.log(error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end("<h1>Sorry, a problem on our end!</h1>");
      } else {
        console.log(`Character password: `, character.password);
        console.log(`Salt: `, salt);
        bcrypt.hash(character.password, salt, (error, hashedPassword) => {
          if (error) {
            console.log(error);
            response.writeHead(500, { "content-type": "text/html" });
            response.end("<h1>Sorry, a problem on our end!</h1>");
          } else {
            postData(
              {
                name: character.name,
                hashed_password: hashedPassword,
                talisman: character.talisman,
                battle_cry: character.battleCry,
                powers_id: character.powerId
              },
              (error, res) => {
                if (error) {
                  console.log(error);
                  response.writeHead(500, { "content-type": "text/html" });
                  response.end("<h1>Sorry, a problem on our end!</h1>");
                } else {
                  const payload = {
                    name: character.name
                  };
                  jwt.sign(payload, SECRET, (err, token) => {
                    response.writeHead(302, {
                      "Set-cookie": `player=${token}; Max-Age=3600`,
                      Location: "/"
                    });
                    response.end();
                  });
                }
              }
            );
          }
        });
      }
    });
  });
};

const handleGetChar = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("error", error => {
    throw error;
  });
  request.on("end", () => {
    console.log("cookie ", request.headers.cookie);
    console.log("data ", data);
    const clientToken = cookie.parse(data).player;
    // const clientToken = cookie.parse(request.headers.cookie).player;
    jwt.verify(clientToken, SECRET, (err, clientDecoded) => {
      // legitimacy of jwt already verified by handlePlayerArea handler
      getData.getChar(clientDecoded.name, (err, res) => {
        if (err) {
          console.log(err);
          response.writeHead(404, { "content-type": "text/html" });
          response.end("<h1> This is not a character. Try again.</h1>");
        } else {
          // here 'res' is an object containing all (public) data for character with given name
          response.writeHead(200, { "content-type": "application/json" });
          response.end(JSON.stringify(res));
        }
      });
    });
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

const handleCheckChar = (request, response) => {
  // endpoint is of the form '/get-char?q=[name]'
  let name = request.url.split("=")[1];
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
        bcrypt.compare(userAuth.password, hashedPassword, (err, match) => {
          if (err) {
            console.log(err);
            response.writeHead(500, { "content-type": "text/html" });
            response.end("<h1>Sorry, a problem on our end!</h1>");
          } else {
            if (match) {
              const payload = {
                name: userAuth.name
              };
              jwt.sign(payload, SECRET, (err, token) => {
                response.writeHead(302, {
                  "Set-cookie": `player=${token}; Max-Age=86400`,
                  Location: "/"
                });
                response.end();
              });
            } else {
              response.writeHead(401, { "content-type": "text/html" });
              response.end("<h1>Bad authentication</h1>");
            }
          }
        });
      }
    });
  });
};

const handleLogOut = (request, response) => {
  response.writeHead(302, {
    "Set-cookie": "player=0; Max-Age=0",
    Location: "/"
  });
  response.end();
};

const handlePlayerArea = (request, response) => {
  let clientCookie = request.headers.cookie;
  if (clientCookie) {
    //there are cookies, check what they are
    let clientToken = cookie.parse(clientCookie).player;
    //check that there actually is a cookie called player
    if (clientToken) {
      jwt.verify(clientToken, SECRET, (err, clientDecoded) => {
        if (err) {
          //in case there is an error with jwt verify
          console.log(err);
          response.writeHead(500, { "content-type": "text/html" });
          response.end("<h1>Sorry, a problem on our end!</h1>");
        } else {
          //check the token is valid, if so send to player area
          if (clientDecoded) {
            const filePath = path.join(__dirname, "../public/player-area.html");
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
          } else {
            console.log(1);
            //if the token was not valid deliver 401
            response.writeHead(401, { "content-type": "text/html" });
            response.end("<h1>Bad authentication</h1>");
          }
        }
      });
    } else {
      console.log(2);
      //there is a cookie but not a player cookie, deliver 401
      response.writeHead(401, { "content-type": "text/html" });
      response.end("<h1>Bad authentication</h1>");
    }
  } else {
    // there is no cookie, deliver 401
    console.log(3);
    response.writeHead(401, { "content-type": "text/html" });
    response.end("<h1>Bad authentication</h1>");
  }
};

const handleDeleteChar = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("error", error => {
    throw error;
  });
  request.on("end", () => {
    const clientToken = cookie.parse(data).player;
    jwt.verify(clientToken, SECRET, (err, clientDecoded) => {
      // legitimacy of jwt already verified by handlePlayerArea handler
      deleteData.deleteChar(clientDecoded.name, (err, res) => {
        if (err) {
          console.log(err);
          response.writeHead(404, { "content-type": "text/html" });
          response.end("<h1> This is not a character. Try again.</h1>");
        } else {
          response.writeHead(302, {
            "content-type": "application/json",
            Location: "/"
          });
          response.end();
        }
      });
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
  handleLogIn,
  handleLogOut,
  handlePlayerArea,
  handleDeleteChar,
  handleCheckChar,
  handle404
};

const http = require("http");
const router = require("./router");
const port = process.env.PORT || 1997;
const hostname = process.env.HOSTNAME || "localhost";

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`the fight is happening at ${hostname}:${port}`);
});

const http = require("http");
const router = require("./router");
const port = process.env.PORT || 7779;
const hostname = process.env.HOSTNAME || "localhost";

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`the fight is happening at ${hostname}:${port}`);
});

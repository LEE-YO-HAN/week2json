const fs = require("fs");
const os = require("os");

fs.copyFile("db.json", os.tmpdir() + "/db.json", function (err) {
  if (err) console.log(err);
  else console.log("copy file succeed to" + os.tmpdir());
});

// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const server = jsonServer.create();
// const router = jsonServer.router("db.json");
const path = require("path");
const router = jsonServer.router(path.resolve(os.tmpdir() + "/db.json"));
// const router = jsonServer.router(path.join("./db.json"));
const middlewares = jsonServer.defaults({ static: "./build" });

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;

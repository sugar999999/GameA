/* index.js
 *
*/

var http = require('http');
var connect = require("connect");
var serveStatic = require("serve-static");
var connect = connect()
  .use(serveStatic(__dirname + "/public"));

var server = http.createServer(connect);

server.listen(process.env.PORT || 8000);

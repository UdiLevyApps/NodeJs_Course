const cluster = require('cluster');
const http = require('http');

http.Server((req, res) => {
    sleep(2000)
    res.writeHead(200);
    res.end('Server response to request url: ' + req.url + '\n');
}).listen(8000);

function sleep(ms) { // node.js >= 9.3 → blocks event loop 
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

console.log("\n ---- Server is running ----\n")
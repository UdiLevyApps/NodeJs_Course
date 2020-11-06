const http = require('http');

function makeRequest(i) {
    return new Promise((res, rej) => {
        http
            .get('http://localhost:8000/' + i, function (resp) {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    res(data)
                });
            })
            .on('error', function (err) {
                console.log(err);
                rej(err)
            });
    }
    );
}

async function make10AsyncRequest() {
    for (let i = 0; i < 10; i++) {
        // await makeRequest(i)
        makeRequest(i).then((data) => {
            console.log("Response success: " + data);
        }).catch((err) => {
            console.log("response error: " + err);
        })
    }
}


make10AsyncRequest()

// "How many requests completed around the same time?" 
// Response : 
// when using the server1.js, none of them returns on the same time

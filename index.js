const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url')

const PORT = process.env.PORT || 5000;
const errorPage = path.join(__dirname, 'public', '404.html');
console.log(errorPage)

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filepath;

    if (q.pathname === '/') {
        filepath = path.join(__dirname, 'public', 'index.html');
    } else {
        filepath = path.join(__dirname, 'public', q.pathname) + '.html'
    }
    console.log(filepath)

    // read the file from the request url
    fs.readFile(filepath, (err, content) => {
        if (err) {
            console.log(`error in path: ${filepath}`)
            fs.readFile(errorPage, (err, data) => {
                if (err) throw err;
                res.writeHead(404, {'Content-type': 'text/html'});
                res.end(data);
            })
            return;
        }
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(content);
    });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))
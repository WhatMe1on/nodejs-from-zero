const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./lib');

const ip = '172.27.89.210'
const port = 3000

let playerWon = 0;

let prevAction = null;
let sameCount = 0;

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname == '/favicon.ico') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (parsedUrl.pathname == '/game') {
        const query = querystring.parse(parsedUrl.query);
        const playerAction = query.action;

        const gameResult = game(playerAction);

        if (prevAction && prevAction == playerAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }
        prevAction = playerAction;

        if (sameCount > 52) {
            res.writeHead(500)
            res.end('huan ge si lu')
            return
        }

        if (playerWon > 3) {
            res.writeHead(500)
            res.end('bu he niwanle')
            return
        }

        if (gameResult == 0) {
            res.end('平局');
        } else if (gameResult == 1) {
            res.end('你赢了');
            playerWon++;
        } else {
            n
            res.end('你输了');
        }

    }

    if (parsedUrl.pathname == '/') {
        fs.ReadStream(__dirname + '/index.html').pipe(res);
    }

}).listen(port, ip, () => {
    console.log(`http://${ip}:${port}/`)
})
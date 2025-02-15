const fs = require('fs');
const express = require('express')

const game = require('./lib');

const ip = '172.27.89.210'
const port = 3000

let playerWon = 0;
let prevAction = null;
let sameCount = 0;

const app = express();

app.listen(port, ip, () => {
    console.log(`http://${ip}:${port}/`)
})

app.get('/favicon.ico', function (req, res) {
    res.status(200);
    return;
})


app.get('/', function (req, res) {
    res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
    // fs.ReadStream(__dirname + '/index.html').pipe(res);
})

app.get('/game',
    function (req, res, next) {
        if (playerWon > 3) {
            res.status(500)
            res.send('bu he niwanle')
            return
        }

        if (res.won) {
            console.log(playerWon)
            playerWon++;
        }

        next()
    },

    function (req, res, next) {
        const query = req.query;
        const playerAction = query.action;
        if (prevAction && prevAction == playerAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }
        prevAction = playerAction;

        if (sameCount > 52) {
            res.status(500)
            res.send('huan ge si lu')
            return
        }

        res.playerAction = playerAction
        next();
    },
    function (req, res) {
        const playerAction = res.playerAction;
        const gameResult = game(playerAction);
        res.status(200)
        if (gameResult == 0) {
            res.send('平局');
        } else if (gameResult == 1) {
            res.send('你赢了');
            res.won = true;
        } else {
            res.send('你输了');
        }
    }

)

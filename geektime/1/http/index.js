const fs = require('fs');
const koa = require('koa')
const mount = require('koa-mount')
const game = require('./lib');

const ip = '172.27.89.210'
const port = 3000

let playerWon = 0;
let prevAction = null;
let sameCount = 0;

const app = new koa();
const gameKoa = new koa();

app.listen(port, ip, () => {
    console.log(`http://${ip}:${port}/`)
})

app.use(
    mount('/favicon.ico', function (ctx) {
        ctx.status = 200;
    })
)

app.use(
    mount('/game', gameKoa)
)

app.use(
    mount('/', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    })
)

gameKoa.use(
    async function (ctx, next) {
        if (playerWon >= 3) {
            ctx.status = 500
            ctx.body = '不和你玩'
            return
        }

        await next()
        console.log(ctx.won)

        if (ctx.won) {
            console.log(playerWon)
            playerWon++;
        }
    });

gameKoa.use(
    async function (ctx, next) {
        const query = ctx.query;
        const playerAction = query.action;
        if (prevAction && prevAction == playerAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }
        prevAction = playerAction;

        if (sameCount > 52) {
            ctx.status = 500
            ctx.body = '换个思路'
            return
        }

        ctx.playerAction = playerAction
        console.log(playerAction)
        await next();
    });

gameKoa.use(
    async function (ctx, next) {
        const playerAction = ctx.playerAction;
        const gameResult = game(playerAction);

        console.log(gameResult)
        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200
                if (gameResult == 0) {
                    ctx.body = '平局'
                } else if (gameResult == 1) {
                    ctx.body = '你赢了'
                    ctx.won = true;
                } else {
                    ctx.body = '你输了'
                }

                resolve();
            }, 500)

        })
    }
)
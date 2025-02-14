const EventEmitter = require('events').EventEmitter;

class Geektime extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('newLesson', { price: Math.random() * 100 })
        }, 3000)
    }
}

const geekTime = new Geektime();
module.exports = geekTime;
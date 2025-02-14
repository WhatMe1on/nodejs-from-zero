const geekTime = require('./timerlib.js');

geekTime.addListener('newLesson', (res) => {
    if (res.price < 70) {
        console.log('buy it', res)
    } else {
        console.log('yeah!', res)
    }

})
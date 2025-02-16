
(async function () {
    try {
        await Promise.all([interview(1), interview(2)])
    } catch (e) {
        return console.log('cry at ' + e.name)
    }

    function interview(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    resolve('success');
                } else {
                    var err = new Error('fail');
                    err.name = name;
                    reject(err);
                }
            }, 500)
        })
    }
})();
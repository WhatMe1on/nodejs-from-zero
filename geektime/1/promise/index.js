(function () {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject(new Error('3'));
        }, 300)
    }).then(function (res) {
    }).catch(function (err) {
        console.log(err)
    });

    console.log(promise)

    setTimeout(() => {
        console.log(promise);
    }, 800)
})();

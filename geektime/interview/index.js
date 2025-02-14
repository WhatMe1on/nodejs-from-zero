
interview(function (res) {
    if (res) {
        console.log(res)
    } else {
        console.log('xiao')
    }
})


function interview(callback) {
    setTimeout(() => {
        if (Math.random() < 0.3) {
            callback(null, 'success');
        } else {
            callback(new Error('fail'));
        }
    }, 500)
}
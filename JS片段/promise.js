function asyncFunction(){
    return new Promise(function(reslove, reject){
        setTimeout(function(){
            resolve('Async Hello world');
        }, 16)
    })
}


asyncFunction().then(function(value) {
    console.log(value);
}).catch(function(error) {
    console.log(error);
})


function getURL (URL) {
    return new Promise(function(reslove, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function(){
            if(req.status === 200){
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(new Error(req.statusText))
        };

        req.send();
    })
}

var URL = "http: //httpbin.org/get";

getURL(URL).then(function onFulfilled(value){
    console.log(value);
}).catch(function onRejected(error){
    console.log(error);
})
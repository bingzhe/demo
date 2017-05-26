// var promise = new Promise(function (resolve, reject) {
//     if (1) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// });

// promise.then(function (value) {

// }, function (error) {

// });

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     });
// }

// timeout(100).then((value) => {
//     console.log(value);
// })

// let promise = new Promise(function (resolve, reject) {
//     console.log('Promise');
//     resolve();
// })

// promise.then(function () {
//     console.log('Resolved');
// })

// console.log('Hi!');

// function loadImageAsync(url) {
//     return new Promise(function(resolvu,reject){
//         var image = new Image();
//         image.onload = function(){
//             resolve(image);
//         };
//         image.onerror = function(){
//             reject(new Error('Could nor load image at' + url));
//         };
//         image.src = url;
//     });
// }

var getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();


        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };

        return promise;
    });

    return promise;
};


getJSON("/posts.json").then(function (json) {
    console.log('Contents:' + json);
}, function (error) {
    console.log("出错了", error)
});


var p1 = new Promise(function(resolve, reject) {

});

var p2 = new Promise(function(resolve, reject){
    resolve(p1);
});




var p1 = new Promise(function(resolve, feject) {
    setTimeout(() => reject(new Error('fail')), 3000)
});

var p2 = new Promise(function (resolve, reject){
    setTimeout(() => resolve(p1), 1000)
});

p2.then(result => console.log(result))
.catch(error => console.log(error))


getJSON("/posts.json").then(function(){
    return json.post;
}).then(function(post){

});

getJSON("/post/1.json").then(function(post){
    return getJSON(post.commentURL);
}).then(function funcA(comments){
    console.log("Resolved: ", comments);
}, function funcB(){
    console.log("Rejected: ", err)
});
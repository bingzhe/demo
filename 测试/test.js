// var num = 0,
//     max = 10,
//     intervalId = null;

// function incrementNumber() {
//     num++;
//     console.log(num);

//     if (num === max) {
//         clearInterval(intervalId);
//         console.log("done");
//     }
// }

// setInterval(incrementNumber, 500);


var num = 0,
    max = 10;

function incrementNumber() {
    num++;
    console.log(num);

    if (num < max) {
        setTimeout(incrementNumber, 1000);
    } else {
        console.log("done");
    }
}

setTimeout(incrementNumber, 1000);
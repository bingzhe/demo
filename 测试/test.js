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


// var num = 0,

// function findLongestWord(str) {
//     var arr = str.split(" ");
//     var len = arr.length;
//     var num = 0;

//     for (var i = 0; i < len; i++) {
//         if (arr[i].length > num) {
//             num = arr[i].length;
//         }
//     }
//     // 请把你的代码写在这里
//     return num;
// }

// findLongestWord("The quick brown fox jumped over the lazy dog");

// function titleCase(str) {
//     var arr = str.split(" ");

//     var str1 = arr.map(function(str) {
//         var str2 = str.toLowerCase();

//         return str2.charAt(0).toUpperCase() + str2.slice(1);


//     }).join(" ");
//     // 请把你的代码写在这里
//     // return str;
// }

// titleCase("I'm a little tea pot");

function largestOfFour(arr) {
    return arr.map(function(arr) {
        var num = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > num) {
                num = arr[i];
            }
        }
        return num;
    });
    // 请把你的代码写在这里
    return arr;
}

largestOfFour([
    [4, 5, 1, 3],
    [13, 27, 18, 26],
    [32, 35, 37, 39],
    [1000, 1001, 857, 1]
]);
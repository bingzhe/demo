var fs = require("fs");

// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log( __filename );
// console.log( __dirname );
// console.log("程序执行结束");

// console.log("准备打开文件!");
// fs.stat('input.txt', function (err, stats) {
//     if (err) {
//         return console.error(err);
//     }

//     console.log(stats);

//     console.log("文件打开成功");

//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });



// fs.writeFile('input.txt', '我是通过写入添加的内容ssssssssssss', function (err) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("数据写入成功!");

//     fs.readFile('input.txt', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }

//         console.log("异步读取数据： " + data.toString());
//     })


// })

// fs.readFile('input.txt', function (err, data) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("异步读取数据： " + data.toString());
// });


fs.unlink('input.txt', function(err){
    if (err ) {
        return console.log(err);

    }

    console.log("已经删除！");
});
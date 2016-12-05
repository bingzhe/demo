/*
写一个函数getIntv，获取从当前时间到指定日期的间隔时间
function getIntv(str){
 var distence = Date.parse(str) - Date.now();
 var day = Math.floor(distence/1000/3600/24);
 var hour = Math.floor((distence/1000-day*3600*24)/3600);
 var min = Math.floor((distence/1000-day*3600*24-hour*3600)/60);
 var sec = Math.ceil(distence/1000-day*3600*24-hour*3600-min*60);
 return "距离2017年春节还有" + day + "天" + hour + "小时" + min + "分" + sec + "秒";
}
var str = getIntv("2017-1-17");
console.log(str);
*/
/*************************************/
/*把数字日期改成中文日期
function getChsDate(str){
  var date = new Date(str);
  var year = date.getFullYear().toString(),
      month = date.getMonth(),
      day = date.getDate();
  var arr = ['零','一','二','三','四','五','六','七','八','九','十','十一','十二','十三',
  '十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四',
  '二十五','二十六','二十七','二十八','二十九','三十','三十一'];
  var chsYear = "";
  for (var i = 0; i < year.length; i++) {
    chsYear += arr[year[i]];
  }
  chsDate = chsYear + "年" + arr[month + 1] + "月" + arr[day] + "日";
  return chsDate;
}
var str = getChsDate('2016-7-26');
console.log(str);
*/
/*************************************/
/*写一个函数获取n天前的日期
function getLastNDays(val){
  var lastNDays = new Date(Date.now()-val*24*3600*1000);
  var str = lastNDays.getFullYear() + "-" + lastNDays.getMonth() + "-" + lastNDays.getDate();
  return str
}
var lastWeek = getLastNDays(7);
console.log(lastWeek);
var lastMonth = getLastNDays(30);
console.log(lastMonth);
*/
/*************************************/
/*获取执行时间
var RunTime =(function() {
  var startTime, endTime;
  return {
    start:function(){
      startTime = Date.now();
    },
    end:function(){
      endTime = Date.now();
    },
    get:function(){
      return endTime - startTime;
    }
  };
}());
RunTime.start();
for (var i = 0; i < 10000; i++) {
  console.log(i);
}
RunTime.end();
console.log( RunTime.get() );
*/
/*************************************/
/*楼梯有200级，每次走1级或是2级，从底走到顶一共有多少种走法？用代码（递归）实现
function fn(num){
  var res = 0;
  if (num===1) {
    res = 1;
  }else if (num===2) {
    res = 2;
  }else {
    res = fn(num-1)+fn(num-2);
  }
  return res;
}
fn(200);
逻辑还不是很清楚。
*/
/*************************************/
/*js对象深拷贝
var json = {
  "name" : "xiaoming",
  "sex" : "male",
  "age" : 25,
  "friends" : {
    "xiaohong" : {
      "sex" : "female",
      "age" : 25
    },
    "xiaoli" : {
      "sex" : "male",
      "age" : 25
    }
  }
}

function copyJson(json){
 var copy= {};
 for (var i in json ) {
   if (typeof json[i] === "object") {
     copy[i] = copyJson(json[i]);
   }else {
     copy[i] = json[i];
   }
 }
 return copy;
}
var json2 = copyJson(json);

console.log(json2);
*/

/*下面的代码输出多少？修改代码让fnArr[i]()输出i,使用两种以上的方法。
var fnArr = [];
for (var i = 0; i < 10; i++) {
  fnArr[i] = function(){
    return i;
  };
}
console.log( fnArr[3]() );
*/

/* 方法一
var fnArr = [];
for (var i = 0; i < 10; i++) {
  (function(){
    var n = i;
    fnArr[i] = function(){
      return n;
    }
  })();
}
console.log( fnArr[3]() );
*/
/* 方法2
var fnArr = [];
for (var i = 0; i < 10; i++) {
  fnArr[i] = (function(i){
    return function(){ return i; };
  })(i);
}
console.log( fnArr[4]() );
*/
/********************************************************/

/* 使用闭包封装一个汽车对象，可以通过如下方式获取汽车的状态
var Car = //todo;
Car.setSpeed(30);
Car.getSpeed(); //30
Car.accrlerate();
Car.getSpeed(); //40
Car.decelerate();
Car.decelerate();
Car.getSpeed();
Car.getStatus();
Car.decelerate();
Car.decelerate();
Car.getStatus();

var Car = carSet();
function carSet(){
  var speed = 0;
  function setSpeed(num){
    speed = num;
  }
  function getSpeed(){
    console.log(speed);
  }
  function accelerate(){
    speed += 10;
  }
  function decelerate(){
    speed -= 10;
  }
  function getStatus(){
    if (speed === 0) {
      console.log("stop");
    }
    else {
      console.log("running");
    }
  }
  return {
    setSpeed:setSpeed,
    getSpeed:getSpeed,
    accelerate:accelerate,
    decelerate:decelerate,
    getStatus:getStatus
  }
}
Car.setSpeed(30);
Car.getSpeed(); //30
Car.accelerate();
Car.getSpeed(); //40
Car.decelerate();
Car.decelerate();
Car.getSpeed(); //20
Car.getStatus(); //running
Car.decelerate();
Car.decelerate();
Car.getStatus(); //stop
*/
/********************************************************/
/*写一个函数使用setTimeout模拟setInterval的功能
var i =0;
function inter(){
  setTimeout(function(){console.log(i++);inter();}),1000
}
*/
/********************************************************/
/*写一个函数，计算setTimeout最小时间粒度
var i = 0;
var start = Date.now();
function getmin(){
 var clock = setTimeout(function(){
   i++;
   if (i === 1000) {
     clearTimeout(clock);
     var end = Date.now();
     console.log((end-start)/i);
   }
   clock = setTimeout(arguments.callee,0);
 },0);
}
getmin();
*/
/********************************************************/
/*下面这段代码输出结果是什么？为什么？
var a = 1;
setTimeout(function(){
  a = 2;
  console.log(a);
},0);
var a;
console.log(a);
a = 3;
console.log(a);

//输出结果：1
           3
           2
setTimeout和setInterval 的运行机制是，讲代码一处本次执行队列，执行队列都结束后，在执行
setTimeout和senInterval
*/
/********************************************************/
/*下面这段代码输出的结果是？为什么？
var flag = true;
setTimeout(function(){
  flag = false;
},0)
while(flag){}
console.log(flag);

无限循环，没有输出
setTimeout被放在最后执行，while(flag)永远执行
*/
/********************************************************/
/*下面代码输出？如何输出delayer:0,delayer:1...
for (var i = 0; i < 5; i++) {
  setTimeout(function(){console.log(
    "delayer:"+ i);
  },0);
  console.log(i);
}
输出：0
1
2
3
4
delayer:5 输出5次
*/
for (var i = 0; i < 5; i++) {
  (function(){
    var n = i;
    setTimeout(function(){console.log(
      "delayer:"+ n);
    },0);
    console.log(i);
  })();
}

function getInfo(name,age,sex){
  console.log("name:",name);
  console.log("age:",age);
  console.log("sex:",sex);
  console.log(arguments);
  arguments[0] = "valley";
  console.log("name:",name);
}

getInfo('hunger',28,'男');
/*
  name:hunger
  age:28
  sex:男
  ["hunger",28,"男"]
  name:valley
*/
getInfo('hunger',28);
/*
  name:hunger
  age:28
  sex:undefined
  ["hunger",28]
  name:vally
*/
getInfo('男');
/*
  name:男
  age:undefined
  sex:undefined
  ["男"]
  name:valley
*/


function sumOfSquares(){
  var sum = 0
  for(var i=0;i<arguments.length;i++){
    sum += arguments[i]*arguments[i];
  }
  console.log(sum);
}
sumOfSquares(2,3,4);
sumOfSquares(1,3);

console.log(a); //undefined
var a = 1;
console.log(b); //报错，b is not defined;
/*
  由于变量的声明提升，所以在这段代码执行之前，先声明var a,在打印a，在
  给a赋值，在打印b，所以有上面的结果。
*/


sayName('world'); //hello world
sayAge(10);       //TypeError:undefined is not a function
function sayName(name){
 console.log('hello ',name);
}
var sayAge = function(age){
  console.log(age);
};
/*
  函数声明语句会前置，所以在声明语句之前调用也可以，而函数表达式只是var sayAge;声明提升了，
  此时函数还没有赋给他，还不是函数，所以调用的时候会报错。
*/

function fn(){}
var fn = 3;
console.log(fn);//3
/*
变量提升var fn;提升至最前,然后声明fn为函数,再将3赋值fn覆盖了函数。
*/

function fn(fn2){
  console.log(fn2);
  var fn2 =3;
  console.log(fn2);
  console.log(fn);
  function fn2(){
    console.log('fnnn2');
  }
}
fn(10);

/*
依次输出：
function fn2(){
 console.log('fnnn2');
}
**********
3
**********
function fn(fn2){
console.log(fn2);
var fn2 =3;
console.log(fn2);
console.log(fn);
function fn2(){
 console.log('fnnn2');
}
}
原因：
由于变量声明提升和函数声明前置，代码执行顺序会变成这样
function fn(fn2){
  var fn2;                  声明变量，此时fn2为传入的参数10
  function fn2(){           fn2声明为函数，覆盖掉10
  console.log('fnnn2');
}
  console.log(fn2);         输出fn2 为函数
  fn2 =3;                   赋值3，覆盖掉函数
  console.log(fn2);         输出3
  console.log(fn);          输出函数fn
}
fn(10);
*/



var fn = 1;
function fn(fn){
  console.log(fn);
}
console.log(fn(fn));  //TypeError:number is not a function
/*
  代码执行顺序为：
  var fn;
  function fn(fn){
    console.log(fn);
}
  fn = 1;   fn不是函数，所以输出报错。
*/

console.log(j);  //undefined  声明提升，未赋值
console.log(i);  //undefined  声明提升，未赋值
for(var i=10; i<10; i++){
  var j = 100;
}
console.log(i);  //10
console.log(j);  //100


fn();
var i = 10;
var fn = 20;
console.log(i);
function fn(){
  console.log(i);
  var i = 99;
  fn2();
  console.log(i);
  function fn2(){
    i = 100;
  }
}
/*
输出结果：
undefined
100
10
代码的执行顺序：
var i;
var fn;              变量声明提升
function fn(){       函数声明前置
  var i;             函数中的变量声明提升
  function fn2(){            函数声明前置
    i = 100;
  }
  console.log(i);      i 未赋值；undefined
  i = 99;              i赋值99
  fn2();               执行fn2(),i赋值100
  console.log(i);       100
}
fn();                   执行函数fn();
i = 10;
fn = 20;
console.log(i);           i为10
*/

var say = 0;
(function say(n){
  console.log(n);
  if(n<3) return;
  say(n-1);
}( 10 ));      //立即执行函数，n=2时跳出函数,不影响后续代码。
console.log(say);   //0
/*
输出结果：
10
9
8
7
6
5
4
3
2
0
*/

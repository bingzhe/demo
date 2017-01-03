function isNumber(el){
  return typeof(el) === "number";
}
function isString(el){
  return typeof(el) === "string";
}
function isBoolean(el){
  return typeof(el) === "boolean";
}
function isFunction(el){
  return typeof(el) === "function"
}
var a = 2;
    b = "jirengu";
    c = false;
alert( isNumber(a));       //true
alert( isString(a));       //false
alert( isString(b));       //true
alert( isBoolean(c));      //true
alert( isFunction(a));     //false
alert( isFunction(isNumber));//true

console.log(1 + 1);    //2
console.log("2"+"4");  //24
console.log(2+"4");    //24
console.log(+new Date()); //1468288803278
console.log(-"4");  //-4 只有右侧有数字或者字符串，且在  字符串为十进制数时，返回（+/-）+数字

var a = 1;
a+++a; //3  相当于（a++)+a  先自增，在加上a。
typeof a+2; //number2   typeof的优先级高于加法运算，所以先typeof a,在加法运算。

var arr = [3,4,5]
for (var i=0;i<arr.length;i++){
 console.log(arr[i]*arr[i])
}                 //9,16,25


var obj = {
  name:'hunger',
  sex:'male',
  age:28                            //name:hunger
}                                   //sex:male
for(var p in obj){                  //age:28
  console.log(p+":"+obj[p])
}


console.log(a);  // undefined   运行过程中，变量提升，var a;会在程序一开始就运行，但不会赋值。
var a = 1;
console.log(a);  //1
console.log(b);  //ReferenceError: b is not defined
document.title = "新标题";

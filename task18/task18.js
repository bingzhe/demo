/*  用数组拼接出如下字符串
var prod = {
  name:'女装',
  style:['短款','冬季','春装']
};
function getTplStr(data){
  var arr = [];
  arr.push('<dl class="product">');
  arr.push('<dt>'+data.name+'</dt>');
  for (var i = 0; i < data.style.length; i++) {
    arr.push('<dd>'+data.style[i]+'</dd>');
  }
  arr.push('</dt>');
  return arr.join('  ');
};
var result = getTplStr(prod);
console.log(result);

<dl class="product">
    <dt>女装</dt>
    <dd>短款</dd>
    <dd>冬季</dd>
    <dd>春装</dd>
</dl>
*/
/*************************************************************************/
/*find函数
var arr = ["test", 2, 1.5, false]
function find(array, val){
  for (var i = 0; i < array.length; i++) {
    if (array[i] === val) {
      return i;
    }
  }
    return -1;
}

console.log(find(arr, "test")); // 0
console.log(find(arr, 2));      //1
console.log(find(arr, 1.5));    //2
console.log(find(arr, false));  //3
console.log(find(arr, 3));      //-1
*/
/*************************************************************************/
/* 写一个函数filterNumericInPlace
arr = ["a", "b", 1, 3, 4, 5, "b", 2];
function filterNumericInPlace(arr){
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
newArr = filterNumericInPlace(arr);
console.log(newArr)
*/
/*************************************************************************/
/*
var obj = {
  className: 'open menu'
}

addClass(obj, 'new') //obj.className='open menu new'
addClass(obj, 'open') //因为open已经存在，此操作无任何变化
addClass(obj, 'me') //obj.className='open menu new me'
console.log(obj.className) // 'open menu new me'

removeClass(obj, 'open') //obj.className='menu new me'
removeClass(obj, 'blabla') //不变

var obj = {
  className: 'open menu'
}

function addClass(obj,cls){
  var arr = obj.className.split(' ');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === cls) {
      return;
    }
  }
  arr.push(cls);
  obj.className = arr.join(' ');
}

function removeClass(obj,cls){
  var arr = obj .className.split(' ');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === cls) {
      arr.splice(i,1);
      i--;
    }
  }
  obj.className = arr.join(' ');
}
addClass(obj, 'new')
addClass(obj, 'open')
addClass(obj, 'me')
console.log(obj.className)

removeClass(obj, 'open')
removeClass(obj, 'blabla')
console.log(obj.className)

*/
/************************************************/
/*
function camelize(str){
  var arr = str.split('-');
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].substr(0,1).toUpperCase() + arr[i].substr(1);
  }
  var newStr = arr.join('');
  return newStr;
}
camelize('background-color') //backgroundColor
camelize('list-style-image') //listStyleImage
*/
/***************************************************/
/*
arr = ["a","b"];
arr.push(function(){alert(console.log('hello hunger valley'))});
arr[arr.length-1]()

控制台输出hello hunger valley 弹出undefined
1 arr.push()将一个函数加载数组最后边。
2 arr[arr.length-1]() 将这个函数调用。
3 函数在控制台打印 hello hunger valley, console.log()没有返回值，alert弹出undefined。
*/
/******************************************************/
/*写一个函数filterNumericInPlace，过滤数组中的数字，删除非数字
arr = ["a","b",1,3,4,5,"b",2];
function filterNumericInPlace(arr){
  for (var i = 0; i < arr.length; i++) {
    if (typeof(arr[i]) !== 'number') {
      arr.splice(i, 1);
      i--;
    }
  }
}
filterNumericInPlace(arr);
console.log(arr)
*/
/******************************************************/
/*写一个ageSort函数实现如下功能
var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob-small", age: 6 }
var people = [ john, mary, bob ]
ageSort(people) // [ bob, mary, john ]

var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob-small", age: 6 }
var people = [ john, mary, bob ]
function ageSort(people){
  people.sort(function(a,b){return a.age-b.age;});
}
ageSort(people);
console.log(people)
*/
/***************************************************8*/
/*
function filter(arr,func){
  for (var i = 0; i < arr.length; i++) {
    if (!func(arr[i])) {
      arr.splice(i,1);
      i--;
    }
  }
  return arr;
}
function isNumber(el){
  return typeof (el) === "number";
}
var arr = ["a",3,4,true,-1,2,"b"]
arr = filter(arr,isNumber); //arr = [3,4,,-1,2]
arr = filter(arr,function(val){ return val>0}); //arr = [3,4,2]
*/
/***************************************************/
/*写一个 ucFirst函数，返回第一个字母为大写的字符 （***）
function ucFirst(str){
  var newStr = str.slice(0,1).toUpperCase()+str.slice(1);
  return newStr;
}
console.log(ucFirst("hunger"))
*/
/*************************************************/
/*写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...
function truncate(str,maxlength){
  if (str.length > maxlength) {
    return str.slice(0,maxlength) + "...";
  }else {
    return str;
  }
}
console.log(truncate("hello, this is hunger valley,",10))
console.log(truncate("hello,world",20))
*/
/************************************************/
/*写一个函数limit2，保留数字小数点后两位，四舍五入
function limit2(num1){
  return Math.round(num1*100)/100;
}
var num1 = 3.456;
console.log(limit2(num1));
console.log(limit2(2.42));
*/
/************************************************/
/*写一个函数，获取从min到max之间的随机数，包括min不包括max
  写一个函数，获取从min都max之间的随机整数，包括min包括max
  写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机数

function getRandomArbitrary(min,max){
  return Math.random()*(max-min)+min;
}
console.log(getRandomArbitrary(2,9));

function getRandomInt(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
console.log(getRandomInt(2,9));
function getRandomArray(len,min,max){
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(Math.random()*(max-min+1)+min);
  }
  return arr;
}
console.log(getRandomArray(8,2,9))
*/

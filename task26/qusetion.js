/*
1. jquery中,$(document).ready()是什么意思？和window.onload的区别？还有什么其他的写法或者代替方法？
  jquery中$(document).ready()的意思：
  一个页面中DOM元素没有加载完时操作页面是不安全的，例如JS代码中有DOM操作，所以一般把<script>标签放在
  <body>标签的最下面。
  $(document).ready()的代码在页面中的DOM元素加载完执行，所以不管讲JS代码放在html页面那里，都可以把JS、
  代码放到最后去加载。
  设计$(document).ready()的目的是使$(document).ready()中的代码可以在DOM元素一加载完就执行，二不必
  等到页面上的元素全部加载完。
  $(doucment).ready()和window.onload的区别：
  1.$(document).ready()是DOM元素一加载完就执行，而不用等页面中的所有元素都加载完。
    window.onload是等到页面上的所有元素都加在完才执行，包括图片等。
  2.window.onload不能编写多个，如果有多个只会执行一个。
    $(document).ready()可以同时编写多个，并且都得到执行。
  3.window.onload没有简化写法，而$(document).ready(function(){})可以简写成$().ready(function(){});
  或者$(function(){});
  4.window.onload是JS的原生方法。
    $(document).ready(dunctin(){})是jquery中的特有方法。
*/
/*
2. $node.html()和$node.text()的区别？
  1.$node.html()获的元素节点的html内容，包括html标签。
    $node.text()获的元素节点的文本信息，不包括html标签。
  2.$node.html()中没有参数时，返回匹配元素集合的第一个匹配元素的html内容。
    $node.text()中没有参数时，返回匹配元素集合中每个元素的合并文本（删除html标签），包括后代。
  3.$node.html()有html字符串参数时，覆盖匹配元素集合中的每个匹配元素。
    $node.text()有文本参数时，覆盖匹配元素集合中的每个匹配元素。
*/
/*
3. $.extend的作用和用法？
  jquery.extend()用于将一个或多个对象的内容合并到目标对象：
  $.extend(target [,object1] [,objectN]);
  是否深度合并：
  $.extend([deep] ,target [,object1] [,objectN]);
  1.deep可选。Boolean类型，指示是否深度合并对象，默认是false,如果该值为true,且多个对象的某个同名
  属性也是对象，则该属性对象的属性也进行合并。
  2.如果$.extend()只有一个参数，则意味着参数target被省略，target就是jquery对象本身。通过这种方式
  何以为全局对象jqery添加新的函数。
  3.如果多个对象有同名对象，则后面的覆盖前面的。
*/
/*
4. jquery的链式调用是什么？
  jquery对象的方法的返回值仍然是当前对象，可以继续调用该对象的jquery方法，提高代码效率，更优雅
  $node.addClass('selected').sibings().removeClass('selected').hide();
*/
/*
5. jquery ajax 中的缓存怎样控制？
  ajax中的缓存是指，当使用ajax提交数据时，会发现提交的数据都一样，刷新也无法解决。这是因为数据是
  使用了缓存中的数据。
  传入参数中的cache可以控制缓存。cache(默认为true,dataType为'script'和'jsonp'时默认为false):
  如果设置为false，浏览器将不会缓存该页面。注意：只有当使用设置为GET方法，设置cache为false是有用的，
  设置cache为false将在HEAD和GET请求中正常工作，相当于在在GET请求参数中附加"={timestamp}",这样
  每次发起请求都会加上新的时间戳而形成新的请求并由后台相应，不会从本地缓存中查找。二当使用POST方法
  时，则每次都会被认为是新的请求，而不会缓存页面。
  如果想取消缓存，那么每次提交的URL不一样就行了，比如在URL后面+随机数，或者加上时间戳：
  $.ajax({
    data:"xxx",
    url:"aaa.php?"+Math.random() // 或者+new Data()
  });
  或者将jquery ajax 中的cache设置为false:
  $.data({
    data:"xxx",
    url:"aaa.php?",
    cache:false
  });
*/
/*
6. jquery中data函数的作用？
  data([key],[value])作用：在元素上存放数据，返回jquery对象。
  参数：key:储存的数据名，value:讲要储存的任意数据。
  data([key]):返回匹配的元素集合中的第一个元素的给定名称的数据储存的值。
*/
//常用的jquery方法
//1.给元素 $node 添加 class active，给元素 $noed 删除 class active
$node.addClass('active');
$node.removeClass('active');
//2.展示元素$node, 隐藏元素$node
$node.show();
$node.hide();
//3.获取元素$node 的 属性: id、src、title， 修改以上属性
$node.attr('id');$node.attr('id','xxx');
$node.attr('src');$node.attr('src','xxx');
$node.attr('title');$node.attr('title','xxx');
//4.给$node 添加自定义属性data-src
$node.data('data-src','xxx');
//5.在$ct 内部最开头添加元素$node
$ct.prepend($node);
//6.在$ct 内部最末尾添加元素$node
$ct.append($node);
//7.删除$node
$node.remove();
//8.把$ct里内容清空
$ct.empty();
//9.在$ct 里设置 html <div class="btn"></div>
$ct.html("<div class="btn"></div>");
//10.获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
$node.width();$node.height();   //内容 宽度和高度
$node.innerWidth();$node.innerHeight(); //内容+两边padding 宽度和高度
$node.outerWidth();$node.outerHeight(); //内容+两边padding+两边border 的宽度和高度
$node.outerWidth(true);$node.outerHeight(true); //内容+两边padding+两边border+两边margin 的宽度和高度
$node.width("60px");$node.height("60px");   //设置 内容 宽度和高度
$node.innerWidth("60px");$node.innerHeight("60px"); //设置 内容+两边padding 宽度和高度
$node.outerWidth("60px");$node.outerHeight("60px"); //设置 内容+两边padding+两边border 的宽度和高度
//11.获取窗口滚动条垂直滚动距离
scrollY; //垂直滚动距离
scrollX; //水平滚动距离
//12.获取$node 到根节点水平、垂直偏移距离
//该偏移距离是以border的左上角为基础
$node.setoff().left;  //水平偏移距离
$node.setoff().top;   //垂直偏移距离
//13.修改$node 的样式，字体颜色设置红色，字体大小设置14px
$node.css({
  'color':'red',
  'font-size':'14px'
});
//14.遍历节点，把每个节点里面的文本内容重复一遍
$node.each();
//15.从$ct 里查找 class 为 .item的子元素
$ct.find('.item');
//16.获取$ct 里面的所有孩子
$ct.children();
//17.对于$node，向上找到 class 为.ct的父亲，在从该父亲找到.panel的孩子
$node.parent('.ct').find('.panel');
//18.获取选择元素的数量
.length;
//19.获取当前元素在兄弟中的排行
.index();

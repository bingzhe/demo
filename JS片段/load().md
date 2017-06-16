## load()方法
load()方法分为jQuery Ajax方法和jQuery 事件方法

### jQuery Ajax 的 load();
```
load(url, [data], [callback])
```
从服务器加载数据并将返回的HTML放入匹配的元素。
* url 待装入 HTML 网页网址。
* 发送至服务器的 key/value 数据。在jQuery 1.3中也可以接受一个字符串了。
* 载入成功时回调函数。

示例：
```
$(".flyer-layout-content").load("feeds.html");
// 加载 feeds.html 文件内容。

$( "#result" ).load( "ajax/test.html", function() {
  alert( "Load was performed." );
});
// 回调函数

$( "#feeds" ).load( "feeds.php", { limit: 25 }, function() {
  alert( "The last 25 entries in the feed have been loaded" );
});
//向服务器发出附加参数，并在服务器响应完成时执行回调
```

### jQuery 事件的 load();
当指定的元素（及子元素）已加载时，会发生 load() 事件。
是这个的快捷方式 ```.on( "load", handler ).```

示例： 
```
$( window ).load(function() {
  // code
});

$( "img.userIcon" ).load(function() {
  if ( $( this ).height() > 100) {
    $( this ).addClass( "bigImg" );
  }
});
```

参考： 

<http://api.jquery.com/load-event/>

<http://api.jquery.com/load/>

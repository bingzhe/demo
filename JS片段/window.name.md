## window.name 传输技术的基本原理

当在浏览器中打开一个页面，或者在页面中添加一个iframe时即会创建一个对应的window对象，当页面加载另一个新的页面时，window的name属性是不会变的。这样就可以利用在页面动态添加一个iframe然后src加载数据页面，在数据页面将需要的数据赋值给window.name。然而此时承载iframe的parent页面还是不能直接访问，不在同一域下iframe的name属性，这时只需要将iframe再加载一个与承载页面同域的空白页面，即可对window.name进行数据读取

## 示例

有三个页面：

a.com/app.html：应用页面。
a.com/proxy.html：代理文件，一般是一个没有任何内容的html文件，需要和应用页面在同一域下。
b.com/data.html：应用页面需要获取数据的页面，可称为数据页面。

步骤：
1. 在应用页面（a.com/app.html）中创建一个iframe，把其src指向数据页面（b.com/data.html）。数据页面会把数据附加到这个iframe的window.name上，data.html代码如下

``` js
<script type="text/javascript">
    window.name = 'I was there!';    // 这里是要传输的数据，大小一般为2M，IE和firefox下可以大至32M左右
                                     // 数据格式可以自定义，如json、字符串
</script>
```

2. 在应用页面（a.com/app.html）中监听iframe的onload事件，在此事件中设置这个iframe的src指向本地域的代理文件（代理文件和应用页面在同一域下，所以可以相互通信）。app.html部分代码如下：

``` js
<script type="text/javascript">
    var state = 0, 
    iframe = document.createElement('iframe'),
    loadfn = function() {
        if (state === 1) {
            var data = iframe.contentWindow.name;    // 读取数据
            alert(data);    //弹出'I was there!'
        } else if (state === 0) {
            state = 1;
            iframe.contentWindow.location = "http://a.com/proxy.html";    // 设置的代理文件
        }  
    };
    iframe.src = 'http://b.com/data.html';
    if (iframe.attachEvent) {
        iframe.attachEvent('onload', loadfn);
    } else {
        iframe.onload  = loadfn;
    }
    document.body.appendChild(iframe);
</script>
```

3. 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）。
``` js
script type="text/javascript">
    iframe.contentWindow.document.write('');
    iframe.contentWindow.close();
    document.body.removeChild(iframe);
</script>
```
看了vue好长时间了，总结下vue的生命周期，以备以后查询。

在Vue的整个生命周期中，它提供了一系列的事件，可以让我们注册js方法，可以让我们达到控制整个过程的目的地，在这些事件响应方法中的this直接指向的是vue的实例。

这是一张官网上的生命周期图

![生命周期](images/lifecycle.png)


* `beforeCreate`

在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

* `created`

实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

* `beforeMount`

在挂载开始之前被调用：相关的 render 函数首次被调用。

* `mounted`

el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。

* `beforeUpdate`

数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

*  `destroyed`

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

* `activated`

keep-alive 组件激活时调用,该钩子在服务器端渲染期间不被调用。

* `deactivated`

keep-alive 组件停用时调用,该钩子在服务器端渲染期间不被调用。


### 示例

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <p>{{ number }}</p>
        <input type="text" name="btnSetNumber" v-model="number" />
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                number: 1
            },
            beforeCreate: function () {
                console.log('beforeCreate 钩子执行..........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            created: function () {
                console.log('created 钩子执行...........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            beforeMount: function () {
                console.log('beforeMount 钩子执行...........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            mounted: function () {
                console.log('mounted 钩子执行...........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            beforeUpdate: function () {
                console.log('beforeUpdate 钩子执行..........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            updated: function () {
                console.log('updated 钩子执行...........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            beforeDestroy: function () {
                console.log('beforeDestroy 钩子执行........................')
                console.log('el:     ' + this.$el)
                console.log('data:   ' + this.$data)
                console.log('number:   ' + this.number)
            },
            destroyed: function () {
                console.log('destroyed 钩子执行........................')
                console.log('el:     ' + this.el)
                console.log('data:   ' + this.data)
                console.log('number:   ' + this.number)
            }
        })
    </script>
</body>
</html>
```

create 和 mounted 相关

![](images/dayin.png)

update 相关

修改输入框数组
![](images/dayin1.png)

destroy 相关

![](images/dayin2.png)


### 参考

[https://cn.vuejs.org/v2/guide/instance.html#生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)

[https://cn.vuejs.org/v2/api/#deactivated](https://cn.vuejs.org/v2/api/#deactivated)

[(https://segmentfault.com/a/1190000008010666](https://segmentfault.com/a/1190000008010666)
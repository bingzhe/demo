数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是 attribute，我们可以用 v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时，Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

## 绑定HTML Class

#### 对象语法

我们可以传给v-bind:class一个对象，以动态的切换class,v-bind:class可以和普通的class属性共存

```
<div class="static" :class="{'class-a': isA, 'class-b': isB}"><div>

data: {
    isA: true,
    isB: false
}
```

渲染为： 

```
<div class="static class-a">
```

当isA,isB变化时class将相应的更新

也可以直接绑定数据里的一个对象

```
<div :class="classObj"></div>

data: {
    classObj: {
        'class-a': true,
        active: false
    }
}
```

也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式

```
<div :class="classObj"></div>

data: {
    isActive: true,
    error: null
},
computed: {
    classObj: function(){
        return {
            active: this.isActive && !this.error,
            'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}
```

### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

```
<div v-bind:class="[activeClass, errorClass]">

data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}

//渲染为
<div class="active text-danger"></div>

//三元表达式
<div :class=[isActive?activeClass:'', errorClass]>

//对象语法
<div v-bind:class="[{ active: isActive }, errorClass]">
```
组件上也同样可以使用

## 绑定内联样式

### 对象语法

v-bind:style 的对象语法十分直观——看着非常像 CSS，其实它是一个 JavaScript 对象。CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
 
data: {
 activeColor: 'red',
 fontSize: 30
}
```

直接绑定到一个样式对象通常更好，让模板更清晰

```
<div v-bind:style="styleObject"></div>
 
data: {
 styleObject: {
 color: 'red',
 fontSize: '13px'
 }
}
```

### 数组语法

```
<div v-bind:style="[baseStyles, overridingStyles]">
```

vue-cli构建的项目中也可以使用css的预处理器，需要安装匹配的loader

.vue文件中，vue-loader 允许你使用其它 Webpack loaders 处理 Vue 组件的某一部分。它会根据 lang 属性自动推断出要使用的 loaders。

安装编译sass需要的loader

```
npm install sass-loader node-sass --save
```

vue文件中写法

``` css
<style lang="sass" scoped>
  /* write sass here */
</style>
```

sass-loader警告

与名称相反，sass-loader 默认解析 SCSS 语法。如果你想要使用 SASS 语法，你需要配置 vue-loader 的选项：
打开webpack.base.config.js在loaders里面加上

``` javascript
{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
    }
  }
}
```

这样就可以在项目中使用sass语法了

![](./images/sass1.png)
![](./images/sass2.png)
https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html
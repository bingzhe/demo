/**
 * tab组件
 */


(function (global, $, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {

        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("该插件需要在支持document的渲染环境上.");
            } else if (!$) {
                throw new Error("该插件需要在支持加载了jQuery类库的渲染环境上.");
            }
            return factory(w);
        };

    } else {
        factory(global, $);
    }

})(typeof window !== "undefined" ? window : this, jQuery, function (window, $, noGlobal) {
    //定义一个Tab 页签组件
    // selector 分页组件完成后要装入的容器
    // options 分页组件时要定制的属性
    function Tab(selector, options) {
        return this.init(selector, options);
    }
    //定义tab页签的样式集合

    var styles = ['flyer-tab', 'flyer-tab-title', 'flyer-tab-content', 'flyer-tab-active', 'flyer-tab-item', 'active'];

    //默认的定制属性集合
    Tab.DEFAULT = {
        //类型： Array, tab页签的标题
        tabs: [{
                //类型: String ,单个页签的标题
                title: "tab1",

                //类型: String ,单个页签对应的内容
                content: "",

                //类型: String ,单个页签对应的请求路径
                url: "",

                //类型: Boolean ,是否缓存
                cache: false
            },
            {
                //类型: String ,单个页签的标题
                title: "tab2",

                //类型: String ,单个页签对应的内容
                content: "",

                //类型: String ,单个页签对应的请求路径
                url: "",

                //类型: Boolean ,是否缓存
                cache: false
            }
        ],
        //是否缓存,这里的是否缓存区别于单个，该缓存设置是所有的页签都缓存
        //单个页签的缓存优先级高于全局的缓存设置
        //cache: false,
    }
});
/**分页组件 */
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
    //定义一个分页组件
    // elm 分页组件完成后要装入的容器
    // opts 分页组件要定制的属性

    function pager(ele, opts) {
        return this.init(elm, opts);
    }

    //可定制的属性集
    pager.DEFAULTS = {
        //调用 API 的数据接口
        ajax: {
            //发送请求地址，默认为NULL
            URL: null,
            //待发送 Key / value 参数
            data: null
        },

        //类型:Array , 要传入的 JSON DATA, 默认为 NULL
        data: [],

        //类型:Int ,当前的页，默认值为 1
        curIndex: 1,

        //类型:Int ,起始页，默认值为 1
        pageIndex: 1,

        //类型:Int ,每页显示的大小
        pageSize: 5,

        //类型:String ,上一页显示的内容
        prevText: "",

        //类型:String ,下一页显示的内容
        nextText: "",

        //类型:Int ,数据总记录
        totalNum: 0,

        //类型:Int ,显示的长度
        pagerLen: 5,

        //类型:Int ,总页数值
        pageSum: 0,

        //类型:Boolean ,是否重新渲染分页，默认值为false
        isReload: false,

        //类型:Function ,点击翻页之前事件
        fnBeforeClick: function () {
            return false;
        },
        //类型:Function ,点击翻页事件
        fnClick: function () {
            return false;
        },
        //类型:Function ,点击翻页之后事件
        fnAfterClick: function () {
            return false;
        },
    }

    pager.prototype = {
        //加载分页控件
        init: function (elm, opts) {
            this.options = this.getOptions(opts);
            this[0] = elm;
            this.render();
        },
        //渲染分页控件
        render: function () {
            var _this = this,
                opts = _this.options,
                ajax = _this.ajax;

            //总页值
            opts.pageSum = Math.ceil(opts.totalNum / opts.pageSize);


        },

        //得到配置属性对象
        getOptions: function (opts) {
            return $.extend(true, {}, pager.DEFAULTS, opts);
        },

        //重新渲染
        reload: function () {
            this.render();
        },

        //分页控件模板
        template: function () {
            var tmplHtml = "<div class=\"flyer-pager-wrapper\"><div class=\"flyer-pager-view\"><ul>",
                opts = this.options,
                // 前后的间隔值
                space = Math.floor((opts.pagerLen - 2) / 2),
                space = space == 0 ? 1 : space,
                //起始页码值
                i = opts.curIndex < opts.pagerLen ? opts.pageIndex : opts.curIndex - space,
                //结束页码值
                len = opts.curIndex < opts.pagerLen ? opts.pagerLen : opts.curIndex + space,

                if (opts.curIndex + space * 2 > opts.pageSum - 1) {
                    i = opts.pageSum - opts.pagerLen;
                    len = opts.pageSum;
                }
            //加载上一页按钮
            tmplHtml += "<li class=\"prev\">" + opts.prevText + "</li>";
            //判断当前最大页是否大于显示的长度
            if (opts.curIndex >= opts.pagerLen) {
                //加载首页按钮
                tmplHtml += "<li>" + opts.pageIndex + "</li>";

                //加载首页前的省略
                tmplHtml += "<li class=\"omit\">...</li>";
            }

            for (i; i <= len; i++) {
                if (opts.curIndex == i) {
                    tmplHtml += "<li class=\"active\">" + i + "</li>";
                } else {
                    tmplHtml += "<li>" + i + "</li>";
                }
            }

            if (opts.curIndex + space * 2 <= opts.pageSum - 1) {
                //加载尾页前省略
                tmplHtml += "<li class=\"omit\">...</li>";

                //加载尾页按钮
                tmplHtml += "<li>" + opts.pageSum + "</li>";
            }


            //加载下一页按钮
            tmplHtml += "<li class=\"next\">" + opts.nextText + "</li>";
            tmplHtml += "</ul></div></div>";

            return tmplHtml;
        }

    }
});
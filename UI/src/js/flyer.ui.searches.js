/***
 * 检索框组件
<div class="flyer-searches">
    <div class="keywords">
    <span>唐四少1;<i class="fa fa-close"></i></span>
    <span>唐四少123232;<i class="fa fa-close"></i></span>
    </div>
    <input type="text" class="flyer-seraches-input" id="txtSearch" />
    <div class="flyer-combobox-items" style="display:block">
        <ul>
            <li>
                <div>唐四少1</div>
            </li>
            <li>
                <div>唐四少2</div>
            </li>
            <li>
                <div>唐四少3</div>
            </li>
            <li>
                <div>唐四少4</div>
            </li>
        </ul>
    </div>
</div>
 ***/
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
    function Searches(selector, options) {
        return this.init(selector, options);
    }

    //定义 Tab 页签的样式集合
    var styles = ["flyer-searches", "keywords", "flyer-seraches-input", "fa fa-close", "flyer-combobox-items", "hover"];

    //默认的定制属性集合

    Searches.DEFAULT = {
        //类型:Boolean ,是否允许多个关键词查询，默认是允许的
        isMulti: ture,

        //类型:String ,请求数据的地址
        url: "",

        //类型:String ,对应的 Search Name名字
        searchName: "",

        //类型:String ,对应的数据主键值
        fieldValue: "",

        //类型:String ,显示的文本值
        fieldName: "",

        //类型:Array ,开放请求数据的方法
        requestData: [],

        //类型:Int ,事件响应的间隔时间,默认1秒
        spaceTime: 1000,

        //类型:String ,分隔符,默认;
        separtor: ";",

        //类型:Boolean ,是否去重
        distinck: true,

        //类型:String ,数据为空时的提示语句
        emptyMsg: "未检索到相关的数据..",

        //类型:Function ,是否去重相关的提示方法
        fnDistinckTips: function () {
            console.log("该项已经选中....");
        },

        //类型:Function ,开放一个数据结构处理的方法
        fnDataProcessing: function () {
            //this._data = this._data.rows;
        },

        //类型:Function ,选中之后的方法
        fnSelected: function () {
            return false;
        }

    }

    Searches.prototype = {

        //加载Searches 组件的入口

        init: function (elm, options) {

            this.options = $.extend(true, {}, Searches.DEFAULT, options);

            this[0] = elm;

            $(this[0]).html(this.template());

            this.events();

        },

        //html的模板
        template: function () {
            var tmplHtml = ['<div class="flyer-searches">',
                '<div class="keywords"></div>',
                '<input type="text" data-selected="" lass="flyer-seraches-input" />',
                '<div class="flyer-combobox-items">',
                '<ul>',
                '</ul>',
                '</div>',
                '</div>'    
            ]
            return tmplHtml.join("");
        },

        //获取数据源
        requestData: function(){
            var _this = this,
                opts = _this.options,
                data = {};

            //如果用户自定义了该方法，则优先运行自定义的方法
            if( typeof opts.requestData === "function"){
                opts.requestData.call(this, keyword);
            } else {
                data[opts.searchName] = keyword;
                $.ajax({
                    url: opts.url,
                    type: "get",
                    data: data,
                    success: function(data){
                        _this._data = data;
                        opts.fnDataProcessing.call(_this, data);
                        _this.render(data)
                        _this.eventSelected();
                    }
                });
            }
        },

        //事件集
        events: function(){
            var _this = this,
                opts = _this.options,
                timer = null;
            _this.keyIndex = -1;
            _this.$input = $(_this[0]).find("." + styles[2]);
            _this.$keywords = $(_this[0]).find("." + styles[1]);
            _this.$items = $(_this[0]).find("." + style[4]).find("ul");

            _this.$input.on("keyup", function(){
                
            })
        }
    }

    //定义成 jQuery 组件
    $.fn.searches = function (opts) {
        return this.each(function () {
            this.searches = new Searches(this, opts);
            return this;
        });
    }

    //定义成 flyer 内置模块
    flyer.define("searches", function (selector, options) {
        return new Searches(selector, options);
    })

})
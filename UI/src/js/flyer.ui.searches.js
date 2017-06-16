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
(function(global, $, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {

        module.exports = global.document ? factory(global, true) : function(w) {
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

})(typeof window !== "undefined" ? window : this, jQuery, function(window, $, noGlobal) {

    //定义一个Tab 页签组件
    // selector 分页组件完成后要装入的容器
    // options 分页组件时要定制的属性
    function Searches(selector, options){
        return this.init(selector, options);
    }

    //定义 Tab 页签的样式集合
    var styles = ["flyer-searches", "keywords", "flyer-seraches-input", "fa fa-close", "flyer-combobox-items", "hover"];

    //默认的定制属性集合
    

    //定义成 jQuery 组件
    $.fn.searches = function(opts) {
        return this.each(function() {
            this.searches = new Searches(this, opts);
            return this;
        });
    }

    //定义成 flyer 内置模块
    flyer.define("searches", function(selector, options) {
        return new Searches(selector, options);
    })

})
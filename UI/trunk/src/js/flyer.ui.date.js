/***
 *@Name: fiyer v1.0 日期控件
 *@Author: Ken（郑鹏飞)
 *@License：LGPL
<div class="flyer-date">
    <div class="flyer-date-header">
        <div class="flyer-date-year">
            <button class="prev"></button>
            <input type="text" class="flyer-year" readonly="true" value="2017年" />
            <button class="more"></button>
            <button class="next"></button>
            <div class="flyer-date-yearMore">
                <div class="prev-more"></div>
                <div class="years">
                    <span>2015</span><span>2016</span>
                    <span>2015</span><span>2016</span>
                    <span>2015</span><span>2016</span>
                    <span>2015</span><span>2016</span>
                    <span>2015</span><span>2016</span>
                    <span>2015</span><span>2016</span>
                </div>
                <div class="next-more"></div>
            </div>
        </div>
        <div class="flyer-date-month">
            <button class="prev"></button>
            <input type="text" class="flyer-month" readonly="true" value="06月" />
            <button class="more"></button>
            <button class="next"></button>
            <div class="flyer-date-monthMore">
                <span>01</span><span>02</span>
                <span>01</span><span>02</span>
                <span>01</span><span>02</span>
                <span>01</span><span>02</span>
                <span>01</span><span>02</span>
                <span>01</span><span>02</span>
            </div>
        </div>
    </div>
    <div class="flyer-date-body">
        <table>
            <thead>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
    <div class="flyer-date-footer">
        <div class="flyer-date-time">
            <label>时间</label>
            <span>14</span>:
            <span>48</span>:
            <span>22</span>
            <div class="flyer-date-hours">
                <div class="flyer-date-minTool">小时<span>x</span></div>
                <div class="flyer-hours">
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                </div>
            </div>
            <div class="flyer-date-minutes">
                <div class="flyer-date-minTool">小时<span>x</span></div>
                <div class="flyer-hours">
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                </div>
            </div>
            <div class="flyer-date-sconed">
                <div class="flyer-date-minTool">小时<span>x</span></div>
                <div class="flyer-hours">
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                    <span>01</span>
                </div>
            </div>
        </div>
        <div class="flyer-date-btn">
            <button>清空</button>
            <button>今天</button>
            <button>确认</button>
        </div>
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
            return factory(w, $);
        };

    } else {
        factory(global, $);
    }

})(typeof window !== "undefined" ? window : this, jQuery, function(window, $, noGlobal) {

    /*
     * 在这里写要实例插件的代码,定义的变量名以实际组件的名称为准
     */
    var Datepicker = function(selector, options) {
        return this.init(selector, options);
    }

    Datepicker.DEFAULTS = {

        //类型 String ,日期选择器的起始时间
        minDate: 1977 - 01 - 01,

        //类型 String,日期选择器的结束时间
        maxDate: 2099 - 12 - 31,

        //类型 String ,日期选择器的开始时间
        startDate: 2017 - 06 - 14,

        //类型 Boolean ,是否显示确认按钮
        isSure: true,

        //类型 Boolean ,是否显示清空按钮
        isClear: true,

        //类型 Boolean ,是否显示今天按钮
        isToday: true,

        //类型 Boolean ,是否显示节日
        festival: true,

        //类型 Function ,点击日期时触发的事件
        click: function() {
            return false;
        },

        //类型 Function ,选择好时间后触发的事件
        choose: function() {
            return false;
        }
    }

    Datepicker.prototype = {

        //页面加载的实例化入口
        init: function(selector, options) {
            this.options = $.extend(true, {}, Datepicker.DEFAULTS, options);
            this.selector = selector;
            this.events();
        },

        //国际化配置
        i18n: {

        },

        //实例化一个容器模板
        template: function() {
            var arryHtmls = [
                '<div class="flyer-date-year">',
                '<button class="prev"></button>',
                '<input type="text" class="flyer-year" readonly="true" />',
                '<button class="more"></button>',
                '<button class="next"></button>',
                '<div class="flyer-date-yearMore">',
                '<div class="prev-more"></div>',
                '<div class="years">',
                //this.initYears(),
                '</div>',
                '<div class="next-more"></div>',
                '</div>',
                '</div>',
                '<div class="flyer-date-month">',
                '<button class="prev"></button>',
                '<input type="text" class="flyer-month" readonly="true" />',
                '<button class="more"></button>',
                '<button class="next"></button>',
                '<div class="flyer-date-monthMore">',
                //this.initMonths(),
                '</div>',
                '</div>',
                '</div>',
                '<div class="flyer-date-body">',
                '<table>',
                '<thead>',
                '<tr>',
                '<th>日</th>',
                '<th>一</th>',
                '<th>二</th>',
                '<th>三</th>',
                '<th>四</th>',
                '<th>五</th>',
                '<th>六</th>',
                '</tr>',
                '</thead>',
                '<tbody>',
                this.initDays(),
                '</tbody>',
                '<tfoot></tfoot>',
                '</table>',
                '</div>',
                '<div class="flyer-date-footer">',
                '<div class="flyer-date-time">',
                '<label>时间</label>',
                '<span class="hour">00</span>:',
                '<span class="minute">00</span>:',
                '<span class="sconed">00</span>',
                '</div>',
                '<div class="flyer-date-btn">',
                '<button>清空</button>',
                '<button>今天</button>',
                '<button>确认</button>',
                '</div>',
                '</div>'
            ];
        },

        //实例化年选择器
        initYears: function() {

        },

        //实例化月选择器
        initMonths: function() {

        },

        //实例化日选择器
        initDays: function() {

        },

        //实例化时分秒选择器面板
        initHMS: function() {

        },

        //实例化小时选择器面板
        initHours: function() {

        },

        //实例化分钟选择器面板
        initMinutes: function() {

        },

        //实例化秒数的选择器面板
        initSconeds: function() {

        },

        //添加事件
        events: function() {
            var _this = this;
            this.selector.find(".flyer-date .flyer-date-header .flyer-date-year .more").on("click", function() {
                var $target = $(this).parent().find(".flyer-date-yearMore");
                if ($target.hasClass("flyer-date-show")) {
                    $target.removeClass("flyer-date-show");
                } else {
                    $target.addClass("flyer-date-show");
                }
            });
            this.selector.find(".flyer-date .flyer-date-header .flyer-date-month .more").on("click", function() {
                var $target = $(this).parent().find(".flyer-date-monthMore");
                if ($target.hasClass("flyer-date-show")) {
                    $target.removeClass("flyer-date-show");
                } else {
                    $target.addClass("flyer-date-show");
                }
            });
            this.selector.find(".flyer-date .flyer-date-footer .flyer-date-time .hour").on("click", function() {
                _this.selector.find(".flyer-date-minutes,.flyer-date-months,.flyer-date-sconeds").removeClass("flyer-date-show");
                var $target = $(this).parent().find(".flyer-date-hours");
                if ($target.hasClass("flyer-date-show")) {
                    $target.removeClass("flyer-date-show");
                } else {
                    $target.addClass("flyer-date-show");
                }
            });
            this.selector.find(".flyer-date .flyer-date-footer .flyer-date-time .minute").on("click", function() {
                _this.selector.find(".flyer-date-minutes,.flyer-date-months,.flyer-date-sconeds").removeClass("flyer-date-show");
                var $target = $(this).parent().find(".flyer-date-minutes");
                if ($target.hasClass("flyer-date-show")) {
                    $target.removeClass("flyer-date-show");
                } else {
                    $target.addClass("flyer-date-show");
                }
            });
            this.selector.find(".flyer-date .flyer-date-footer .flyer-date-time .sconed").on("click", function() {
                _this.selector.find(".flyer-date-minutes,.flyer-date-months,.flyer-date-sconeds").removeClass("flyer-date-show");
                var $target = $(this).parent().find(".flyer-date-sconeds");
                if ($target.hasClass("flyer-date-show")) {
                    $target.removeClass("flyer-date-show");
                } else {
                    $target.addClass("flyer-date-show");
                }
            });
        }
    }

    //定义成 jQuery 组件
    $.fn.date = function(opts) {
        return this.each(function() {
            this.Datepicker = new Datepicker(this, opts);
            return this;
        });
    }

    //定义成 flyer 内置模块
    if (typeof flyer === "object" && typeof flyer.define === "function") {
        flyer.define("date", function(selector, options) {
            return new Datepicker(selector, options);
        });
    }

});
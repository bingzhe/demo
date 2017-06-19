/***
 *@Name: fiyer v1.0 类库
 *@Author: Ken (郑鹏飞)
 *创建于日期：2017/05/08
 *@Site : http://www.flyerui.com
 *@License：LGPL
 ***/
(function(win) {
    "use strick"

    //声明一个载体
    var fly = function() {
            this.vision = "flyer 0.1";
        },
        slice = Array.prototype.slice,
        loca = win.location;

    fly.fn = fly.prototype = {

        //对字符串进行占位符格式化,例如 format("{1},{2}","a","b");
        format: function() {
            var args = slice.call(arguments),
                str, len = args.length;
            if (len > 0) {
                for (var i = 1, str = args[0]; i < len; i++) {
                    str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
                }
                return str;
            } else {
                return this;
            }
        },

        //根据参数名称获取到URL的参数值
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = loca.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

        //转换HTML代码
        escapeHTML: function(text) {
            if (typeof text === 'string') {
                return text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }
            return text;
        },

        //获取到当天时间
        today: function() {
            return new Date().toISOString().replace(/T.+/, "");
        },

        //判断一个对象是否为空
        isEmptyObject: function(o) {
            var i;
            for (i in o)
                return false;
            return true;
        },

        //在控制台输入信息，可自定义打印消息类型
        log: function(type, msg) {
            if (typeof console) {
                var args = slice.call(arguments);
                if (args.length === 1) {
                    msg = type;
                    console.log(msg);
                } else if (args.length > 1) {
                    console[type](msg);
                }
            }
        }
    }

    //定义一个开放接口
    fly.fn.define = function(name, callback) {
        fly.fn[name] = callback;
    }

    //提供一个拓展的方法接口
    fly.fn.extend = function(options) {
        for (var o in options) {
            this[o] = options[o];
        }
        return this;
    }

    //实例化给并挂在 window 对象下
    window.flyer = new fly();
})(window);;/***
 *@Name: fiyer v1.0 下拉组件
 *@Author: Ken (郑鹏飞)
 *创建于日期：2016/03/30
 *@Site : http://www.flyerui.com
 *@License：LGPL
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

    // <div class="flyer-combobox">
    //     <div class="flyer-combobox-contents"><span class="filter-options"></span><i class="fa fa-angle-down"></i></div>
    //     <div class="flyer-combobox-items" style="display:block;">
    //         <div class="flyer-combobox-search">
    //             <input placeholder="在这里可以输入" type="text"><i class="fa fa-search"></i>
    //         </div>
    //         <ul>
    //             <li>
    //                 <div>唐四少1</div>
    //             </li>
    //             <li>
    //                 <div>唐四少2</div>
    //             </li>
    //             <li>
    //                 <div>唐四少3</div>
    //             </li>
    //             <li>
    //                 <div>唐四少4</div>
    //             </li>
    //         </ul>
    //     </div>
    // </div>
    //定义一个样式数组集合
    var styles = ["flyer-combobox", "flyer-combobox-contents", "filter-options", "fa-angle-down", "flyer-combobox-items", "flyer-combobox-search", "fa-search", "selected", "open"],
        body = document.body,
        doc = document,
        loca = location,
        win = window;



    //声明一个下拉框构造函数 
    var ComboBox = function(selector, options) {
        return this.init(selector, options);
    }

    ComboBox.DEFAULTS = {

        //类型：Boolean ,是否支持多选，默认值为true
        isMulti: true,

        //类型：Boolean ,是否禁用,默认值为false
        disabled: false,

        //类型：Boolean ,是否允许索引内容,默认值为 true
        allowSearch: true,

        //类型：String ,显示值分隔的符号，默认值为 ;
        multipleSeparator: ";",

        //类型: String ,要绑定的键,默认值为 id
        fieldKey: "id",

        //是否必选,这个属性要配合flyerUI的表单插件才能有效果,默认值为true
        required: true,

        //下拉框组件名称,默认值为comboBox
        name: "comboBox",

        //类型: String ,要绑定的值,默认值为 value
        fieldValue: "value",

        //类型：String ,显示在下拉框上的 placeholder,默认值为 placeholder
        placeholder: "placeholder",

        //类型：String ,搜索的框里的placeholder,默认值为 “在这里可以快捷搜索到你想找的..”
        searchPlaceholder: "在这里可以快捷搜索到你想找的..",

        //类型：String ,请求服务数据源地址,默认值为空
        url: "",

        //类型：Array ,JSON数据Data ,优先于请求的服务数据源地址,默认值为 []
        data: [],

        //类型：Boolean ,是否可以选中全部
        selectAll: true,

        //类型：Boolean ,点击全选是否选中所有的值
        allowSelectAll: true,

        //类型：Function ,开放一个数据结构处理的方法
        fnDataProcessing: function() {
            this.data = this.data.rows;
        },

        //类型：Function,选中事件
        fnSelected: function() {
            return false;
        },

        //类型：Function ,选中之前事件
        fnBeforeSelected: function() {
            //废弃后的事件...
        },

        //类型：Function,先中之后事件
        fnAfterSelected: function() {
            //废弃后的事件...
        }

    }

    ComboBox.prototype = {

        //页面加载的实例化入口
        init: function(selector, options) {
            this.options = $.extend(true, {}, ComboBox.DEFAULTS, options);
            this.selector = selector;
            this[0] = $(selector);
            this._data = {};
            this.requestData();
        },

        //加载模板
        template: function() {
            var opts = this.options,
                _this = this;

            var arryHtmls = [
                '<div class="flyer-combobox">',
                '<div class="flyer-combobox-contents">',
                '<input type="text" class="filter-options" name="' + opts.name + '" required="' + opts.required + '" placeholder=' +
                opts.placeholder +
                ' readonly="readonly" /><i class="fa fa-angle-down"></i>',
                '</div>',
                '<div class="flyer-combobox-items">',
                opts.allowSearch ? '<div class="flyer-combobox-search"><input placeholder="' + opts.searchPlaceholder + '" type="text"><i class="fa fa-search"></i></div>' : "",
                '<ul>',
                opts.selectAll ? "<li data-index='-1' data-key='-1' data-value='全部'><div>全部</div></li>" : "",
                _this.readerItems(),
                '</ul>',
                '</div>',
                '</div>'
            ]

            this[0].html(arryHtmls.join(""));

            this.$itemContainer = this[0].find("." + styles[4]);
            this.$contents = this[0].find("." + styles[1]);
            this.$items = this.$itemContainer.find("li");
            this.$filterOptions = this.$contents.find("." + styles[2]).eq(0);

        },

        //渲染下拉数据
        readerItems: function() {
            var arryHtmls = [],
                _this = this,
                opts = this.options,
                data = opts.data;

            for (var i = 0, len = data.length; i < len; i++) {
                arryHtmls.push('<li data-index=' + i + ' data-key=' + data[i][opts.fieldKey] + ' data-value=' + data[i][opts.fieldValue] + '><div>' + data[i][opts.fieldValue] + '</div></li>');
            }

            return arryHtmls.join("");
        },

        //拼装数据
        requestData: function() {
            var _this = this,
                opts = this.options,
                data = opts.data;

            if (data.length == 0 && opts.url.length > 0) {
                $.getJSON(this.options.url, function(data) {
                    opts.data = data;
                    opts.fnDataProcessing();
                    _this.template();
                    _this.initEvents();
                });
            } else {
                _this.template();
                _this.initEvents();
            }
        },

        //添加事件
        initEvents: function() {

            var _this = this,
                opts = _this.options;

            _this.$contents.on("click", function(e) {
                if (_this.$itemContainer.hasClass(styles[8])) {
                    _this.hideItems.call(_this);
                } else {
                    _this.$itemContainer.addClass(styles[8]);
                }
                _this.stop(e);
            });

            _this.$items.each(function() {
                $(this).on("click", function(e) {

                    var $this = $(this),
                        del = $this.hasClass(styles[7]) ? true : false;

                    var item = {
                        fieldKey: $this.data("key"),
                        fieldValue: $this.data("value")
                    }
                    if (item.fieldKey == "-1" && item.fieldValue == "全部") {
                        if (opts.allowSelectAll) {
                            _this.selectAllItems(this);
                            return false;
                        }

                        _this.$items.removeClass(styles[7]);
                        _this.empty();

                    }

                    _this.unselectAll();

                    _this.showSelectedItem(item, del);

                    opts.fnSelected.call(_this, item, this, _this._data);

                    if (!opts.isMulti) {
                        _this.hideItems.call(_this);
                        _this.$items.removeClass(styles[7]);
                    }

                    if (del) {
                        $this.removeClass(styles[7]);
                    } else {
                        $this.addClass(styles[7]);
                    }
                    _this.stop(e);

                });
            });

            $(document).on("click", function(e) {
                $("." + styles[4]).removeClass(styles[8]);
                _this.stop(e);
            });

        },

        //阻止冒炮事件
        stop: function(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        },

        //将选中的值显示在内容区域
        showSelectedItem: function(item, del) {

            var opts = this.options,
                keys = this.$filterOptions.data("key") || "",
                values = this.$filterOptions.val() || "";

            if (opts.isMulti) {

                //如果是删除
                if (del) {
                    keys = String(keys).replace((item.fieldKey + opts.multipleSeparator), "");
                    values = values.replace((item.fieldValue + opts.multipleSeparator), "");
                } else {
                    keys = String(keys) + item.fieldKey + opts.multipleSeparator;
                    values = values + item.fieldValue + opts.multipleSeparator;
                }
            } else {
                keys = item.fieldKey;
                values = item.fieldValue;
            }

            this.$filterOptions.val(values);
            this.$filterOptions.data("key", keys);

            //声明一个内部选中的数据
            this._data = {
                fieldKey: keys,
                fieldValue: values
            }
        },

        //全部选中
        selectAllItems: function(elm) {
            var _this = this,
                opts = this.options,
                $elm = $(elm);

            if ($elm.attr("all") == "select") {
                this.$items.removeClass(styles[7]);
                $elm.attr("all", "unselect");
                _this.empty();
            } else {

                this.$items.each(function() {
                    var $this = $(this),
                        item = {
                            fieldKey: $this.data("key"),
                            fieldValue: $this.data("value")
                        };
                    $this.addClass(styles[7]);
                    if (item.fieldKey != "-1") {
                        _this.showSelectedItem(item);
                    }
                });

                $elm.attr("all", "select");
            }
        },

        //移除选中的all项
        unselectAll: function() {
            var $all = this.$itemContainer.find("[data-index='-1']");
            if ($all.hasClass(styles[7])) {
                $all.removeClass(styles[7]);
                $all.attr("all", "select");
                this.empty();
            }
        },

        //隐藏下拉框
        hideItems: function() {
            this.$itemContainer.removeClass(styles[8]);
        },

        //快捷检索出需要的数据
        filterData: function() {

        },

        //得到选中的值对象
        getSelectedData: function() {
            return this._data;
        },

        //得到选中的值
        getSelectedValue: function() {
            return this._data.fieldKey;
        },

        //得到选中的文本
        getSelectedText: function() {
            return this._data.fieldValue;
        },

        //给对象赋值
        setValue: function(data) {

            var $selectedItem = this.$itemContainer.find("[data-key='" + data.fieldKey + "']");
            this._data = {
                fieldKey: data.fieldKey,
                fieldValue: data.fieldValue || $selectedItem.data("value")
            }
            this.$filterOptions.val(this._data.fieldValue);
            this.$filterOptions.data("key", this._data.fieldKey);
            $selectedItem.addClass(styles[7]);
        },

        //给对象数组赋值
        setValues: function(data) {
            var keys = "",
                values = "",
                opts = this.options;
            for (var i = 0, len = data.length; i < len; i++) {
                var $selectedItem = this.$itemContainer.find("[data-key='" + data[i].fieldKey + "']");
                keys = keys + data[i].fieldKey + opts.multipleSeparator;
                values = values + (data[i].fieldValue || $selectedItem.data("value")) + opts.multipleSeparator;
                $selectedItem.addClass(styles[7]);
            }

            this._data = {
                fieldKey: keys,
                fieldValue: values
            }
            this.$filterOptions.val(this._data.fieldValue);
            this.$filterOptions.data("key", this._data.fieldKey);
        },

        //清空选中的值
        empty: function() {
            this._data = {
                fieldKey: "",
                fieldValue: ""
            }
            this.$filterOptions.val(this._data.fieldValue);
            this.$filterOptions.data("key", this._data.fieldKey);
            this.$items.removeClass(styles[7]);
        }
    }

    //定义成 jQuery 组件
    $.fn.combobox = function(opts) {
        return this.each(function() {
            this.ComboBox = new ComboBox(this, opts);
            return this;
        });
    }

    //定义成 flyer 内置模块
    if (typeof flyer === "object" && typeof flyer.define === "function") {
        flyer.define("combobox", function(selector, options) {
            return new ComboBox(selector, options);
        });
    }

});;/***
 *@Name: fiyer v1.0 弹层组件
 *@Author: Ken (郑鹏飞)
 *@Site : http://www.15ae.com
 *@License：LGPL
 ***/
flyer.define("ui", function() {
    var fly = this;

    var styles = ["flyer-modal", "flyer-dialog", "flyer-dialog-title", "flyer-dialog-toolbar", "flyer-close", "flyer-dialog-content", "flyer-dialog-footer", "flyer-btn"],
        body = document.body,
        doc = document,
        loca = location,
        win = window;

    var class_col = {
        shade: "flyer-shade", //遮罩层的样式
        shade_loadding: "flyer-shade-loadding",
        dialog_container: "flyer-dialog-container", //弹出框容器
        dialog_title: "flyer-dialog-title", //弹出框标题
        dialog_move: "flyer-dialog-move", //弹出框副本样式，一般用于框位置移动时
        dialog_input: "flyer-dialog-input", //prompt弹框里输入框的样式
        dialog_textarea: "flyer-dialog-textarea", //prompt弹框多输入框的样式
        flyer_adim: "flyer-anim",
        flyer_msg: "flyer_msg"
    };
    //控件编号集合便于管理，有些是控件的前缀或者后缀
    var ctl_ids = {
        shade: "flyer-shade", //遮罩层的编号
        shade_loadding: "flyer-shade-loadding",
        dialog_container: "flyer-dialog-container", //弹出框容器编号
        dialog_title: "flyer-dialog-title", //弹出框标题
        dialog_move: "flyer-dialog-move", //弹出框副本样式，一般用于框位置移动时
        dialog_input: "flyer-dialog-input" //prompt弹框里控件的编号
    };
    //全局变量
    var global = {
        index: 0, //记录当前元素的ID增长值
        offsetX: 0, //层移动时的鼠标坐标X
        offsetY: 0, //层移动时的鼠标坐标Y
        isMove: false, //层移动时是否还可以移动
        isModal: true, //是否是对话框模式
        copies: null, //记录弹框副本移动时的对象
        self: null, //弹框的类型
        dialog_type: alert
    };
    var dialogType = {
        alert: "1",
        comfirm: "2",
        msg: "3",
        prompt: "4",
        open: "5",
        tips: "6"
    };

    var ui = fly.prototype.ui = {
        //遮罩层
        shade: function() {
            $(document.body).append("<div style='z-index:" + untity.getCurrentDate() + "' class='" + class_col.shade + "' id='" +
                ctl_ids.shade + global.index + "'></div>");
            setTimeout(function() {
                $(ctl_ids.shade + global.index).show()
            }, 50);
            return global.index;
        },
        //提示框,可以扩展点击确定后触发一个函数
        alert: function(msg, options, callback) {
            msg = msg || "";
            global.dialog_type = dialogType.alert;
            if (typeof(options) == "function") callback = options;
            var that = parts.open(msg, $.extend({
                title: "消息",
                content: typeof(msg) == "undefined" ? "" : msg,
                buttons: [{
                    text: "确定",
                    click: function() {
                        ui.close(that.index);
                        if (callback)
                            callback();
                    }
                }]
            }, options));
        },
        loadding: function() {
            global.index++;
            flyer.shade();
            $(document.body).append("<div style='z-index:" + untity.getCurrentDate() + "' id='" +
                ctl_ids.shade_loadding + global.index + "' class='" + class_col.shade_loadding + "'><img src='../css/imgs/load.gif'></div>");
            setTimeout(function() {
                $(ctl_ids.shade_loadding + global.index).show()
            }, 10);
            return global.index;
        },
        closeLoadding: function(index) {
            index = typeof index === "undefined" ? global.index : index;
            $("#" + ctl_ids.shade + index).remove();
            $("#" + ctl_ids.shade_loadding + index).remove();
            global.index--;
        },
        //消息框,目前仅作为消息提示，且一定时间后自动消失
        msg: function(msg) {
            global.dialog_type = dialogType.msg;
            options = typeof options === "undefined" ? {} : options;
            var oMsg = parts.open(msg, { isModal: false, content: msg });
            options.time = typeof(options.time) != "undefined" ? options.time : 4000;
            if (options.time > 0) {
                setTimeout(function() {
                    flyer.close(oMsg.index);
                }, options.time);
            }
        },
        //询问框,默认是”确定,取消"可以在options中设置按钮的数量和点击后的事件
        confirm: function(msg, options, callback) {
            global.dialog_type = dialogType.comfirm;
            if (typeof(options) == "function") callback = options;
            var that = parts.open(msg, $.extend({
                title: "消息",
                content: typeof(msg) == "undefined" ? "" : msg,
                buttons: [{
                    text: "确定",
                    click: function() {
                        ui.close(that.index);
                        if (typeof(callback) == "function") {
                            callback(true, $("#" + ctl_ids.dialog_input + global.index).val());
                        }
                    }
                }, {
                    text: "取消",
                    click: function() {
                        ui.close(that.index);
                        if (typeof(callback) == "function") {
                            callback(false, $("#" + ctl_ids.dialog_input + global.index).val());
                        }
                    }
                }]
            }, options));
        },
        //prompt框
        prompt: function(defaultValue, options, callback) {
            global.dialog_type = dialogType.prompt;
            if (typeof(options) == "function") callback = options;
            var that = parts.open(defaultValue, $.extend({
                title: "消息",
                content: typeof(msg) == "undefined" ? "" : msg,
                buttons: [{
                    text: "确定",
                    click: function() {
                        var vValue = $("#" + ctl_ids.dialog_input + global.index).val();
                        ui.close(that.index);
                        if (typeof(callback) == "function") {
                            callback(true, vValue);
                        }
                    }
                }, {
                    text: "取消",
                    click: function() {
                        var vValue = $("#" + ctl_ids.dialog_input + global.index).val();
                        ui.close(that.index);
                        if (typeof(callback) == "function") {
                            callback(false, vValue);
                        }
                    }
                }]
            }, options));
        },
        //弹父窗体
        open: function(options) {
            global.dialog_type = dialogType.open;
            var that = parts.open(null, $.extend({
                title: "子窗体标题",
                url: null,
                width: 400,
                height: 400
            }, options));
        },
        //关闭
        close: function(index) {

            if (typeof(index) != "number" && typeof(index) == "object") {
                index = $(index).attr("_id");
            } else if (typeof(index) == "string" && typeof(index) != "object") {
                index = index.replace(/[^\d]+/ig, "");
            }
            var vchild = untity.byId("flyer-dialog-container" + index);
            if (vchild) {
                if (global.dialog_type == dialogType.open) {
                    try {
                        var frame = $(vchild).find("iframe").get(0);
                        frame.contentWindow.document.write('');
                        frame.contentWindow.close();
                    } catch (e) {}
                }
                document.body.removeChild(vchild);
            }
            vchild = untity.byId("flyer-shade" + index);
            if (vchild)
                document.body.removeChild(vchild);

        },
        error: function(source) {
            if (console && console.log) {
                console.log(source);
            } else {
                alert(source);
            }
        },
        browser: function() {
            var uaMatch = function(ua) {
                ua = ua.toLowerCase();

                var match = rwebkit.exec(ua) ||
                    ropera.exec(ua) ||
                    rmsie.exec(ua) ||
                    ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];

                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            }
            var rwebkit = /(webkit)\/([\w.]+)/,
                ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                rmsie = /(msie) ([\w.]+)/,
                rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                browser = {},
                ua = window.navigator.userAgent,
                browserMatch = uaMatch(ua);

            if (browserMatch.browser) {
                browser[browserMatch.browser] = true;
                browser.version = browserMatch.version;
            }
            return browser;
        }()
    }

    //部件类
    var parts = {
        //打开一个框,这里可用于全局
        open: function(msg, options) {
            global.index++; //累计当前打开的值，便于关闭时查找
            global.isModal = typeof(options.isModal) != "undefined" ? options.isModal : true;
            if (global.isModal)
                flyer.shade(); //弹出遮罩层
            var contniaer = parts.builderContniaer(options);
            if (global.dialog_type != dialogType.msg) {
                contniaer.appendChild(parts.builderTitle(options));
            }
            contniaer.appendChild(parts.builderBody(options));
            if (global.dialog_type != dialogType.msg) {
                contniaer.appendChild(parts.builderFooter(options));
            }
            var setWin = parts.builderSetWin();
            setWin.onclick = function() {
                flyer.close(contniaer);
            }
            contniaer.appendChild(setWin);
            document.body.appendChild(contniaer);
            var centerXY = untity.getCenterXY(contniaer);
            contniaer.style.top = centerXY.y + "px";
            contniaer.style.left = centerXY.x + "px";

            if (global.dialog_type == dialogType.open && !options.isFrame) {
                $("#flyer-dialog-body" + global.index).load(options.url);
            }
            return {
                elm: contniaer,
                index: global.index
            };
        },
        builderContniaer: function(options) {
            var contniaer = document.createElement("div");
            contniaer.className = class_col.dialog_container + " " + class_col.flyer_adim + " " + (global.dialog_type == dialogType.msg ? class_col.flyer_msg : "");
            contniaer.id = ctl_ids.dialog_container + global.index;
            $(contniaer).css("z-index", untity.getCurrentDate());
            $(contniaer).attr("_id", global.index);
            if (typeof(options) != "undefined" && typeof(options.width) != "undefined" && typeof(options.height) != "undefined") {
                $(contniaer).css("width", options.width);
                $(contniaer).css("height", options.height);
            }
            return contniaer;
        },
        builderTitle: function(options) {
            var title = document.createElement("div");
            title.className = class_col.dialog_title;
            title.id = ctl_ids.dialog_title + global.index;
            $(title).attr("_id", global.index);
            title.innerHTML = options.title;
            global.isMove = typeof(options.isDarag) != "undefined" ? options.isDarag : true;
            if (global.isMove) {
                title.style.cursor = "move";
            }
            $(title).mousedown(function() {
                global.isMove = typeof(options.isDarag) != "undefined" ? options.isDarag : true;
                if (global.isMove) {
                    var copies = parts.builderMove();
                    var self = untity.byId(ctl_ids.dialog_container + $(title).attr("_id"));
                    global.copies = copies;
                    global.self = self;
                    untity.mouseDown(copies, self);
                    var vEvent = window.event || arguments.callee.caller.arguments[0];
                    global.offsetX = vEvent.offsetX;
                    global.offsetY = vEvent.offsetY;
                    document.body.appendChild(copies);
                    //屏蔽点击鼠标会选中文本内容
                    document.body.onselectstart = function() {
                        return false;
                    }
                }
            });
            $(document).mousemove(function() {
                if (global.isMove)
                    untity.mouseOver(global.copies);
            });

            $(document).mouseup(function() {
                untity.mouseOut(global.self);
                global.isMove = false;
                document.body.onselectstart = function() {
                    return true;
                }
            });
            return title;
        },
        builderButton: function(button) {
            var a = document.createElement("a");
            a.className = "flyer-button flyer-dialog-btn";
            a.id = "flyer-button" + global.index;
            a.innerHTML = typeof button != "undefined" ? button.text : "Yes";
            $(a).bind("click", button.click);
            return a;
        },
        builderFooter: function(options) {
            var footer = document.createElement("div");
            footer.className = "flyer-dialog-footer";
            footer.id = "flyer-dialog-footer" + global.index;
            for (var btn in options.buttons) {
                footer.appendChild(parts.builderButton(options.buttons[btn]));
            }
            return footer;
        },
        builderBody: function(options) {
            var body = document.createElement("div");
            body.className = "flyer-dialog-body";
            body.id = "flyer-dialog-body" + global.index;

            switch (global.dialog_type) {
                case dialogType.alert:
                case dialogType.comfirm:
                    {
                        if (typeof(options.type) != "undefined" && options.type != null && options.type.length > 0) {
                            options.content = "<i class='flyer-dialog-icon flyer-dialog-icon-" +
                                options.type + "'></i><div class='flyer-dialog-padding'>" + options.content + "</div></div>";

                        }
                    }
                    break;
                case dialogType.prompt:
                    {
                        options.content = parts.builderInput(options).outerHTML;
                    }
                    break;
                case dialogType.open:
                    {
                        if (options.isFrame) {
                            $(body).css("padding", "0px");
                            options.content = "<iframe name='flyer_iframe_" + global.index + "' scrolling='auto' frameborder='0' height='" +
                                (options.height - 37) +
                                "' width='" +
                                (options.width) +
                                "' allowtransparency='true' src='" + untity.appendFrameUrl(options.url) +
                                "'></iframe>";
                        }

                    }
                    break;
            }

            body.innerHTML = options.content;
            return body;
        },
        builderSetWin: function() {
            var body = document.createElement("span");
            body.className = "flyer-dialog-setwin";
            body.id = "flyer-dialog-setwin" + global.index;
            body.innerHTML = "<a class=\"flyer-dialog-close\" href=\"javascript:void(0)\"></a>";
            return body;
        },
        builderMove: function() {
            var move = document.createElement("div");
            move.className = class_col.dialog_move;
            move.id = ctl_ids.dialog_move + global.index;
            return move;
        },
        builderInput: function(options) {
            var vType = typeof(options.type) != "undefined" ? options.type : "text";
            var vElement = null;
            switch (vType.toLowerCase()) {
                case "textarea":
                    {
                        vElement = document.createElement("textarea");
                        vElement.className = class_col.dialog_textarea;
                    }
                    break;
                default:
                    {
                        vElement = document.createElement("input");
                        vElement.className = class_col.dialog_input;
                        vElement.type = vType;
                    }
                    break;
            }
            vElement.id = ctl_ids.dialog_input + global.index;
            vElement.maxLength = options.maxLength || 999999;
            return vElement;
        },
        builderDiv: function(options) {
            var div = document.createElement("div");
            return div;
        }
    }

    //辅助类
    var untity = {
        //获得屏幕的中心坐标
        getCenterXY: function(self) {
            try {
                var mode = document.documentElement || document.body;
                var bodyX = mode.offsetWidth || mode.clientWidth;
                var bodyY = mode.clientHeight || mode.clientHeight;
                var selfX = typeof self != "undefined" ? self.offsetWidth : 0;
                var selfY = typeof self != "undefined" ? self.offsetHeight : 0;
                return {
                    x: (bodyX - selfX) / 2,
                    y: (bodyY - selfY) / 2,
                    w: mode.offsetWidth,
                    h: mode.clientHeight
                };
            } catch (ex) {}
        },
        //能过控件编号得天一个DOM控件对象
        byId: function(id) {
            return document.getElementById(id);
        },
        //鼠标悬浮时，这里一般用在层拖动时
        mouseOver: function(copies) {
            var vEvent = window.event || arguments.callee.caller.arguments[0];
            var y, x = 0;
            x = parseInt(vEvent.clientX) - parseInt(global.offsetX);
            y = parseInt(vEvent.clientY) - parseInt(global.offsetY) + parseInt(untity.getScrollTop());
            if (copies) {
                copies.style.top = y + "px";
                copies.style.left = x + "px";
            }
        },
        //鼠标离开时，这里一般用在层拖动时
        mouseOut: function(self) {
            var copies = untity.byId(ctl_ids.dialog_move + global.index);
            if (self != null && copies != null) {
                self.style.top = (parseInt(untity.getNumber(copies.style.top)) - parseInt(untity.getScrollTop())) + "px";
                self.style.left = copies.style.left;
                document.body.removeChild(copies);
            }
        },
        //鼠标按钮松开后，这里一般用在层拖动时
        mouseDown: function(copies, self) {
            copies.style.top = (parseInt(untity.getNumber(self.style.top)) + parseInt(untity.getScrollTop())) + "px";
            copies.style.left = self.style.left;
            copies.style.width = (self.offsetWidth - 6) + "px";
            copies.style.height = (self.offsetHeight - 6) + "px";
        },
        //获取当前时间
        getCurrentDate: function(format) {
            format = typeof(format) == "undefined" ? "" : format;
            var vDate = new Date();
            return vDate.getFullYear() + format + (vDate.getMonth() + 1) + format + vDate.getDate()
        },
        //追加iFrame的URL链接，用于清掉iFrame的缓存
        appendFrameUrl: function(v) {
            return v + (/[\?]/ig.test(v) ? "&" : "?") + "v=" + Math.random();
        },
        getNumber: function(v) {
            return v.toString().replace(/[^\d\.]+/ig, "");
        },
        getScrollTop: function() {
            var h = document.documentElement.scrollTop;
            if (h == 0)
                h = document.body.scrollTop;
            return h;
        }
    };
});;/*
 *@Name : flyer 分页组件
 *@Author : Ken( 郑鹏飞 )
 *@Date : 2016 / 07 / 19
 *@Site : http://www.flyerui.com
 *@License : LGPL
 */
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

    //定义一个分页组件
    // elm 分页组件完成后要装入的容器
    // opts 分页组件时要定制的属性
    function pager(elm, opts) {
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
        fnBeforeClick: function() { return false; },

        //类型:Function ,点击翻页事件
        fnClick: function() { return false; },

        //类型:Function ,点击翻页之后事件
        fnAfterClick: function() { return false; },

    }

    pager.prototype = {

        //加载分页控件
        init: function(elm, opts) {
            this.options = this.getOptions(opts);
            this[0] = elm;
            this.render();
        },

        //渲染分页控件
        render: function() {
            var
            //声明一个自身对象的副本用于当前作用域的调用
                _this = this,

                //声明一个定制属性的副本用于当前的作用域的调用
                opts = _this.options,

                //声明一个定制中的 ajax 属性副本
                ajax = opts.ajax;

            //得到总页值
            opts.pageSum = Math.ceil(opts.totalNum / opts.pageSize);

            //如果总页值小于或等于0 ，则不进行渲染
            if (opts.pageSum <= 0) {

                //清空之前的分页渲染
                $(this[0]).empty();
                return _this;
            }

            //如果页码最大值小于或等于设置的显示长度值
            //如果页码最大值减去设置的显示长度值等于设置的起始页
            //上述条件成立，则启用简单的模版渲染
            if (opts.pageSum <= opts.pagerLen || opts.pageSum - opts.pagerLen == opts.pageIndex) {
                $(this[0]).html(_this.simpleTemplate());
            } else {
                $(this[0]).html(_this.template());
            }

            _this.addEvent();

        },

        //得到配置属性对象
        getOptions: function(opts) {
            return $.extend(true, {}, pager.DEFAULTS, opts);
        },

        //重新渲染
        reload: function() {
            this.render();
        },

        //分页控件模版
        template: function() {
            var tmplHtml = "<div class=\"flyer-pager-wrapper\"><div class=\"flyer-pager-view\"><ul>",
                opts = this.options,

                //得到前后的间隔值
                space = Math.floor((opts.pagerLen - 2) / 2),

                //如果 space 的值为0，则默认为1
                space = space == 0 ? 1 : space,

                //定义起始页码值
                //如果当前页小于设置的页面显示长度，起始值等于页码起始值
                //如果当页码值大于或等于设置的页面显示长度而起始值等于减去前后的间隔值
                i = opts.curIndex < opts.pagerLen ? opts.pageIndex : opts.curIndex - space,

                //定义结束页码值
                //如果当前页小于设置的页面显示长度，起始值等于页码显示的长度值
                //如果当页码值大于或等于设置的页面显示长度而起始值等于减去前后的间隔值
                len = opts.curIndex < opts.pagerLen ? opts.pagerLen : opts.curIndex + space;

            //如果当前页码值加上页面显示长度值大于页码最大值，则调用页码最大值作为结束值
            //同时起始值等于最大值减去页码显示长度值
            //如果当前页码值加上页面显示长度值大于页码最大值，则调用页码最大值作为结束值
            //修改于 2016/07/25
            if (opts.curIndex + space * 2 > opts.pageSum - 1) {
                i = opts.pageSum - opts.pagerLen;
                len = opts.pageSum;
            }

            //加载上一页按扭
            tmplHtml += "<li class=\"prev\">" + opts.prevText + "</li>";

            //判断当前最大页是否大于显示的长度
            if (opts.curIndex >= opts.pagerLen) {

                //加载首页按钮
                tmplHtml += "<li>" + opts.pageIndex + "</li>";

                //加载首页前省略
                tmplHtml += "<li class=\"omit\">...</li>";
            }

            for (i; i <= len; i++) {
                if (opts.curIndex == i) {
                    tmplHtml += "<li class=\"active\">" + i + "</li>";
                } else {
                    tmplHtml += "<li>" + i + "</li>";
                }
            };

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

        },

        //简单的分页渲染
        simpleTemplate: function() {
            var tmplHtml = "<div class=\"flyer-pager-wrapper\"><div class=\"flyer-pager-view\"><ul>",
                opts = this.options,

                //渲染分页按钮的起始值
                i = opts.pageIndex;

            //渲染分页按钮的结束值
            len = opts.pageSum;

            //加载上一页按钮
            tmplHtml += "<li class=\"prev\">" + opts.prevText + "</li>";

            for (i; i <= len; i++) {
                if (opts.curIndex == i) {
                    tmplHtml += "<li class=\"active\">" + i + "</li>";
                } else {
                    tmplHtml += "<li>" + i + "</li>";
                }
            }

            //加载下一页按钮
            tmplHtml += "<li class=\"next\">" + opts.nextText + "</li>";
            tmplHtml += "</ul></div></div>";

            return tmplHtml;
        },

        //给所有分页添加事件
        addEvent: function() {
            var

            //声明一个自身对象的副本用于当前作用域的调用
                _this = this,

                //声明一个定制属性的副本用于当前作用域的调用
                opts = _this.options,

                //得到所有的 li 按钮
                $lis = $(_this[0]).find(".flyer-pager-view").find("li");

            $lis.each(function() {
                var $this = $(this);

                //存在 omit 类样式的不作处理
                if ($this.hasClass("omit")) {
                    return;
                }

                $this.on("click", function() {

                    //获取到当前页
                    if ($this.hasClass("next")) {

                        //如果当前值大于或等于最大的分页总值则不再处理
                        if (opts.curIndex >= opts.pageSum) {
                            return this;
                        }
                        opts.curIndex++;
                    } else if ($this.hasClass("prev")) {

                        //如果当前值小于或等于设的起始值则不再处理
                        if (opts.curIndex <= opts.pageIndex) {
                            return this;
                        }
                        opts.curIndex--;
                    } else {
                        opts.curIndex = parseInt($this.text());
                    }

                    //如果当前页不等于最大分页值，则直接返回不再继续处理
                    if (opts.curIndex <= opts.pageSum) {

                        _this.reload();

                        if ($this.hasClass("next") || $this.hasClass("prev")) {
                            var prevLi = $lis.parent().find(".active");
                            $lis.removeClass("active");
                            prevLi.next().addClass("active");
                        } else {
                            $lis.removeClass("active");
                            $this.addClass("active");
                        }

                        opts.fnClick.call(_this);
                    }
                });
            });
        }
    }

    //定义成 jQuery 组件
    $.fn.pager = function(opts) {
        return this.each(function() {
            this.pager = new pager(this, opts);
            return this;
        });
    }

    //定义成 flyer 内置模块
    if (typeof flyer === "object" && typeof flyer.define === "function") {
        flyer.define("page", function(elm, opts) {
            return new pager(elm, opts);
        });
    }

});
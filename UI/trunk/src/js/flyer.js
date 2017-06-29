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

        //得到当前函数的名称
        getFnName: function(fn) {
            return (/^[\s\(]*function(?:\s+([\w$_][\w\d$_]*))?\(/).exec(fn.toString())[1] || '';
        },

        //判断是否是无效的空值
        isEmpty: function(value) {
            var comparable = [null, "undefined", undefined, "N/A", "0", 0, "null", false, "false"];
            return comparable.indexOf(value) > 0 ? false : true;
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
})(window);
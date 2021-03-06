/* 类库 */
(function (win) {
    "use strick"

    //声明一个载体
    var fly = function () {
            this.vision = "flyer 0.1";
        },
        slice = Array.prototype.slice,
        loca = win.location;

    fly.fn = fly.prototype = {

        //对字符串进行占位符格式化，例如 format("{1}, {2}", "a", "b")
        format: function () {
            var args = slice.call(arguments),
                str,
                len = args.length;
            if (len > 0) {
                for (var i = 1, str = args[0]; i < len; i++) {
                    str = srt.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
                }
                return str;
            } else {
                return this;
            }
        },

        //根据参数名称获取到URL的参数值
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = loca.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

        //在控制台输入信息，可自定义打印消息类型
        log: function (type, msg) {
            if (typeof console) {
                var args = slice.call(arguments);
                if (args.length === 1) {
                    msg = type;
                } else if (args.length > 1) {
                    console[type](msg);
                }
            }
        }
    }

    //定义一个开放接口
    fly.fn.define = function (name, callback) {
        fly.fn[name] = callback;
    }

    //提供一个拓展的方法借口
    fly.fn.extend = function (options) {
        for (var o in options) {
            this[o] = options[o];
        }
        return this;
    }

    //实例化给并挂载window对象下
    window.flyer = new fly();

})(window)
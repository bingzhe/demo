 ;
 (function($) {
     $.fn.extend({
         "addModalDanger": function(options) {
             this.each(function() {
                 var $this = $(this);
                 $this.attr("data-toggle", "modal").attr("data-target", "#store_purchase2");

                 //监控计时器
                 var timer = null;
                 //清楚计时器
                 var deleteTimer = function() {
                     if (timer) {
                         window.clearTimeout(timer);
                         timer = null;
                     }
                 };
                 //添加计时器
                 var createTimer = function() {
                     timer = setTimeout(function() {
                         $("#store_purchase2").modal("hide");
                         if (options.callback && typeof options.callback == 'function') {
                             if ($("#store_purchase2").css("display") == "block")
                                 options.callback();
                         }
                     }, 2000)
                 };
                 $this.on('click', function() {
                     deleteTimer();
                     createTimer();
                 });
             });
             return this;
         }
     })
 })(jQuery);
 /*
  * 封装addModalDanger方法，jQuery对象上调用后出现定好样式的警告弹窗，2S后消失，可以传入一个对象，其中的方法在弹窗消失时调用
  * .addModalDanger() 或 .addModalDanger({"callback": function(){}});
  * */
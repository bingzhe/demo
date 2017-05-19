function fixedHead(ele, pro) {
    var headclone = $("<table class = 'table fixed-table-container' style = 'display:none;'>").append(ele.find('thead').clone()); //悬浮结构
    var offTop = ele.offset().top + ele.find('thead').outerHeight() - 60 - ($(".breadcrumb").css('position') == 'fixed' ? 40 : 0); //悬浮定位高度
    var offleft = ele.offset().left; //悬浮定位左偏移
    var scroll_body = ele.parents('.fixed-table-body');
    //动态调整表头浮动框
    $(window).on({
        "scroll": function () { //悬浮逻辑
            if ($(window).scrollTop() > offTop) { //悬浮
                headclone.appendTo($('body')).css({
                    'position': 'fixed',
                    //'top':$(".breadcrumb").css('position')=='fixed'?'100px':'60px',//判断面包屑是否悬浮
                    'top': $(".breadcrumb").css('position') === 'fixed' ? ($(".breadcrumb").css('top') === "60px" ? '100px' : '40px') : '60px', //判断面包屑是否悬浮
                    'left': offleft - 1 - scroll_body.scrollLeft(),
                    'background': '#fff',
                    'width': ele.width(),
                    'display': 'table',
                    'overflow': 'hidden'
                }).find('.th-inner').each(function () {
                    $(this).width(ele.find("thead:first").find('th').eq($(this).parent().index()).find('.th-inner').width());
                }).parent().attr('width', ele.find("thead:first").find('th').eq($(this).index()).attr('width')).css('padding', '0px');
                if (typeof pro != 'undefined') {
                    resizediv_vs02(pro);
                } else {
                    resizediv_vs02();
                }
                $("#leftdiv").add("#rightdiv").show();
                //左右拖动功能
                ele.parents('.fixed-table-body').on("scroll", function () {
                    headclone.css('left', offleft - 1 - $(this).scrollLeft());
                })
            } else { //清除悬浮
                headclone.hide();
                //遮挡快隐藏
                $("#leftdiv").add("#rightdiv").hide();
            }
        },
        'resize': function () { //有人动态调整窗口的时候表头的宽度也要变
            if (window.timer) clearTimeout(window.timer);
            window.timer = setTimeout(function () {
                headclone.find('.th-inner').each(function () {
                    $(this).width(ele.find("thead:first").find('th').eq($(this).parent().index()).find('.th-inner').width());
                }).parent().attr('width', ele.find("thead:first").find('th').eq($(this).index()).attr('width')).css('padding', '0px');
                headclone.width(ele.width())
            }, 500)
        }
    });
    //全选功能
    headclone.find("[name = 'btSelectAll']").on('change', function () {
        if (ele.find("[name = 'btSelectAll']")) ele.find("[name = 'btSelectAll']").click();
    });
    if (ele.find("[name = 'btSelectAll']")) {
        ele.find("[name = 'btSelectAll']").on('change', function () {
            headclone.find("[name = 'btSelectAll']").prop('checked', $(this).prop('checked'));
        })
    }
}


function skuListFixedHead() {
    $("#skuListTable").parents('fixed-table-container').css({
        'position': 'relative'
    })
    var $headclone = $("#skuListTable").find('thead').clone();
    $headclone.css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%'
    })
    $("#skuListTable").append($headclone);
}
var $allotCost = $("#allotCost").parent(),
    offsetTop = $allotCost.offset().top,
    offsetLeft = $allotCost.offset().left,
    innerHeight = window.innerHeight; //浏览器 文档窗口高度
    // pageYOffset = window.pageYOffset;  //页面 滚动距离 
    var $allotCostClone = $allotCost.clone().css({
        visibility: 'hidden',
        display: 'none !important'
    }).insertAfter($allotCost);

$(window).on('scroll', function () {
    var pageYOffset = window.pageYOffset;


    if (pageYOffset + innerHeight < offsetTop) {
        if (!isFixed()) {
            setFixed();
        }
    } else {
        if (isFixed()) {
            unsetFixed();
        }
    }
});


function isFixed() {
    return $allotCost.data('data-fixed');
}

function setFixed() {
    $allotCost.data('data-fixed', true)
        .css({
            'position': 'fixed',
            'bottom': 0,
            'left': offsetLeft,
            'margin': 0,
            'index': 9999
        });
    $allotCostClone.show();
}


function unsetFixed() {
    $allotCost.data('data-fixed', false)
        .removeAttr('style').css('width','112px');
    $allotCostClone.hide();
}





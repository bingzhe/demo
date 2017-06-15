$(function () {

var $logisticNumber = $("#logisticNumber");
var $allotCost  = $("#allotCost");

stickBottom($logisticNumber);
stickBottom($allotCost);


function stickBottom(obj){
    var $allotCostPar = obj.parent(),
        offsetTop = $allotCostPar.offset().top,
        offsetLeft = $allotCostPar.offset().left;

    var $allotCostClone = $allotCostPar.clone().css({
        visibility: 'hidden',
        display: 'none !important'
    }).insertAfter($allotCostPar);

    $allotCostClone.find('input').removeAttr('id');
    
    $(window).on('scroll', function () {
        var innerHeight = window.innerHeight; //浏览器 文档窗口高度
        var pageYOffset = window.pageYOffset; //页面 滚动距离 


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
        return $allotCostPar.data('data-fixed');
    }

    function setFixed() {
        $allotCostPar.data('data-fixed', true)
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
        $allotCostPar.data('data-fixed', false)
            .removeAttr('style').css('width', '112px');
        $allotCostClone.hide();
    }

}

})
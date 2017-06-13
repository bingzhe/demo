$(function () {
    var imgCount = $("#click-slider-box li").length;
    var liWidth = $("#click-slider-box li:first").width();
    liWidth = parseFloat(liWidth); //一次点击移动距离+margin
    $("#click-slider-box ul").css({
        width: imgCount * liWidth
    });
    var clickCount = 0;
    if (imgCount % 5 === 0) {
        clickCount = imgCount / 5 - 1;
    } else {
        clickCount = parseInt(imgCount / 5);
    }

    var isClick = clickCount; //按钮是否可以点击参数 以此参数设left
    var setLeft = function () { //设置 ul的 left
        var left = -(clickCount - isClick) * (liWidth * 5);
        $("#click-slider-box ul").css({
            "left": left
        });
    };
    
    var picTimer;
    function picTimerFun() {
        picTimer = setInterval(function () {
            console.log(11111111111111)


            if (isClick == 0) {
                isClick = clickCount;
            } else {
                isClick--;
            }
            setLeft();
        }, 5000)
    }
    picTimerFun()

    //点击左移动
    $(".c-btn-right").click(function () {
        isClick--;
        if (0 <= isClick && isClick <= clickCount) {
            setLeft()
        } else {
            //到最左边回到右边
            if (isClick === -1) {
                $("#click-slider-box ul").css({
                    "left": 0
                });
                isClick = clickCount;
            } else {
                isClick++;
                return;
            }

        };

    });

    //点击右移
    $(".c-btn-left").click(function () {
        isClick++;
        if (isClick <= clickCount) {
            setLeft();
        } else {
            //最右边回到最左边
            if (isClick === clickCount + 1) {
                $("#click-slider-box ul").css({
                    "left": -clickCount * liWidth * 5
                });
                isClick = 0;
            } else {
                isClick--
            }
        };
    });

    $(".c-click-slider-box").hover(function () {
        clearInterval(picTimer); 
    }, function () {
        picTimerFun();
    })
});
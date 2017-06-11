    // $(function() {
    //     debugger;
    //     var imgCount = $('#showArea').find('a').length;
    //     var liWidth = $('#showArea').find('a').outerWidth(true);
    //     liWidth = parseFloat(liWidth); //一次点击移动距离+margin
    //     $("#showArea").css({
    //       width: imgCount * liWidth
    //     });
    //     var clickCount = 0;
    //     // if(imgCount%5 === 0){
    //     //     clickCount = imgCount/5 - 1;
    //     // } else {
    //     //     clickCount = parseInt(imgCount/5);
    //     // }

    //     var clickCount = imgCount - 5;
    //     var isClick = clickCount; //按钮是否可以点击参数 以此参数设left
    //     var setLeft = function() { //设置 ul的 left
    //       var left = -(clickCount - isClick) * liWidth;
    //       $("#showArea").css({
    //         "left": left
    //       });
    //     };
    //     //点击左移动
    //     $("#gotop").click(function() {

    //       isClick--;
    //       if (0 <= isClick && isClick <= clickCount) {
    //         setLeft()
    //       } else {
    //         //到最左边回到右边
    //         if( isClick === -1 ){
    //             $("#showArea").css({
    //                 "left": 0
    //             });
    //             isClick = clickCount;
    //         } else {
    //             isClick++;
    //             return;
    //         }

    //       };

    //     });

    //     //点击右移
    //     $("#gobottom").click(function() {

    //       isClick++;

    //       if (isClick <= clickCount) {
    //         setLeft();
    //       } else {
    //           //最右边回到最左边
    //         if ( isClick === clickCount+1){
    //             $("#showArea").css({
    //                 "left": -clickCount*liWidth
    //             });
    //             isClick = 0;
    //         } else {
    //             isClick--
    //         }

    //       };



    //     });
    // });
    $(function () {
      var imgCount = $('#listImg').find('li').length;
      var liWidth = $('#listImg').find('li').outerWidth(true);
      liWidth = parseFloat(liWidth); //一次点击移动距离+margin
      $("#listImg").css({
        width: imgCount * liWidth
      });
      var clickCount = 0;

      var clickCount = imgCount - 5;
      var isClick = clickCount; //按钮是否可以点击参数 以此参数设left
      var setLeft = function () { //设置 ul的 left
        var left = -(clickCount - isClick) * liWidth;
        $("#listImg").css({
          "left": left
        });
      };
      //点击左移动
      $("#dirListRight").click(function () {
        isClick--;
        if (0 <= isClick && isClick <= clickCount) {
          setLeft()
        } else {
          isClick++;
        };
      });

      //点击右移
      $("#dirListLeft").click(function () {
        isClick++;
        if (isClick <= clickCount) {
          setLeft();
        } else {
          isClick--
        };

      });
    });
function getValues() {
    var valueArr = [];
    var $search_l = $(".search-form-div .search_l input");
    var $search_H = $(".search-form-div .searchH input");
    // 报关方式
    var $declareType = $(".search-form-div .search_l button[data-id='declareType']").attr("title");
    //处理环节
    var $drawbackStatus = $(".search-form-div .search_l button[data-id='drawbackStatus']").attr("title");
    for (var i = 0; i < $search_l.length; i++) {
        valueArr.push($search_l.eq(i).val());
    }
    for (var i = 0; i < $search_H.length; i++) {
        valueArr.push($search_H.eq(i).val());
    }
    valueArr.push($declareType);
    valueArr.push($drawbackStatus);

    //存储，IE6~7 cookie 其他浏览器HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem("menuTitle", valueArr);
    } else {
        Cookie.write("menuTitle", valueArr);
    }
}
//数据读取
var strStoreDate = window.localStorage ? localStorage.getItem("menuTitle") : Cookie.read("menuTitle");

console.log(strStoreDate.split(","));
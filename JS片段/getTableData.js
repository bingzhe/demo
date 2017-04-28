/*遍历table拿到所有的数据*/
function traverseTable() {
    var purchaseTitle = [], //存要保存成的对象的key
        purchaseItem = []; //存要保存的的对象的value
    $th = $("#table .tableFloatingHeaderOriginal th"),
        $tr = $("#table tbody tr"),
        arr = [];

    $th.each(function() {
        purchaseTitle.push($(this).attr("data-field"));
    });
    $tr.each(function() {
        purchaseItem = [];
        for (var i = 0; i < purchaseTitle.length; i++) {
            if ($(this).find("td").eq(i).find("input")[0]) {
                purchaseItem.push($(this).find("td").eq(i).find("input").val())
            } else {
                purchaseItem.push($(this).find("td").eq(i).html());
            }
        }
        var obj = {};
        for (var i = 0; i < purchaseTitle.length; i++) {
            obj[purchaseTitle[i]] = purchaseItem[i];
        }
        //将不存在的数组列也加上 availableStock purchaseQuality rejectQuality
        if (purchaseTitle.indexOf("availableStock") == -1) {
            obj["availableStock"] = "0";
        }
        if (purchaseTitle.indexOf("noQcQuality") == -1) {
            obj["noQcQuality"] = "0";
        }
        if (purchaseTitle.indexOf("rejectQuality") == -1) {
            obj["rejectQuality"] = "0";
        }
        arr.push(obj);
    })
    return arr;
}
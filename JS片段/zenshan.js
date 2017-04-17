//新增第三方订单编号的输入框
function addThirdNum(obj) {
    // 如果输入框没有内容就不允许新增
    var thirdInput = $(obj).parent().prev().find("[name='thirdSpecial']").val();
    if (thirdInput == '') {
        $.jGrowl("该行没有值不能新增");
        return;
    }
    $(obj).addClass('hide');
    if ($(obj).prev().attr('class').indexOf('hide') >= 0) {
        $(obj).prev().removeClass('hide');
    }

    var str = '<div>';
    str += '<div>';
    str += '<div class="col-lg-7">';
    str += '<input type="text"  name="thirdSpecial" class="form-control thirdSpecial" placeholder="请输入第三方订单编号"/>';
    str += '</div>';
    str += '<div class="col-lg-5">';
    str += '<button type="button" class="btn btn-danger btn-sm hide" onclick="deleThirdNum(this)">删除</button>';
    str += '<button type="button" class="btn btn-success btn-sm addThirdSpecial" onclick="addThirdNum(this)">新增</button>';
    str += '</div></div></div>';
    $("#thirdTd").append(str)
}

// 删除第三方订单编号
function deleThirdNum(obj) {
    $(obj).parent().parent().parent().remove();
    //	var len = $(".addThirdSpecial").length;
    //	$($(".addThirdSpecial")[len - 1]).removeClass('hide');
    //	if ($(".thirdSpecial").length == 1) {
    //		$(".thirdSpecial").parent().parent().find(".btn-danger").addClass('hide');
    //	}
}

// 新增运输信息物流单号，价格输入框
function addTransportNum(obj) {
    // 如果输入框没有内容就不允许新增
    var transportNumInput,
        transportPriceInput;

    transportNumInput = $(obj).parent().prevAll().find("[name='transportNum']")
        .val();
    transportPriceInput = $(obj).parent().prevAll().find(
        "[name='tansportPirce']").val();
    // 输入框没有内容就不用于新增
    if (transportNumInput == '' || transportPriceInput == '') {
        $.jGrowl("该行没有值不能新增");
        return;
    }
    // 新增按钮切换到删除按钮
    $(obj).addClass('hide').siblings().removeClass('hide');

    var str = '<div>' +
        '<div class="col-lg-5">' +
        '<input type="text"  class="form-control transportNumSpecial" name="transportNum" placeholder="请输入物流单号"/>' +
        '</div>' +
        '<div class="col-lg-3">' +
        '<input type="text"  class="form-control transportPriceSpecial" name="tansportPirce" placeholder="请输入价格"/>' +
        '</div>' +
        '<div class="col-lg-4">' +
        '<button type="button" class="btn btn-danger btn-sm hide" onclick="deletTransportNum(this)">删除</button>' +
        '<button type="button" class="btn btn-success btn-sm" onclick="addTransportNum(this)">新增</button>' +
        '</div>' + '</div>';
    // 在底部添加新的输入框
    $("#transportTd .transportTd").append(str);
}
// 新增运输信息物流单号，价格输入框
function deletTransportNum(obj) {
    $(obj).parent().parent().remove();
}
function commentinit() {
    var box = $("#addPicInfoBox"),
        html = $("#addPicPanel").html(),
        max = $("#addPicPanel").attr("max"),
        maxImgSize = $("#addPicPanel").attr("maxImgSize");
    max = parseInt(max, 10) || 0;
    maxImgSize = parseInt(maxImgSize, 10) || 0;
    var checkPicNum = max ? (max - 1) : 0;
    $("#addPicPanel").remove();
    $("#addPic").click(function () {
        if (checkPicNum <= max) {
            box.find(".last").before(html.replace(/_index_/g, checkPicNum).replace(/_indexNum_/g, checkPicNum));
            $("#mutifilecount").val(checkPicNum);
            checkPicNum++
        }
        return false
    });
    $("#addPicInfoBox").on("change", ".file-img",
        function () {
            var $this = $(this),
                input = $this.nextAll(".fakefile").find("input");
            input.val($this.val().substring($this.val().lastIndexOf("\\") + 1))
        }).on("click", ".del",
        function () {
            $(this).parent().remove();
            checkPicNum--;
            $("#mutifilecount").val(checkPicNum);
            return false
        });
}

function onloadFun(newFun) {
    var oldFun = window.onload;
    if (typeof window.onload != "function") {
        window.onload = newFun;
    } else {
        window.onload = function () {
            oldFun();
            newFun();
        }
    }
}

function ProImgShow(index) {
    this.lb_content = document.getElementById("lb-content");
    this.contentHereImg = document.getElementById("contentHere").getElementsByTagName("img")[0];
    this.thumbImg = document.getElementById("lb-thumbnail").getElementsByTagName("img");
    this.changeBtn = document.getElementById("lb-changeBtn").getElementsByTagName("a");
    this.prevBtn = document.getElementById("lb-previous");
    this.netBtn = document.getElementById("lb-next");
    this.loadingImg = document.getElementById("loadingImg");
    this.index = index || 0;

}
ProImgShow.prototype = {

    ini: function () {
        if (this.thumbImg.length <= 0) {
            return;
        }
        this.toggleClass(this.thumbImg[this.index]);
        this.changeImg(this.thumbImg[this.index].getAttribute("bgSrc"));
        this.thumImgHover();
        this.btnEvent();
    },


    thumImgHover: function () {
        var that = this;
        for (var i = 0, len = that.thumbImg.length; i < len; i++) {
            that.thumbImg[i].index = i;
            that.thumbImg[i].onmouseover = function () {
                var imgSrc = this.getAttribute("bgSrc");
                that.changeImg(imgSrc);
                /*that.contentHereImg.src=imgSrc;*/
                that.toggleClass(this);
                that.index = this.index;
            }
        }
    },

    toggleClass: function (elemtObj) {
        for (var j = 0, len = this.thumbImg.length; j < len; j++) {
            this.thumbImg[j].parentNode.className = "";
        }
        if (elemtObj) {
            elemtObj.parentNode.className = "hover";
        }
    },

    scrollImg: function (direction) {
        if (direction == "left") {
            this.index--;
            this.index < 0 ? this.index = this.thumbImg.length - 1 : "";
        } else if (direction == "right") {
            this.index++;
            this.index > this.thumbImg.length - 1 ? this.index = 0 : "";
        }
        this.changeImg(this.thumbImg[this.index].getAttribute("bgSrc"));

    },

    changeImg: function (src) {
        var img = new Image();
        var that = this;

        that.loadingImg.style.display = "block";
        img.onload = function () {
            that.contentHereImg.src = this.src;
            that.loadingImg.style.display = "none";
        }

        img.src = src;
    },

    btnEvent: function () {
        var that = this;

        for (var i = 0, len = that.changeBtn.length; i < len; i++) {
            that.changeBtn[i].onclick = function () {
                if (this.id == "lb-previous") {
                    that.scrollImg("left");
                } else if (this.id == "lb-next") {
                    that.scrollImg("right");
                }
                that.toggleClass(that.thumbImg[that.index]);
            }
        }

        this.lb_content.onmouseover = function () {

            for (var j = that.changeBtn.length - 1; j >= 0; j--) {
                that.changeBtn[j].style.display = "block";
            };
        }

        this.lb_content.onmouseleave = function () {

            for (var j = that.changeBtn.length - 1; j >= 0; j--) {
                that.changeBtn[j].style.display = "none";
            };
        }


    }
};

function ini() {

    var ProImgShowFun = new ProImgShow(0);
    ProImgShowFun.ini();
}

function slideInit() {
    var wid = parseInt($(".allHotPro li").width());
    var mar = parseInt($(".allHotPro li").css('margin-right').replace('px', ''));
    var sWidth = parseInt(wid + mar) * 4;
    var slider_num = $("#AECMP_HISTORY li").length; //Recently viewed的li 
    var slider_numRe = $("#proRightRecommend li").length; //RECOMMENDED 的 li
    var len = 1;
    var index = 0;
    var indexRe = 0; //RECOMMENDED 的 计数器
    var picTimer;
    var ele = 0;
    len = Math.ceil(slider_num / 4);
    var lenRe = Math.ceil(slider_numRe / 4);
    $("#AECMP_HISTORY").css("width", 1000 * len + 45);
    $("#proRightRecommend").css("width", 1000 * lenRe + 45)
    // 将li中的字母全部转换为大写
    $("#hot-menu li").text().toUpperCase();
    $("#hot-menu li").mouseover(
        function () {
            var num = $(this).index();
            $("#hot-menu li").removeClass("menu-li-current");
            $("#hot-menu li").eq(num).addClass("menu-li-current");
            $('.allHotPro').hide();
            $('.allHotPro').eq(num).show();
            ele = num;
        }

    );
    $("#hotProList").hover(function () {
        clearInterval(picTimer);
    }, function () {
        picTimer = setInterval(function () {
            /*RR */
            if ($("#hot-menu li:first-child").hasClass('menu-li-current')) {
                indexRe++;
                if (indexRe === lenRe) {
                    indexRe = 0;
                }
                showPics(indexRe);

            } else {
                index++;
                if (index === len) {
                    index = 0;
                }
                showPics(index);
            }
        }, 5000)
    }).trigger("mouseleave");

    $(".preBtn").click(function () {
        if ($("#hot-menu li:first-child").hasClass('menu-li-current')) {
            indexRe -= 1;
            if (indexRe == -1) {
                indexRe = lenRe - 1;
            }
            showPics(indexRe);
        } else {
            index -= 1;
            if (index == -1) {
                index = len - 1;
            }
            showPics(index);
        }
    });
    $(".nextBtn").click(function () {
        if ($("#hot-menu li:first-child").hasClass('menu-li-current')) {
            indexRe += 1;
            if (indexRe == lenRe) {
                indexRe = 0;
            }
            showPics(indexRe);
        } else {
            index += 1;
            if (index == len) {
                index = 0;
            }
            showPics(index);
        }
    });

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $('.allHotPro').eq(ele).stop(true, false).animate({
            "left": nowLeft
        }, 300);
    }
}
$.ajax({
    url: '/goods/index/ajaxhistory/goods_id/' + goodsId,
    type: 'get',
    success: function (data) {
        if (data != '0') {
            $('#AECMP_HISTORY').html(data);
            slideInit();
        }else{
            slideInit();
        }
    },
    error: function () {

    }
});
$(document).ready(function () {
    $.ajax({
        url: '/goods/index/ajaxcommentslist/goods_id/' + goodsId,
        type: 'get',
        success: function (data) {
            if (data != '0') {
                $('#AECMP_COMMENT').html(data);
                commentinit();
                /*onloadFun(ini);*/
                ini();
                initImgVideoEvent();
                $('#xubox_layer5 a.xubox_close').click(function () {
                    $('#xubox_shade5').toggle(50);
                    $('#xubox_layer5').toggle(50);
                });
                $('#xubox_layer6 a.xubox_close').click(function () {
                    $('#xubox_shade6').toggle(50);
                    $('#xubox_layer6').toggle(50);
                });
                $('.postVideList2 a').click(function () {
                    $('#video-contentHere').html('<iframe width="570" height="360" frameborder="0" allowfullscreen="" src="' + $(this).attr('data-video') + '">');
                    $('#xubox_shade6').toggle(50);
                    $('#xubox_layer6').toggle(50);
                });
                $('#xubox_layer3 a.xubox_close').click(function () {
                    $('#xubox_shade3').toggle(50);
                    $('#xubox_layer3').toggle(50);
                });
                $('.postImgList li img').click(function () {
                    /*onloadFun(ini);*/
                    $('#xubox_shade3').toggle(50);
                    $('#xubox_layer3').toggle(50);
                });
                $('#addVideo').click(function () {
                    $('#add-video-panel').toggle(300);
                });
                $('#addphotos').click(function () {
                    $('#add-photos-panel').toggle(300);
                });
            }
        },
        error: function () {}
    });
    $.ajax({
        url: '/goods/index/ajaxquestion/goods_id/' + goodsId,
        type: 'get',
        success: function (data) {
            if (data != '0') {
                $('#AECMP_CONSULT').html(data);
            }
        },
        error: function () {

        }
    });
});

function initImgVideoEvent() {
    $('.postVideList1 a').click(function () {
        $('#video-contentHere').html('<iframe width="570" height="360" frameborder="0" allowfullscreen="" src="' + $(this).attr('data-video') + '">');
        $('#xubox_shade6').toggle(50);
        $('#xubox_layer6').toggle(50);
    });
    $('.commentrows img.customer-base-image').click(function () {
        var self_img = $(this).attr('src');
        $('#my-contentHere img').attr('src', self_img);
        $('#xubox_shade5').toggle(50);
        $('#xubox_layer5').toggle(50);
    });
}
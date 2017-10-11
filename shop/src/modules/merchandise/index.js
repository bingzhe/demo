export const GoodList = {
    
    /**
     * 模拟锚跳转
     * @param { Object } ele Dom元素
     * @param { String } selector 选择符
     */

    goAnchor: function (ele, selector) {
        let anchor = ele.querySelector(selector);

        document.body.scrollTop = anchor.offsetTop;  //chrome
        document.documentElement.scrollTop = anchor.offsetTop; //firefox
    }
};
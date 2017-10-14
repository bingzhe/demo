import { getTableList, deleteTableList, changeStatus } from './api';
import { SaleStatus } from "@/config/cfg";

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
    },

    /**
     *  删除菜品
     * @param { Array } foodIdArr  要删除的id
     * @param { Function } callback 回调 
     */
    deleteFoodItems: function (foodIdArr, callback) {
        let data = {
            del_food: 1,
            food_id_list: foodIdArr
        };

        deleteTableList(data, callback);
    },

    /**
     * 搜索
     * @param {Number} saleStatus //上下架状态
     * @param {String} searchName //名称或者编号
     * @param {Function} callback //回调
     */
    searchGetList: function (saleStatus, searchName, callback) {
        let data = null;

        if (saleStatus !== SaleStatus.YES && saleStatus !== SaleStatus.NO) {
            data = {
                foodlist: 1,
                food_name: searchName,
            };
        } else {
            data = {
                foodlist: 1,
                food_name: searchName,
                sale_off: saleStatus
            };
        }

        getTableList(data, callback);
    },

    /**
     * 上架
     * @param { Array } foodIdArr  要上架的id
     * @param { Function } callback 回调 
     */
    changeStatusOn: function (foodIdArr, callback) {
        let data = {
            sale_off_opr: 1,
            food_id_list: foodIdArr,
            is_sale_off: SaleStatus.YES,
        };

        changeStatus(data, callback);
    },
    /**
    * 下架
    * @param { Array } foodIdArr  要上架的id
    * @param { Function } callback 回调 
    */
    changeStatusOff: function (foodIdArr, callback) {
        let data = {
            sale_off_opr: 1,
            food_id_list: foodIdArr,
            is_sale_off: SaleStatus.NO,
        };

        changeStatus(data, callback);
    },

};
import { Util } from '@/config/util';
/* author rr */

/**
 * 拉取详情列表table表格数据
 * @param {Object} data 请求参数
 * @param {Function} callback 请求成功回调
 */
export const getTableList = function (data, callback) {

    Util.DataEncSubmit('menu_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });

    //<<<<<<<<<<<<<<<<<
    // $.ajax('https://easy-mock.com/mock/59ac2ccae0dc6633419a26ab/sailing/table_get.php',
    //     data).done(function (resp) {
    //         callback(resp);
    //     }
    //     );
};

/**
 * 拉取菜品分类
 */

export const getTableCategory = function (callback) {
    let data = {
        list: 1,
    };
    Util.DataEncSubmit('category_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });
};

/**
 * 拉取菜品编辑信息
 * @param {Function} callback 回调
 */
export const getFoodEditor = function (callback) {
    let data = {
        foodinfo: 1,
        food_id: "210"
    };
    Util.DataEncSubmit('menu_get.php', data, (resp) => {
        if (callback && typeof callback === "function") {
            callback(resp);
        }
    });

};
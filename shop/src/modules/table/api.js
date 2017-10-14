import { Util }from '@/config/util';
import Vue from 'vue';
export const apiMethods ={
	//获取餐桌列表
	getTableData: function(data, callback) {

		Util.DataEncSubmit('seat_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	//数据改动之后保存
	changeTableData: function(data,callback) {
		Util.DataEncSubmit('seat_save.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	//操作数据之后刷新页面
	shallowRefresh:function(name) {
    	router.replace({ path: '/refresh', query: { name: name }})
  	},
  	//获取二维码
  	getQrCode:function(data,callback) {
  		Util.DataEncSubmit('img_get.php', data, (resp) => {
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
  	}
}
import { Util }from '@/config/util';
export const apiMethods ={
	//获取餐桌列表
	getTableData: function(data, callback) {

		Util.DataEncSubmit('seat_get.php', data, (resp) => {
			//		console.log(resp)
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	},
	//数据改动之后保存
	changeTableData: function(data,callback) {
		Util.DataEncSubmit('seat_save.php', data, (resp) => {
			//		console.log(resp)
			if(callback && typeof callback === "function") {
				callback(resp);
			}
		});
	}

}
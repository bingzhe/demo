<template>
	<div class="table_list">
		<!--头部搜索-->
		<div class="search">
			<div class="btn">
				<!--名称或编号-->
				<el-select allow-create filterable v-model="no" placeholder="名称或编号">
					<el-option v-for="item in  tableData " :label="item.seat_id" :value="item.seat_id" :key="item.seat_id">
					</el-option>

				</el-select>
				<!--餐桌类型-->
				<el-select allow-create filterable v-model="table" placeholder="餐桌类型">
					<el-option v-for="item in  tableData " :label="item.seat_name" :value="item.seat_name" :key="item.seat_name">
					</el-option>
				</el-select>
				<!--搜索按钮-->
				<button  class="blue search_button">
					搜索
				</button>
			</div>
			<div class="btn">
				<!--创建-->
				<button  class="blue create_button">
					创建
				</button>
				<!--导出二维码-->
				<button class="blue export_button">
					导出二维码
				</button>
				<!--删除-->
				<button  class=" red delete_button"@click="deleteDatasInBtnGroup()">
					删除
				</button>
			</div>
		</div>

		<!--列表-->
		<div class="table_info">
			<el-table :data="tableData" @selection-change="selectItem" :row-class-name="tableRowClassName" style="width: 100%" highlight-current-row>
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="seat_id" label="编号" align="center">
				</el-table-column>
				<el-table-column prop="seat_name" label="餐桌台号" align="center">
				</el-table-column>
				<el-table-column prop="seat_region" label="餐桌区域"align="center" >
				</el-table-column>
				<el-table-column prop="seat_type" label="餐桌类型" align="center">
				</el-table-column>
				<el-table-column prop="seat_size" label="可供就餐人数" align="center">
				</el-table-column>
				<el-table-column prop="price" label="餐位费" align="center" >
				</el-table-column>
				<el-table-column prop="qr_code" label="二维码" align="center">
				</el-table-column>
				<el-table-column  label="操作"  inline-template align="center">
				<div class="btng">
				<span class="blue" type="text" size="small">
				导出
				</span>
				<span class="blue" type="text" size="small">
				编辑
				</span>
				<span class="red" type="text" size="small" @click="confirmDelete(row)">
				删除
				</span>
					
				</div>
				</el-table-column>
			</el-table>
		</div>
		
	</div>
</template>

<script>
import { Util } from '@/config/util';
import { apiMethods } from'../api';
//import btnGroup from "./children/btn";
export default {
	data() {
		return {
			no: "",//名称或编号
			table: "",//餐桌类型
			tableData: [],
			multipleSelection:[],
			list: {}

		};
	},
//	components:{btnGroup},
	methods: {
			//表格斑马线
			tableRowClassName(row, index) {
				if (index % 2 === 0) {
					return "info-row";
				} else if (index % 2 === 1) {
					return "positive-row";
				}
			},
			//复选框
			selectItem(val) {
				this.multipleSelection = val;
			},
//			获取选中的列表的id
			 getSelectedIds() {
		        let array = []
		        this.multipleSelection.forEach((res) => {
		          array.push(res.seat_id)
		        })
//		        console.log(array)
		        return array
		      },
			//单个删除
			confirmDelete(item) {
		        this.$confirm('确认删除该菜单?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
//		        	item.seat_id=item.seat_id.toString()
		        	apiMethods.changeTableData({
		        		seat_delete:1,
		        		seat_id_list:[item.seat_id]
		        	},(resp)=>{
	      			console.log(resp)
	      			})
		        })
      		},
      		//多选删除
      		deleteDatasInBtnGroup() {
      			
      			 if (!this.multipleSelection.length) {
			          alert("你还没有勾选任何选项")
			          return;
		        }
      			
	      		apiMethods.changeTableData({
	      			seat_delete:1,
		        	seat_id_list:this.getSelectedIds()
	      		},(resp)=>{
	      			console.log(resp)
	      		})
      		}
	},
	created() {
			//初始化表格
			apiMethods.getTableData({
				get_seat_list:1,
				userid:1
			},(resp)=>{
				this.tableData = resp.data.seatlist
			})
	}
}; 
</script>

<style lang="scss">
@import 'src/styles/mixin.scss';
*{
	padding: 0;
	margin: 0;
}
.table_list {
	background: #FFFFFF;
	padding: 20px;
	
}

.el-select {
	width: 160px;
	height: 34px;
	margin-right: 10px;
}
.search{
	display: flex;
	justify-content: space-between
}
.btn button{
	width: 100px;
	height: 34px;
	border-radius: 3px;
	background: #FFFFFF;
}
.btn .blue {
	margin-right: 10px;
	color: #4877E7;
	border: 1px solid #4877E7;
}
.btn .red {
	margin-right: 0px;
	color: #E7487E ;
	border: 1px solid #E7487E ;
}
.blue{
	font-size: 14px;
	color:  #4877E7;
}

.red {
	font-size: 14px;
	color: #E7487E ;
	
}
.btng span{
	width: 29px;
	height: 19px;
	margin-right: 20px;
}
.table_info {
	padding-top: 20px;
}

.el-table .info-row {
	background: white;
}

.el-table .positive-row {
	background: #F6F8FC ;
}
/*.el-table-column:hover{
	background: "";
}*/
</style>
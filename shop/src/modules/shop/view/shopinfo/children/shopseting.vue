<template>
	<div id="shopSeting" class="warp">
		<nav class="nvs">
			<el-breadcrumb separator=">">
 			 <el-breadcrumb-item :to="{ path: '/shop' }">店铺管理</el-breadcrumb-item>
  				<el-breadcrumb-item :to="{path:'/shop/shopinfo'}">店铺信息</el-breadcrumb-item>
  				<el-breadcrumb-item>编辑店铺设置</el-breadcrumb-item>
			</el-breadcrumb>
		</nav>
		<div class="title">
			编辑店铺设置
		</div>
		<section class="shopSeting">
			<div class="setInfo">
				<el-form label-width='110px'>
					<el-form-item class='main ' id='top' label="点餐系统">
						<el-button>启用</el-button>
						<el-button>暂时</el-button>
						<p class="injection">注：选暂停时，客人手机上会显示为系统升级维护中</p>
					</el-form-item>
					<el-form-item class='main' label='启用支付方式'>
						<el-checkbox-group v-model="checkboxGroup1">
							<el-checkbox-button v-for="payment in Payments" :label="payment" :key="payment">{{payment}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='订单付款时间'>
						<el-checkbox-group v-model="checkboxGroup2">
							<el-checkbox-button v-for="paytimed in Paytime" :label="paytimed " :key="paytimed ">{{paytimed}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='销售方式'>
						<el-checkbox-group v-model="checkboxGroup3">
							<el-checkbox-button v-for="sells in sell" :label="sells " :key="sells ">{{sells}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='main' label='餐厅标签'>
						<el-checkbox-group v-model="checkboxGroup4">
							<el-checkbox-button v-for="rastuan in restauran " :label="rastuan " :key="rastuan">{{rastuan}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item class='businessTime' label="营业时间">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class='dateSet' label="餐时设置">
						<el-checkbox-group v-model="form.type">
							<el-checkbox label="早市" name="type"></el-checkbox>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-checkbox label="午市" name="type"></el-checkbox>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-checkbox label="晚市" name="type"></el-checkbox>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-checkbox label="夜宵" name="type"></el-checkbox>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item  class='invoice nomain clearfix' label="发票">
						<el-button type='text' class='noInvoice left' @click.native='shows'>不提供发票</el-button>
					</el-form-item>
					<el-form-item class='paperTickets' label="纸票" v-show='show'>
						<el-checkbox-group v-model="checkboxGroup6">
							<el-checkbox-button  v-for="papers in paper" :label="papers" :key="papers">{{papers}}</el-checkbox-button>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="发票备注">
						<el-input type='textarea' placeholder='备注文字总数不得超过120字'>

						</el-input>
					</el-form-item>
					<el-form-item class='clearfix' label="店铺图片">
						<div class="busPic left">

						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="https://baidu.com">
								<el-button size="small" type="primary">上传</el-button>
							</el-upload>
							<div class="text-warp">
								<p class="text top">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<div class="bottom">
						<button class="blue">保存</button>
						<button class="default">取消</button>
					</div>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
	const PaymentMethod = ['现金支付', '刷卡支付', '支付宝支付', '微信支付'];
	const PayTime = ['餐前支付', '餐后支付'];
	const Sell = ['在店吃', '打包', '自提', '外卖'];
	const Restaurantlabel = ['湘菜', '粤菜', '川菜'];
	const Invoice = ['纸质发票', '电子发票'];
	const PaperTickets = ['增值税普通发票', '增值税专用发票'];
	export default {
		data() {
			return {
				show:true,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				checkboxGroup1: [''],
				Payments: PaymentMethod,
				checkboxGroup2: [''],
				Paytime: PayTime,
				checkboxGroup3: [''],
				sell: Sell,
				checkboxGroup4: [''],
				restauran: Restaurantlabel,
				checkboxGroup5: [''],
				invoice: Invoice,
				checkboxGroup6: [''],
				paper: PaperTickets
			};
		},
		methods:{
			shows(){
				this.show = ! this.show;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'src/styles/mixin.scss';
	.warp {
		.nvs{
		background:#EFF3FA;
		height:26px;
	}
		background:#fff;
		.title {
			text-indent: 14px;
			@include fc($sizes, $grey);
			height: 40px;
			line-height: 40px;
			background: #F6F8FC;
		}
		.shopSeting {
			margin: 40px 0 0 162px;
			min-width:760px;
			max-width:800px;
			.injection {
				@include fc(12px, #9b9b9b);
			}
			.line {
				display: inline-block;
				height: 30px;
				width: 1px;
				background: #d8d8d8;
				margin: 4px 20px 0 10px;
			}
			.shopPic {
				@include wh(100px, 100px);
				background: #e1e1e1;
			}
			.busPic {
				@include wh(100px, 100px);
				background: #e1e1e1;
			}
			.text-warp {
				@include fc(12px, #9b9b9b);
				margin-top: 40px;
			}
			.picInfo {
				width: 54%;
				margin-left: 20px;
			}
		}
		.bottom {
			width: 100%;
			text-align: center;
			margin-bottom: 30px;
			margin-left: 280px;
			.blue {
				@include fc(16px, #ffffff);
				background: #4877E7;
				@include wh(160px, 40px);
				line-height: 40px;
				border-radius: 6px;
			}
			.default {
				@include fc(14px, #4877E7);
				background: #ffffff;
				@include wh(160px, 40px);
				line-height: 40px;
				border-radius: 6px;
				border: 1px solid #4877E7;
				margin-left: 50px;
			}
		}
	}
</style>

<style lang="scss">
	@import 'src/styles/mixin.scss';
	#shopSeting {
		#top {
			margin-bottom: 5px;
		}
		.dateSet .el-input__inner {
			@include wh(120px, 34px);
			margin: 5px;
		}
		.businessTime .el-input__inner {
			@include wh(120px, 34px);
			margin-right: 10px;
		}
		.el-checkbox__label {
			padding-left: 9px;
		}
		.el-textarea__inner {
			@include wh(400px, 100px);
			resize: none;
			border-radius: 0;
			border: 1px solid #D9D9D9;
		}
		.picInfo .el-button {
			width: 60px;
			height: 30px;
			background: #ffffff;
			font-size: 14px;
			color: #4877E7;
			line-height: 30px;
			border-radius: 0;
			padding: 0;
		}
		.el-button {
			border: 1px solid #D8D8D8;
			border-radius: 2px;
			padding: 0;
		}
		.main .el-checkbox-button__inner {
			padding: 0;
			@include wh(80px, 30px);
			line-height: 30px;
			color: #333333;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
		}
		.main .el-checkbox-button.is-checked .el-checkbox-button__inner {
			color: #4877E7;
			background-color: #fff;
			border-color: #4877E7;
			background: url(../../img/select.png)no-repeat;
			background-position-x:66px;
			box-shadow: none;
		}
		.main .el-checkbox-button,
		.el-checkbox-button__inner {
			margin-right: 10px;
		}
		.paperTickets .el-checkbox-button__inner{
			@include wh(160px,30px);
			padding: 0;
			line-height: 30px;
			color: #333333;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
		}
		.paperTickets .el-checkbox-button.is-checked .el-checkbox-button__inner {
			color: #4877E7;
			background-color: #fff;
			border-color: #4877E7;
			background: url(../../img/select.png)no-repeat;
			background-position-x:146px;
			box-shadow: none;
		}
		.nomain .el-checkbox-button__inner{
			@include wh(100px,30px);
			padding: 0;
			line-height: 30px;
			color: #333333;
			border: 1px solid #d8d8d8;
			border-radius: 2px;
		}
		.nomain .noInvoice .el-checkbox-button__inner{
			background: #4877E7;
			color: #fff;
		}
		.nomain .noInvoice .el-checkbox-button.is-checked .el-checkbox-button__inner{
			background: #3254A5;
			color: #fff;
		}
		
		.nomain .el-checkbox-button.is-checked .el-checkbox-button__inner {
			color: #4877E7;
			background-color: #fff;
			border-color: #4877E7;
			background: url(../../img/select.png)no-repeat;
			background-position-x:86px;
			box-shadow: none;
		}
		.nomain .el-button{
			@include wh(100px,30px);
			margin-top:4px;
			background: #4877E7;
			color:#fff;
			border-radius: 2px;
		}
		.main .el-button{
			@include wh(80px,30px);
			margin-right: 6px;
			background: #4877E7;
			color:#fff;
			border-radius: 2px;
		}
		.main .el-button:active{
			color: #333;
			background:#fff;
			border-radius: 2px;
			border-color:#3254A5;
		}
		.main .el-button:focus, .el-button:hover{
			color: #fff;
			background:#3254A5;
			border-radius: 2px;
			border-color:#3254A5;
		}
		.nomain .el-button:active{
			color: #333;
			background:#fff;
			border-radius: 2px;
			border-color:#3254A5;
		}
		.nomain .el-button:focus, .el-button:hover{
			color: #fff;
			background:#3254A5;
			border-radius: 2px;
			border-color:#3254A5;
		}
		.el-breadcrumb__item__inner, .el-breadcrumb__item__inner a{
		color:#333;
		font-size: 12px;
	}
	.el-breadcrumb__separator{
		margin: 0 5px;
		color: #333;
	}
	.el-breadcrumb__item:last-child .el-breadcrumb__item__inner, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover{
		color: #4877E7;
	}
	}
</style>
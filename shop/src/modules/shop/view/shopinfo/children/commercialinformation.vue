<template>
	<div id="commercial" class="warp">
		<nav class="nvs">
			<el-breadcrumb separator=">">
 			 <el-breadcrumb-item :to="{ path: '/shop' }">店铺管理</el-breadcrumb-item>
  				<el-breadcrumb-item :to="{path:'/shop/shopinfo'}">店铺信息</el-breadcrumb-item>
  				<el-breadcrumb-item>编辑工商信息</el-breadcrumb-item>
			</el-breadcrumb>
		</nav>
		<section class="commercialinformation">
			<div class="title">
				编辑工商信息
			</div>
			<div class="info">
				<el-form label-width="155px" ref="form" :model="form">
					<el-form-item label="企业名称">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="法人代表">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="法人手机号">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="法人身份证号码">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="法人身份证照片">
						<div class="main clearfix">
							<div class="frontFace left" v-for='(item,index) in main'>
								<h3 class=" titles" >{{item.text}}</h3>
								<div class="photo1 left">
									<img :src='item.imgs' alt="" />
								</div>
								<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								    <el-button size="small" type="primary">{{item.upload}}</el-button>
								</el-upload>
							</div>
							<!--<div class="reverseSide left">
								<h3 class="titles">背面</h3>
								<div class="photo2 left">
										<img src='' alt="" />
								</div>
								<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								    <el-button size="small" type="primary">上传</el-button>
								</el-upload>
							</div>	-->
							<div class="text-warp left">
								<p class="text">注：支持JPG、JPEG、PNG文件格式，每张大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="营业执照注册号">
						<el-input></el-input>
					</el-form-item>
					<el-form-item class='dates' label="营业期限">
						<span class="start"></span><i class="starts">从</i>
						<el-date-picker class='ipt' type="date" v-model='form.date1'></el-date-picker>
						<span class="start1"></span><i class="starts2">至</i>
						<el-date-picker class='ipt' type="date" v-model='form.date2'></el-date-picker>
					</el-form-item>
					<el-form-item label="营业执照扫描件">
						<div class="busPic left">
							<img :src="busPic" alt="" />
						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="http://www.ob.com:8080/php/shopinfo_save.php" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								 <el-button size="small" type="primary">上传</el-button>
							</el-upload>	  
							<div class="text-warp">
								<p class="text top">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form :inline="true">
						<el-form-item class='citys' label='餐饮服务许可证编号'>
							 <el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item class='citys'label='餐证字' >
							 <el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item class='cityd' label='第'>
						<el-input placeholder='输入行政区域代码及发证顺序编号'></el-input>
					</el-form-item>
					<el-form-item label='号'>
						
					</el-form-item>
					</el-form>
					
					<el-form-item label="餐饮服务许可证扫描件">
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
					<el-form-item label="确认书扫描件">
						<div class="busPic left">

						</div>
						<div class="picInfo left">
							<el-upload class="upload-demo" action="https://baidu.com">
								 <el-button size="small" type="primary">上传</el-button>
							</el-upload>	  
							<div class="downLoad">
								下载确认书模板
							</div>
							<div class="text-warp">
								<p class="text">注：支持JPG、JPEG、PNG文件格式，大小不得大于2M</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="经营范围">
						<el-input></el-input>
					</el-form-item>
					<div class="bottom">
						<button class="blue">提交审核</button>
						<button class="default">关闭</button>
					</div>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
	export default{
		data() {
		return {
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
		form: {
			date1: '',
			date2: '',
       },
       main:[
       		{
       			text:'正面',
       			upload:'上传',
       			imgs:''
       		},
       		{
       			text:'反面',
       			upload:'上传',
       			imgs:''
       		}
       ],
       busPic:''
      
      };
    },
    methods:{
    	handleAvatarSuccess(res, file) {
				this.main[0].imgs = URL.createObjectURL(file.raw);
				this.main[1].imgs = URL.createObjectURL(file.raw);
				this.busPic = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg'||'image/png'||'image/jpg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片必须是 JPG,JPEG,PNG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
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
		.text-warp{

			@include fc(12px,#9b9b9b);
		}
		background:#fff;
		.commercialinformation {
			text-indent: 14px;
			.title {
				@include fc($sizes, $grey);
				height: 40px;
				line-height: 40px;
				background: #F6F8FC;
			}
			.info{
				
				margin:40px 0 0 118px;
				.main{
					width:600px;
					margin-left:14px;
					text-indent:0;
					.reverseSide{
						margin-left: 40px;
					}
					.frontFace{
						width:200px;
						@include fc(14px,#333333);
						text-align:center;
						&:first-child{
							margin-right: 40px;
						}
					}
					.buttons,.buttond{
						width:200px;
						text-align: center;
					}
					.photo1{
						@include wh(200px,120px);
						background:#e1e1e1;
						margin-bottom:10px;
						img{
							width: 100%;
							height:100%;
							display: block;
						}
					}
				}
				.busPic{
					@include wh(200px,120px);
					background: #e1e1e1;
					margin-left: 14px;
					img{
						width: 100%;
							height:100%;
							display: block;
					}
				}
				.downLoad{
					@include fc(14px,#4877E7);
					margin-bottom: 14px;
					margin-top:10px;
				}
				.top{
					margin-top:60px;
				}
				.start{
					position:relative; 
					
					&:before{
					position: absolute;
					content: '';
					height: 30px;
					left:14px;
					top:-7px;
					z-index: 10;
					display: inline-block;
					background: #eeeeee;
					@include wh(36px,30px);
					line-height: 30px;
					}
				}
				.start1{
					position:relative; 
					
					&:before{
					position: absolute;
					content: '';
					height: 30px;
					left:14px;
					top:-7px;
					z-index: 10;
					display: inline-block;
					background: #eeeeee;
					@include wh(36px,30px);
					line-height: 30px;
					}
				}
				.starts{
					position: absolute;
					left: 10px;
					color:#333333;
					font-size:14px;
					z-index: 20;
				}
				.starts2{
					position: absolute;
					left:207px;
					color:#333333;
					font-size:14px;
					z-index: 20;
				}
				.bottom{
					width:80%;
					text-align: center;
				  margin-bottom:30px;
				  margin-left: 40px;
					.blue{
						@include fc(16px,#ffffff);
						background:#4877E7 ;
							@include wh(160px,40px);
						line-height: 40px;
						border-radius: 6px;
					}
					.default{
						@include fc(14px,#4877E7);
						background: #ffffff;
							@include wh(160px,40px);
						line-height: 40px;
						border-radius: 6px;
						border: 1px solid #4877E7 ;
						margin-left:50px;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	@import 'src/styles/mixin.scss';
	#commercial {
		.el-form {
			overflow: hidden;
		}
		.el-button {
			@include wh(60px, 30px);
			background: #ffffff;
			@include fc(14px, #4877E7);
			line-height: 30px;
			border-radius: 0;
			padding:0;
		}
		.el-input__inner {
			border: 1px solid #d9d9d9;
			border-radius: 0;
			@include wh(280px, 34px);
		}
		.el-form--inline .el-form-item {
			margin-right: -30px;
		}
		.el-form-item__label {
			padding: 11px 0;
		}
		.el-form-item {
			margin-bottom: 20px;
		}
		.ipt input{
					@include wh(180px,30px);
					text-indent: 36px;
				}
		.citys input{
			@include wh(120px,34px);
		}
		.cityd input{
			@include wh(250px,34px);
		}
		.dates .el-icon-date:before{
			position: absolute;
			left:8px;
			top:6px;
			content: '';
			display:inline-block;
			vertical-align: middle;
			padding: 0 10px;
			background: url(../../img/date.png)no-repeat;
			@include wh(20px,20px);
			background-size: 20px 20px;
		}
		.dates .el-input__icon{
			top: 2px;
			width:36px;
			height:30px;
			background: #EEEEEE;
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
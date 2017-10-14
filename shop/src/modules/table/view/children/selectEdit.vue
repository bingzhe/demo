<template>
	<div>
		<div class="mask">
		</div>
		<div class="messageBox">
		<div class="heade">添加桌型 </div>
		<div class="main">
		<div class="add">
			<el-tag
				  :key="tag"
				  v-for="tag in addTags"
				  size="small"
				  type="primary"
				  color="white"
				  :close-transition="false"
				  @close="handleClose(tag)">
				{{tag}}
				</el-tag>
		</div>  
			<el-input placeholder="请输入标签名称，字数不超过4个字" v-model="inputValue"></el-input>
			<el-button>添加</el-button>
			<div class="btn">
				<el-button class="confirm_btn" @click="confirm">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import { apiMethods } from'../../api';
	export default{
		props:["name"],
		data() {
			return{
				addTags: ['方桌', '圆桌', '三角桌'],
		        inputValue: '',
			}
		},
		methods:{
			//关闭标签
//			 handleClose(tag) {
//		        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
//		      },
			//点击确定
			confirm() {
				
				this.$emit('my-add',[this.inputValue,this.name]);

			},
			cancel() {
				this.$emit('my-cancle',this.name);
			}
		},
		created() {
		},
	}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 180%;
		z-index: 9990;
		background: rgba(0,0,0,0.5);
	}
	.messageBox{
		width:540px ;
		height:264px;
		position: absolute;
		top: 408px;
		left: 690px;
		background: #FFFFFF;
		z-index: 9991;
	}
	.heade{
		font-family: MicrosoftYaHei;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0.57px;
		text-align: center;
		background: #5A8CFF; 
		height: 40px;
		line-height: 40px;
	}
	.main{
		padding-left:80px;
		font-size: 14px;
	}
	.add{
		margin:40px 0 20px;
	}
	.add .el-tag{
		width: 80px;
		color: #4877E7;
		text-align: center;
		height: 30px;
		line-height: 30px;
		margin:0 10px 10px;	
		border: 1px solid #4877E7;
	}
	.el-input{
		width: 300px;
		height: 34px;
		margin-right:20px;
	}
	.el-button{
		width: 60px;
		height: 34px;
		color:#4877E7;
		border: 1px solid #4877E7;
	}
	.el-button:hover{
		color:#4877E7;
		border:1px solid #4877E7 ;
	}
	.btn .el-button{
		color: #4877E7;
		width: 160px;
		height: 40px;
		
	}
	.el-button.confirm_btn{
		background:#4877E7;
		color: #FFFFFF;
		margin-right: 60px;
	}
	.btn{
		margin-top: 20px;
	}
	
</style>
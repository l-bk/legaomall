<template>
	 <div v-transfer-dom >
      <x-dialog v-model="showdialog" class="dialog-demo" :hideOnBlur="true">
      	<div class="dialog_boy">
      		<div >
           <p style="line-height: 5em;">{{title}}</p>
           <button @click="hidedialog">容我想想</button>  <button @click='gotopath'>{{handlename}}</button>
           </div>
		</div>
      </x-dialog>
      
      
       <!--<x-dialog v-model="gotosetpassdialog" class="dialog-demo" :hideOnBlur="true">
      	<div class="dialog_boy">
      		<div >
           <p style="line-height: 5em;">您还没设置钱包支付密码!</p>
           <button @click="hidedialog(1)">容我想想</button>  <button @click='gotopath(1)'>前往设置</button>
           </div>
		</div>
      </x-dialog>-->
      
   </div>
</template>

<script>
	import { XDialog, TransferDomDirective as TransferDom} from 'vux'
	export default {
	directives: {
    TransferDom
  },
  components:{
  
      XDialog,
     
  },
  data(){
  	return{
  		title:'',
  		showdialog:false,
  		handlename:'',
  		path:'',
  	}
  },
  methods:{
  	hidedialog(){
  		
  			this.showdialog=false;
  	
  		
  		
  	},
  	gotopath(path){
  	
  	this.$router.push(this.path);
  		
  		
  	},
  	
  },
	}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.dialog_boy{
	width: 100%;
	height:10em;
	background-color: white; 
}
.dialog_boy button{
	color: white;
	width: 5em;
	height: 2.2em;
	margin-right: 10%;
	margin-left: 10%;
	background-color: #2baaed;
	outline: none;
	border: none;
	border-radius: 0.2em;
}
</style>
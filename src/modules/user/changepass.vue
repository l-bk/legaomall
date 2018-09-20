<template>
	<div class="change_body">
		
		<div class="change_head">
			<div v-show='identifying_code'><!--验证码模块-->
			我们已经发送<span style="font-weight: bold;">验证码</span>到您的手机
			<p style="font-weight: bold;font-size: 1.2em;">{{phone}}</p>
			</div>
			
			<div v-show='setpassword'><!--//设置密码模块-->
				<p>请为账号{{phone}}</p>
				<p style="font-weight: bold;">设置6位数字支付密码</p>
			</div>
			
			<div v-show='inputagain'>
				<p style="padding-top: 4%;font-size: 1.2em;">再次输入</p>
			</div>
		
		</div>
	
		<div class="input_pass">
			<div v-show='identifying_code'>
			<div @click="show_keyboard">
			<span><img src="../../../static/unput.png" id='0' ></span>
			<span><img src="../../../static/unput.png" id='1'></span>
			<span><img src="../../../static/unput.png" id='2'></span>
			<span><img src="../../../static/unput.png" id='3'></span>
			<span><img src="../../../static/unput.png" id='4'></span>
			<span><img src="../../../static/unput.png" id='5'></span>
			</div>
			<p><span id='timecount'>60</span>秒后重发</p>
			<button id='changepass_getcode' v-if="countdown==0" class="getnew_code" @click='getmsgcode(1)'>重新获取验证码</button>
			</div>
			
			
			<div v-show='setpassword' class="input_setpassword" @click="show_keyboard">
				
				
				<div>
				
				<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="6"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="7"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="8"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="9"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="10"></span>
    			<span style="border-right: none;" ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="11"></span>
    			</div>
    			
	    		<div style="font-size: 0.8em;margin-top: 15%;" >支付密码不能是重复，连续数字。</div>
				    	
			</div>
			
			
			
			<div v-show='inputagain' class="input_setpassword" @click="show_keyboard">
				<div>
				
				<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="12"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="13"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="14"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="15"></span>
    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="16"></span>
    			<span style="border-right: none;" ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="17"></span>
    			</div>
    			<div ><button class="cannot_button" v-if="is_next==0">下一步</button>
    				<button class="can_button" v-if='is_next==1' @click='next_click'>下一步</button>
    			</div>
    			
			</div>
		
		
		</div>
		
		<div class="pass_keyboard" @click="keyclick" v-show='showkeyboard'>
			<Flexbox :gutter='0' wrap='wrap'>
				<flexbox-item :span='3/4'>
					<grid :rows="3" style="background-color: white;">
		      <grid-item v-for="i in 12" :key="i" >
		        <span class="grid_passchange" v-if="i!=10&&i!=11&&i!=12" >{{i}}</span>
		       <div class="grid_passchange" v-if="i==10">x</div> 
		       <span class="grid_passchange" v-if="i==11">0</span>
		       <span class="grid_passchange1" v-if="i==12" >.</span>
		      </grid-item>
		      
            </grid>
				</flexbox-item>	
				
				
				<flexbox-item :span='1/4' >
					 <grid :rows="1" style="background-color: white;">
		      <grid-item v-for="i in 2" :key="i">
		      
		       <span class="grid_passchange2" v-if="i==1" id="pass_del">&times;</span>
		       <span class="grid_passchange2" v-if="i==2" >完成</span>
		      </grid-item>
		      
            </grid>
				</flexbox-item>	
			</Flexbox>
		</div>
	<toast v-model="show_norepeat" type='text' width='auto' :time="1000" is-show-mask text="请不要使用相同的数字" position="middle" ></toast>
	<toast v-model="show_nocontinuity" type='text' width='auto' :time="1000" is-show-mask text="请不要使用连续的数字" position="middle" ></toast>
	<toast v-model="show_success" type='text' width='auto' :time="1000" is-show-mask text="密码设置成功！" position="middle" ></toast>
	<toast v-model="show_twopass_notcorrect" type='text' width='auto' :time="1000" is-show-mask text="密码不一致，重新输入" position="middle" ></toast>
	<toast v-model="show_msg_notcollect" type='text' width='auto' :time="1000" is-show-mask text="验证码不正确" position="middle" ></toast>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import {Grid, GridItem,Flexbox,FlexboxItem,Toast} from 'vux'
	export default{
		components:{
			Grid, GridItem,Flexbox,FlexboxItem,Toast
		},
		computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  
  },
  data(){
  	return{
  		phone:'',
  		countdown:60,//倒计时60秒
  		actived:0,
  		password:[],//旧密码
  		new_password:[],//旧密码
  		identifying_code:true,//显示验证码模块
  		setpassword:false,//显示设置密码模块
  		inputagain:false,//再次输入
  		showkeyboard:true,//显示软键盘
  		show_norepeat:false,//重复时为true
  		show_nocontinuity:false,//连续时为true
  		show_success:false,//密码设置成功
  		show_twopass_notcorrect:false,//两次输入不相同
  		show_msg_notcollect:false,//验证码不正确
  		is_next:0,//0是下一步为灰色，1位高亮色
  		validateCode:'',//短信验证码
  		
  	}
  },
  mounted(){
  	this.return_phone();
  	this.timeCount();
  	this.getmsgcode(0);
  },
  methods:{
  	
  	getmsgcode(id){
  		if(id==1){
  			var id=document.getElementById('timecount');
  			
  			this.countdown=60;
  			id.parentNode.style.display='block';
  			this.timeCount();
  			var _this=this;
  		 this.$http.post('/restapi/cum/userinfo/getValidateCode',{phone:this.userinfo.lianxiNum})
                .then((response) => {
                	_this.validateCode=response.data.validateCode;
                   
                })
                .catch(function(response) {
                    // console.log(response)
                })
  		}
  		if(id==0){
  			var _this=this;
  		 this.$http.post('/restapi/cum/userinfo/getValidateCode',{phone:this.userinfo.lianxiNum})
                .then((response) => {
                	_this.validateCode=response.data.validateCode;
                   
                })
                .catch(function(response) {
                    // console.log(response)
                })
  		}
  		
  	},
  	next_click(){
  		var _this=this;
  		this.$http.get('/restapi/cum/userinfo/setPassword?userId='+this.userinfo.userId+ '&password='+this.new_password.join(''))
                .then((response) => {
                	_this.validateCode=response.data.validateCode;
                   
                })
                .catch(function(response) {
                    // console.log(response)
                })
  		this.show_success=true;
  		setTimeout(function() { 
		_this.$router.push('/user');
		},1500);
  		
  	},
  	show_keyboard(){
  		this.showkeyboard=true;
  	},
  	return_phone(){
  		var phone=this.userinfo.lianxiNum.substring(0,3)+'******'+this.userinfo.lianxiNum.substring(9,11);
  		this.phone=phone;
  	},
  	
  	 timeCount(){
  	 	var id=document.getElementById('timecount');
  	 
       if (this.countdown == 0) { 
       	id.parentNode.style.display='none';

		
		return;
		} else { 
		id.innerHTML=this.countdown;
		this.countdown--; 
		} 
		var _this=this;
		setTimeout(function() { 
		_this.timeCount();
		},1000) 
},
 keyclick(){
     	var _this=this;
     		
     		//键盘为再次输入密码所用
				if(_this.inputagain==true){
					 window.onclick=function(e){ 
					var evt=e||window.event; 
					var tar=evt.target||evt.srcElement; 
					
					//输入密码时点击数字键
				if( ((tar.tagName.toLowerCase()=="span")&&tar.className=='grid_passchange'&&tar.id=='')||(tar.tagName.toLowerCase()=="a"&&tar.className=='weui-grid'&&tar.children[0].id=='')){
					
								if(_this.actived<6){
									var id=_this.actived+12;
									var pass=document.getElementById(id);
									
								pass.style.display='block'
								
								_this.actived=_this.actived+1;
								if(tar.tagName.toLowerCase()=="span"){
									_this.new_password.push(tar.innerHTML);
									
								}
								if(tar.tagName=="A"){
									_this.new_password.push(tar.children[0].innerHTML);
									
								}
				
								
							}
								
								 if(_this.actived==6&&_this.new_password.join('')==_this.password.join('')){//
									_this.is_next=1;
									
								
								 }
								 if(_this.actived==6&&_this.new_password.join('')!=_this.password.join('')){//
								 	while(_this.actived){
				           				_this.actived=_this.actived-1;
				           				var id2=_this.actived+12;
				    	 			var pass2=document.getElementById(id2);
							       _this.new_password.pop();
							        
										pass2.style.display='none';
				           			
				           		}
								 	
									_this.password=[];
									 _this.actived=0;
										 _this.inputagain=false;
										 _this.setpassword=true;
										 _this.show_twopass_notcorrect=true;
								
								 }
				
				
			}
				if(tar.id!=''){
					
				if( (tar.id=="pass_del"&&tar.className=='grid_passchange2')||(tar.children[0].id=='pass_del'&&tar.className=='weui-grid')){
				//设置密码时点击点击删除		
			    	 		if(_this.actived>0){
			    	 			
			    	 			_this.actived=_this.actived-1;
			    	 			var id1=_this.actived+12;
			    	 			var pass1=document.getElementById(id1);
			    	 			
						        _this.new_password.pop();
						       
								pass1.style.display='none';
									
								
			    	 		}
					     
				}
				
				
			
				
				
				}
				if(tar.innerHTML=='完成'){//设置密码时点击点击完成
					_this.showkeyboard=false;
					
				}
				
			}
				}
     	
     	//键盘为设置密码所用
				if(_this.setpassword==true){//设置密码时点击数字键
					 window.onclick=function(e){ 
					var evt=e||window.event; 
					var tar=evt.target||evt.srcElement; 
					
				if( ((tar.tagName.toLowerCase()=="span")&&tar.className=='grid_passchange'&&tar.id=='')||(tar.tagName.toLowerCase()=="a"&&tar.className=='weui-grid'&&tar.children[0].id=='')){
					
								if(_this.actived<6){
									var id=_this.actived+6;
									var pass=document.getElementById(id);
									
								pass.style.display='block'
								
								_this.actived=_this.actived+1;
								if(tar.tagName.toLowerCase()=="span"){
									_this.password.push(tar.innerHTML);
									
								}
								if(tar.tagName=="A"){
									_this.password.push(tar.children[0].innerHTML);
									
								}
				
								
							}
								
								 if(_this.actived==6){//
								 	var that=_this;
								 	setTimeout(function() { 
									 	var array_1=new Array()
								 	array_1.push.apply(array_1,that.password);
								 	
//						 			array_1.sort();//升序排序
//						 			console.log(array_1);
									var iscontinuity="true";//是否是连续
									for(var i=0;i<array_1.length;i++){
										if(i+1<array_1.length&&array_1[i+1]-array_1[i]!=1)
										{
											
											iscontinuity='false';
											break;
										}
									}
									var a=0;//中间判断是否执行了前两个条件
									
									
									if(iscontinuity=='true'){
										
										that.show_nocontinuity=true;
										while(that.actived){
				           				that.actived=that.actived-1;
				           				var id2=that.actived+6;
				    	 			var pass2=document.getElementById(id2);
							        that.password.pop();
							        
										pass2.style.display='none';
				           			
				           		}
										a=1;
										
									}
									var reg1 = /(\w)\1{5,}/;
									if(reg1.test(that.password.join(''))){
										
										that.show_norepeat=true;
										while(that.actived){
				           				that.actived=that.actived-1;
				           				var id2=that.actived+6;
				    	 			var pass2=document.getElementById(id2);
							        that.password.pop();
							        
										pass2.style.display='none';
				           			
				           		}
										a=1;
									}
									
									if(a==0) {
										while(that.actived){
				           				that.actived=that.actived-1;
				           				var id2=that.actived+6;
				    	 			var pass2=document.getElementById(id2);
							       
							        
										pass2.style.display='none';
				           			
				           		}
										
										 that.actived=0;
										 that.inputagain=true;
										 that.setpassword=false;
										
											}
									},200);
								
								 }
				
				
			}
				if(tar.id!=''){
					
				if( (tar.id=="pass_del"&&tar.className=='grid_passchange2')||(tar.children[0].id=='pass_del'&&tar.className=='weui-grid')){
				//设置密码时点击点击删除		
			    	 		if(_this.actived>0){
			    	 			
			    	 			_this.actived=_this.actived-1;
			    	 			var id1=_this.actived+6;
			    	 			var pass1=document.getElementById(id1);
			    	 			
						        _this.password.pop();
						       
								pass1.style.display='none';
									
								
			    	 		}
					     
				}
				
				
			
				
				
				}
				if(tar.innerHTML=='完成'){//设置密码时点击点击完成
					_this.showkeyboard=false;
					
				}
				
			}
				}	
     	
     	if(_this.identifying_code==true){
     	 window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				

			
			//键盘为短信验证所用
			
				//短信验证时点击数字键
				if( ((tar.tagName.toLowerCase()=="span")&&tar.className=='grid_passchange'&&tar.id=='')||(tar.tagName.toLowerCase()=="a"&&tar.className=='weui-grid'&&tar.children[0].id=='')){
					
								if(_this.actived<6){
									
									var pass=document.getElementById(_this.actived);
									
								pass.src="../../../static/hasput.png";
								_this.actived=_this.actived+1;
								if(tar.tagName.toLowerCase()=="span"){
									_this.password.push(tar.innerHTML);
									
								}
								if(tar.tagName=="A"){
									_this.password.push(tar.children[0].innerHTML);
									
								}
								}
								if(_this.actived==6&&_this.validateCode==_this.password.join('')){//
								 		_this.actived=0;
										_this.password=[];
										
										_this.setpassword=true;
										_this.identifying_code=false;
										
										
								 }
								if(_this.actived==6&&_this.validateCode!=_this.password.join('')){//
								 		_this.show_msg_notcollect=true;
										
										
								 }
								
								
				
								
							}
				
				if(tar.id!=''&&tar.tagName.toLowerCase()=="span"){	//短信验证时点击删除键	
					
				if( (tar.id=="pass_del"&&tar.className=='grid_passchange2')||(tar.children[0].id=='pass_del'&&tar.className=='weui-grid')){
						
			    	 		if(_this.actived>0){
			    	 			_this.actived=_this.actived-1;
			    	 			var pass1=document.getElementById(_this.actived);
						        _this.password.pop();
						        
									pass1.src="../../../static/unput.png";
									
								
			    	 		}
			    	 				 
					     
				}
			}
				
				
				if(tar.innerHTML=='完成'){//设置密码时点击点击完成
					_this.showkeyboard=false;
					
				}
				
			}
			
			
			
     	 
     	
     	 
     	 
     	 }
     	},
    },
  }
	
</script>

<style>
	.change_body{
		width: 100%;
		height:100%;
		position: fixed;
	}
	.change_head{
		padding-top: 5%;
		text-align: center;
		background-color: white;
		height: 12%;
		width: 100%;
	
	}
	.input_pass{
		height:20%;
		width: 100%;
		text-align: center;
		padding-top: 20%;
		
		
		
	}
	.input_setpassword {
margin-left: 4.5%;
/*margin-right: 4.5%;*/		
text-align: center;
width: 90%;
height: 2.2em;
border: 2px solid lightblue;
border-radius: 0.2em;


  
}
.input_setpassword img{
	display: none;
	
	padding-left: 40%;
	padding-top: 20%;
}
	.input_setpassword span{
		float:left;
		width: 16%;
		height: 2.2em;
		text-align: center;
		
		border-right: 2px solid gainsboro;
	}
	
	.cannot_button{
		margin-top: 10%;
		width: 100%;
		height: 3em;
		border: none;
		
		background-color: darkgray;
		border-radius: 0.3em;
		outline-style: none;
		color: gray;
	
	}
	.can_button{
		margin-top: 10%;
		width: 100%;
		height: 3em;
		border: none;
		
		background-color: #2baaed;
		border-radius: 0.3em;
		outline-style: none;
		color: white;
	
	}
	
	.pass_keyboard{
		height:auto;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
.grid_passchange, .grid_passchange1{
  display: block;
  text-align: center;
  color: black;
 
 
}
.grid_passchange2{
  display: block;
  text-align: center;
  line-height: 90px;
  color: black;	
  height:90px;
  position: relative;
}
.getnew_code{
	width: 70%;
	height: 2em;
	outline: none;
	border: none;
	border-radius: 0.5em;
	background-color: #2baaed;
	color: white;
}
</style>
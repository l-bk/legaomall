<template>
	<div>
	    	 <x-dialog v-model="showpay" hide-on-blur>
    	 	<div style="text-align: center;background-color:white;font-family: '宋体';position: relative;">
    	 		<div style="border-bottom: 1px gainsboro solid;font-size: 1.2em;padding-left:5%;padding-top: 5%;color:limegreen;text-align: left;"><img :src="userinfo.headimgurl" style="width: 10%;height: 1.2em;vertical-align: middle;padding-bottom: 1%;"><span style="padding-left: 3%;">请输入支付密码</span></div>
    	 		
    	 		<div  style="font-weight: bold;"><span style="font-size: 0.8em;">&#65509;</span>{{ordermsg.orderPrice}}</div>
    	 		<div class="input">
				  
				    	
				    
				    		
			    		<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="0"></span>
		    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="1"></span>
		    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="2"></span>
		    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="3"></span>
		    			<span ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="4"></span>
		    			<span style="border-right: none;" ><img src="../../../static/paspot.png" style="vertical-align: middle;" id="5"></span>
	    		
				    
				    
				    	
          </div>
          <br />
    	 	</div>
    	 	<div @click="keyclick">
    	 		 <grid :rows="3" style="background-color: white;">
		      <grid-item v-for="i in 12" :key="i">
		        <span class="grid-center" v-if="i!=10&&i!=11&&i!=12">{{i}}</span>
		       <div class="grid-center" v-if="i==10">.</div> 
		       <span class="grid-center" v-if="i==11">0</span>
		       <span class="grid-center1" v-if="i==12" id="del">&times;</span>
		      </grid-item>
		      
            </grid>
    	 	</div>
    	 </x-dialog>
    	 </div>
</template>

<script>
	import { XDialog,Grid, GridItem} from 'vux'
	 import { mapActions } from 'vuex'
	  import { mapState } from 'vuex'
	  import { USERINFO_SIGN } from '../../store/userinfo'
    import { ORDERMSG_SIGN } from '../../store/ordermsg'
	import { TransferDomDirective as TransferDom } from 'vux'
	export default{
		 directives: {
    TransferDom
  },
   computed: {
   	...mapState({ ordermsg: state => state.ordermsg}),
   	...mapState({ userinfo: state => state.userinfo}),
   },
		components:{
			XDialog,Grid, GridItem
		},
		data(){
			return{
				showpay:false,
				actived:0,
				password:[],
				minusRedpacket:'0',
				paytype:0,
				
				
			}
		},
		methods:{
			...mapActions([ORDERMSG_SIGN]),
			  show(){
         this.showpay=true;
//       this.sum=this.ordermsg.orderPrice;
     },
     keyclick(){
     	var _this=this;
     	window.name="paypage";
     	 window.onclick=function(e){ 
				var evt=e||window.event; 
				var tar=evt.target||evt.srcElement; 
				

				
				if( ((tar.tagName.toLowerCase()=="span")&&window.name=="paypage"&&tar.className=='grid-center'&&tar.id=='')||(tar.tagName.toLowerCase()=="a"&&tar.className=='weui-grid'&&tar.children[0].id=='')){
					
								if(_this.actived<6){	
									var pass=document.getElementById(_this.actived);
								pass.style.display='block';
								_this.actived=_this.actived+1;
								if(tar.tagName.toLowerCase()=="span"){
									_this.password.push(tar.innerHTML);
									
								}
								if(tar.tagName=="A"){
									_this.password.push(tar.children[0].innerHTML);
									
								}
						  //购买产品支付			
			          if(_this.actived==6&&_this.paytype==0)
			          {
			          	var __this=_this;
			          	_this.$http({
			            method:'GET',
			            url:'/restapi/cum/myorder/payTestSelect?userId='+_this.userinfo.userId+'&orderId='+_this.ordermsg.orderId+'&payPassword='+_this.password.join("")+'&minusRedpacket='+_this.minusRedpacket+'&orderPrice='+_this.ordermsg.orderPrice,
			            //使用定义的全局变量 用$get()获取t
			       
			            
			        }).then(function(data){
			        	
			        	
			           
			           
			           
						if(data.data.success=="支付成功"){
							
							
							//判断是否是包场，并改变包场人数。
			            if(__this.ordermsg.orderType=='4') {
			            	var ___this=__this;
			            	 
						  __this.$http.get('/restapi/pdm/bp/addJoinNumber?bpId='+__this.ordermsg.bpId+'&addNum='+__this.ordermsg.gameNum+'&bpName='+__this.ordermsg.stadiumId)
			               .then((response) => {
				               
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			           //判断是否是特惠抢购，并改变剩余分数。
			            if(__this.ordermsg.orderType=='1') {
			            	var ___this=__this;
			            	 
						  __this.$http.get('/restapi/pdm/shop/updateGoodsNumber?spId='+__this.ordermsg.spId+'&saleNum='+__this.ordermsg.gameNum)
			               .then((response) => {
				                
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			            
			             //特惠抢购分佣
			            if(window.sessionStorage.commission) {
			            	
			            	
			            	
			            	
			            	var ___this=__this;
			            	 
						  __this.$http.get('/restapi/pdm/goodsSpec/rabate?userId='+window.sessionStorage.commission+'&shopSpId='+__this.ordermsg.spId)
			               .then((response) => {
				                window.sessionStorage.removeItem('commission');
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			            
			             //判断是否是赛事活动，并改变剩余分数。
			            if(__this.ordermsg.orderType=='2') {
			            	var ___this=__this;
			            	 
						  __this.$http.get('/restapi/match/matchdate/updateApplyNumAndLimitNum?id='+__this.ordermsg.activityid)
			               .then((response) => {
				               
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			           
							
							__this.$router.push('/home/ordercompleted');
						}
			           	if(data.data.err=='001'){
			           		var r=confirm("您的钱包余额不足");
			           		if(r==true)
			           		{
			           			while(__this.actived){
			           				__this.actived=__this.actived-1;
			    	 			var pass1=document.getElementById(_this.actived);
						        __this.password.pop();
						        
									pass1.style.display="none";
			           			}
			           		}
			           	}
			           	if(data.data.err=="002"){
			           		alert("支付密码错误");
			           		
			           			while(__this.actived){
			           				__this.actived=__this.actived-1;
			    	 			var pass1=document.getElementById(_this.actived);
						        __this.password.pop();
						        
									pass1.style.display="none";
			           			
			           		}
			           	}
			         
					   
			        },function(error){
			          alert("error");
			        });
			          
			          
			          }
			          
			          
			          
			        
								
								
								
								
								}
					
			    	 
			    }
				if(tar.id!=''){
					if( ((tar.id=="del")&&window.name=="paypage")||(tar.children[0].id=='del'&&window.name=="paypage")){
						
			    	 		if(_this.actived>0){
			    	 			_this.actived=_this.actived-1;
			    	 			var pass1=document.getElementById(_this.actived);
						        _this.password.pop();
						        
									pass1.style.display="none";
									
								
			    	 		}
					     
				}
				}
				}
     	 
     	  
     },
     show(){
     	this.showpay=true;
//       this.sum=this.ordermsg.orderPrice;
     },
    
		}
}	
</script>

<style>
	.input {
margin-left: 4.5%;	
text-align: center;
width: 90%;
height: 2.5em;
border: 1px solid gainsboro;
border-radius: 0.2em;
  	margin-top:2% ;
}
.input span{
float:left;
	width: 16.3%;
	height: 2.5em;
	text-align: center;
	border-right: 1px gainsboro solid;
}
.input img{
	display: none;
	padding-left: 40%;
	padding-top:35%;
}

.grid-center, .grid-center1{
  display: block;
  text-align: center;
  color: black;
 
 
}
</style>
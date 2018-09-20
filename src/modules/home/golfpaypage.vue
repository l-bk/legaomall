<template>
  <div class="PAYpage">
   
    
    <div style="background-color: #ebebeb;height:2.2em;width:100%;line-height: 2.2em;color:black;padding-left: 4%;">赛事信息</div>
    
    
    <div style="width: 100%;padding: 2%;font-size: 1em;">
    	<div style="padding-bottom: 1%;padding-left:2%;font-size: 1.2em;padding-right:2%;" id='golfname'></div>
    	
    	
    	<div style="width: 100%;margin-left: -2%;">
    
   
    	 	 <div ><cell title="分组:" is-link>第 {{OrderData.groupId}}组</cell></div>
    	 	<div @click="changein(1);"><cell title="联系人：" is-link >{{OrderData.lianxiPerson}}</cell></div>
      
      <div @click="changein(2)"><cell title="手机号:" is-link>{{OrderData.lianxiNum}}</cell></div>
     
      
      </div>
    </div>
    
    
<div style="background-color: #ebebeb;width:100%;height: 2.2em;line-height: 2.2em;color:black;padding-left:4%;">支付方式</div>    
    <div>
        <div class="golf_HBDK" >
            <div class="golf_HBDK_lable">
                <img src="../../../static/notgetredpack.png" style="width: 12%;">
                <span>红包抵扣</span>
            </div>
            
                <x-switch title="" v-model="HBDK" style="height: 40px;" @on-change="changeswitch"></x-switch>
            
        </div>
        <div class="HBDKvalue golf_HBDK" v-show="HBDK">
        	<flexbox :gutter="0" wrap="wrap">
            <flexbox-item><div style="font-size: 0.7em;"> 红包余额<span style="color: #2baaed;"><span style="font-size: 0.8em;">&#65509;</span>{{redPackets}}</span>，可抵用<span style="color: #2baaed;"><span style="font-size: 0.8em;">&#65509;</span>{{hongbaovalue}}</span></div></flexbox-item>
           
            <flexbox-item> <span style="text-align: center;display: block;font-size: 0em;margin-bottom: 5%;margin-top: 3%;" class="hongbaodeduction">
    				 <x-number :value="hongbaovalue"  :min="0" :max="redPackets" style="height: 50px;" fillable :step="1"  @on-change="change"></x-number>
    				</span>
    				</flexbox-item>
    				</flexbox>
        </div>
        
        
            <div >
            	<radio title="title" :options="options" v-model="ZFFS"></radio>
            </div>
           
       
    </div>
    
    <div class="SurePay">
        <div class="SP_label">
            <span>总额：</span>
           
            <span class="colortext" v-if="HBDK==true"><span style="font-size: 0.8em;">&#65509;</span>{{ordermsg.productPrice-hongbaovalue}}</span>
             <span class="colortext" v-if="HBDK==false"><span style="font-size: 0.8em;">&#65509;</span>{{OrderData.orderPrice}}</span>
        </div>
        <div class="golf_SP_btn" @click="pay">确定支付</div>
   </div>
  
 
  
   
  
 <div v-transfer-dom>
      <x-dialog v-model="showname" class="dialog-demo">
      	<div id="nameinput">
		   		<div  style="background-color: #2baaed;width: 100%;height:2em;text-align: center;line-height:2em;color:white;font-size: 1.3em;">
		   	 修改姓名
		   	 </div>
		   	<div style="text-align: center;border-radius: 0.2em;color:#ebebeb;font-size: 1.1em;margin-top: 5%;">
		   		<input style="width: 90%; height: 2.5em;outline: none;font-size: 1em;border: 1px gainsboro solid;border-radius: 0.2em;text-indent:4%;text-indent: 4%;" placeholder="请输入你的姓名" v-model="OrderData.lianxiPerson">
		   		<div style="font-size: 0.8em;text-align: left;padding-left: 4%;padding-right: 4%;color: gray;">以英文或汉字，限4-16个字符，一个汉字为2个字符</div>
		   		<div style="margin-top:5% ;"><button style="width: 35%;font-size: 0.9em;font-size: 0.9em;color: white;height: 2.5em;background-color: #2baaed;outline: none;border: 1px #2baaed solid;border-radius: 0.2em;" @click="changeout(1)">确定</button></div>
		   	</div>
		  </div> 
  
      </x-dialog>
   </div>
  
  
 
  
  <div v-transfer-dom>
      <x-dialog v-model="showtel" class="dialog-demo">
      	<div id="telinput">
		   		<div  style="background-color: #2baaed;width: 100%;height:2em;text-align: center;line-height:2em;border-radius: 0.2em;color:white;font-size: 1.3em;">
		   	 修改电话
		   	 </div>
		   	<div style="text-align: center;border-radius: 0.2em;color:#ebebeb;font-size: 1.1em;margin-top: 5%;">
		   		
		   		<input style="width: 90%; height: 3em;outline: none;font-size: 1em;border: 1px gainsboro solid;border-radius: 0.2em;text-indent:4%;text-indent: 4%;" placeholder="以英文或汉字，限4-16个长度" v-model="OrderData.lianxiNum">
		   		<div style="font-size: 0.8em;text-align: left;padding-left: 4%;padding-right: 4%;color: gray;">以英文或汉字，限4-16个字符，一个汉字为2个字符</div>
		   		<div style="margin-top:4% ;"><button style="width: 35%;font-size: 0.9em;font-size: 0.9em;color: white;height: 2.5em;background-color: #2baaed;outline: none;border: 1px #2baaed solid;border-radius: 0.2em;" @click="changeout(2)">确定</button></div>
		   	</div>
		  </div> 
      </x-dialog>
   </div>
   
   
   
   
  
  <setpaypassdialog ref="dialog"></setpaypassdialog>
  <softkeybord ref="keybord"></softkeybord>
  <!--<setpaypassdialog ref='dialog'></setpaypassdialog>-->
  
  </div>

</div>
</template>

<script>
import {XSwitch,XNumber,Radio,Flexbox, FlexboxItem,Cell, XDialog, TransferDomDirective as TransferDom} from 'vux'

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
export default {
	directives: {
    TransferDom
  },
  computed:{
  ...mapState({ ordermsg: state => state.ordermsg}),
  ...mapState({ userinfo: state => state.userinfo}),
  },
 
  components:{
    
      XSwitch,
      XNumber,
      Radio,
      Flexbox, 
      FlexboxItem,
       
       Cell,
      XDialog,
      Softkeybord:resolve => {require(['./softkeybord.vue'], resolve)},
      Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
  data (){
      return {
      	
      	showaddress:false,
      	showname:false,
      	showtel:false,
      	redPackets:'',
      	hotprice:800,
      value:1,
      hongbaovalue:0,
     OrderData:{stadiumId:"",fuStadiumId:"",gameDate:"",productPrice:"",gameNum:"1",orderPrice:"",lianxiPerson:"",lianxiNum:"",note:"",orderState:"0",payWay:"",address:'填写地址',orderType:"2",userId:"",validTime:'',groupId:''},
          HBDK:false,
          QBZF:true,
          WSZF:true,
          HBDKvalue:'',
          ZFFS:'001',
          options:[
              {
                icon: '../../../static/walletlogo.png',
                key: '001',
                value: '钱包支付 ',
                id:'001'
              },
              {
                icon: '../../../static/wechatpay.png',
                key: '002',
                value: '微信支付',
                id:'002'
              },
          ]
      }
  },

  mounted(){
  	this.getOrderData();
  	
  },
  methods:{
  	...mapActions([ORDERMSG_SIGN]),
		 changeswitch(val){
  		if(val==true){
  			this.$http.get('/restapi/cum/red/redzong?user_id='+this.userinfo.userId)
                .then((response) => {
                    this.redPackets=response.data.redPackets;
                })
                .catch(function(response) {
                })
  		}
  	},
  	change(val){
  		
	if(this.ordermsg.productPrice>val||this.ordermsg.productPrice==val){
		this.hongbaovalue=val;
	}
  	else{
  		this.hongbaovalue=this.ordermsg.productPrice;
  	}
//alert(this.ordermsg.productPrice+'---'+this.hongbaovalue);
  	},
		getOrderData(){
			
			var golfname=document.getElementById('golfname');
			golfname.innerHTML=this.ordermsg.stadiumId;
			this.OrderData.groupId=this.ordermsg.groupId;
			this.OrderData.stadiumId=this.ordermsg.stadiumId;
			this.OrderData.fuStadiumId=this.ordermsg.fuStadiumId;
			this.OrderData.productPrice=this.ordermsg.productPrice;
			this.OrderData.gameDate="0000-00-00 00:00:00";
			this.OrderData.payWay=this.ordermsg.payWay;
			this.OrderData.address=this.ordermsg.address;
			this.OrderData.orderPrice=this.ordermsg.productPrice;
			this.OrderData.userId=this.ordermsg.userId;
			this.OrderData.lianxiNum=this.ordermsg.lianxiNum;
			this.OrderData.lianxiPerson=this.ordermsg.lianxiPerson;
			this.OrderData.validTime=this.ordermsg.matchDate;
			this.OrderData.activityId=this.ordermsg.activityId;
		},
  		pay(){
  			if(window.localStorage.payPassword!=''){
			
  		var _OrderData = this.OrderData
			var OrderDatajson = JSON.stringify(_OrderData);
			
//    this.$router.push('/home/Softkeybord');
			var _this=this;
			if(this.ordermsg.orderId==''){//订单不存在
				this.$http.post('/restapi/cum/myorder/createOrderByUserId',OrderDatajson)
                .then((response) => {
//              	alert(response.data)
                	_this.ordermsg.orderId=response.data.orderId;
				        	
       				if(_this.OrderData.payWay==0&_this.HBDK==true){
       					
       					_this.ordermsg.orderPrice=_this.OrderData.orderPrice-_this.hongbaovalue;
       					_this.ordermsg.minusRedpacket=_this.hongbaovalue;
       					 _this.ORDERMSG_SIGN(_this.ordermsg);
       					 
       					 this.$refs.keybord.minusRedpacket=_this.hongbaovalue;
       					   if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(response.data.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
                   
       				}
       				if(_this.OrderData.payWay==0&_this.HBDK==false){
       					_this.ordermsg.orderPrice=_this.OrderData.orderPrice;
                  
                   _this.ORDERMSG_SIGN(_this.ordermsg);
                  if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(response.data.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
       					 
       				}
									
                })
			}
			if(this.ordermsg.orderId!=''){//订单已存在的的情况
				var _this=this;
				if(this.OrderData.payWay==0&_this.HBDK==true){
					
       					this.ordermsg.minusRedpacket=this.hongbaovalue;
       					
       					this.OrderData.orderId=this.ordermsg.orderId;
       					
       					this.ordermsg.orderPrice=this.OrderData.orderPrice-this.hongbaovalue;
       					 this.ORDERMSG_SIGN(this.ordermsg);
       					 var TbCumMyOrder = JSON.stringify(this.OrderData);
       					 this.$http.post('/restapi/cum/myorder/updateOrderInfo', TbCumMyOrder)
                .then((response) => {
                	 this.$refs.keybord.minusRedpacket=_this.hongbaovalue;
       					 if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(_this.ordermsg.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
                })
       					
       					
                   
                   
       				}
       				if(this.OrderData.payWay==0&this.HBDK==false){
       					this.ordermsg.minusRedpacket=this.hongbaovalue;
       					this.ordermsg.orderPrice=this.OrderData.orderPrice;
       					
       					this.OrderData.orderId=this.ordermsg.orderId;
       					 this.ORDERMSG_SIGN(this.ordermsg);
       					 var TbCumMyOrder = JSON.stringify(this.OrderData);
       					 this.$http.post('/restapi/cum/myorder/updateOrderInfo', TbCumMyOrder)
                .then((response) => {
                	 this.$refs.keybord.minusRedpacket=_this.hongbaovalue;
       					 if(_this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(_this.ZFFS=='002'){
       						_this.jsApiCall(_this.ordermsg.orderId,_this.userinfo.userId,_this.ordermsg);
       					}
                })
       					
       					 
       				}
			}
			
          }  
          else{
          	this.$refs.dialog.showdialog=true;
						this.$refs.dialog.title='您还没设置钱包支付密码!';
						this.$refs.dialog.path='/changepassword';
						this.$refs.dialog.handlename='前往设置';
  			}
  			
    },

    
     changein(item){
    if(item==1)
    	this.showname=true;
    	if(item==2)
    	this.showtel=true;
    	if(item==3)
    	this.showaddress=true;
    	
    },
     changeout(item){
    	if(item==1)
    	this.showname=false;
    	if(item==2)
    	this.showtel=false;
    	if(item==3)
    	this.showaddress=false;
    },
  	
  },
}
</script>

<style lang="less" scoped>
	@import '~vux/src/styles/close';
.colortext {
    color: #2baaed
}

.PAYpage {
    margin-bottom: 50px;
    background-color: #ebebeb;
    
    overflow-y:scroll;
    overflow-x: hidden;
    /*margin-top: -11%;*/
}
.PAYpage>div {
    background-color: white;
}
.paypage_title {
    background-color: white;
    padding: 10px 20px;
    border-bottom: 0.5px solid #ccc;
}
.label {
    width: 26%;
    color:#727272
}
.instructions_mes {
    width: 75%!important;
}
.paypage_detail {
    background-color: white;
    margin-bottom: 10px;
}
.paypage_detail:first-child {
    padding-top: 10px;
}
.paypage_detail>div {
    display: flex;
    padding:5px 20px;
}
.golf_HBDK {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin-left: 4%;
}
.golf_HBDK_lable {
    display: flex;
    align-items: center;
    
    width: 50%;
}
.golf_HBDK_lable>img {
      
    padding-right:7%;
}

.ZFFSgroup {
    width:100%;
    margin-left: 0%;
}
.payDetail>div {
    display: flex;
    justify-content: space-between;
    margin-left: 4%;
    padding-right: 4%;
}
.SurePay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
} 
.SP_label {
    width: 65%;
    height: 100%;
    line-height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-around;
    margin-left: -5%;
    
}
.golf_SP_btn {
    flex: 1;
    background-color:#2baaed;
    color: white;
    text-align: center;
    line-height: 50px;
}
.num button{
	width: 100%;
	height: 2em;
	background-color: white;
	outline: none;
	border:1px #ebebeb solid;
	border-radius: 0.5em ;
	
	
	
}
.hongbaodeduction button{
	width: 100%;
	height: 2.2em;
	background-color: white;
	outline: none;
	border:1px #ebebeb solid;
	border-radius: 0.2em ;
	
	
}

#nameinput,#telinput,#addressinput{

	width: 100%;
	height:14em;
	background-color: white;
	border-radius: 0.5em;
	
}



.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
/********** 全局样式*************************** */
.weui-cell {
    margin: 0!important
}
</style>

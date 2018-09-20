<template>
  <div class="PAYpage" v-show="paypageshowflag">
  
    <div>
        <div class="paypage_title">
            <p style="font-size: 1.1em;color:#000000">{{ordermsg.stadiumId}}</p>
            <p style="color:grey;">{{ordermsg.fuStadiumId}}</p>
        </div>
        <div class="paypage_detail">
			<div><div class="label">打球日期：</div><span class="instructions_mes">{{ordermsg.gameDate}}</span></div>
			<div><div class="label">打球时间：</div><span class="instructions_mes">{{ordermsg.gameTime}}</span></div>
            <div><div class="label">打球人数：</div><span class="instructions_mes">{{ordermsg.gameNum}}</span></div>
            <div><div class="label">球&emsp;&emsp;员：</div><span class="instructions_mes">{{ordermsg.lianxiPerson}}</span></div>
            <div><div class="label">手&ensp;机&ensp;号：</div><span class="instructions_mes">{{ordermsg.lianxiNum}}</span></div>
			<div><div class="label">备&emsp;&emsp;注：</div><span class="instructions_mes">{{ordermsg.note}}</span></div>
		</div>
    </div>
    <div>
        <div class="HBDK" >
            <div class="paypage_HBDK_lable">
                <img src="../../../static/notgetredpack.png" style="width: 12.5%;">
                <span>红包抵扣</span>
            </div>
           
                <x-switch title="" v-model="hbdk" style="height: 40px;" @on-change="changeswitch"></x-switch>
            
        </div>
        <div class="HBDKvalue HBDK" v-show="hbdk">
            <div style="font-size: 0.8em;"> 红包余额<span class="colortext"><span style="font-size: 0.8em;">&#65509;</span>{{redPackets}}</span>，可抵用<span class="colortext"><span style="font-size: 0.8em;">&#65509;</span>{{ordermsg.redPackageDeduction}}</span></div>
            <div>
               
                    <x-number :value="0" v-model='hbdkvalue'  :min="0" :max="ordermsg.redPackageDeduction" style="height: 50px;" fillable :step="1"  @on-change="change"></x-number>
              
            </div>
        </div>
        <group class="ZFFSgroup">
            <radio title="title" :options="options" v-model="ZFFS" ></radio>
        </group> 
    </div>
    <div class="payDetail" style="margin-top: 3%;">
        <div>
            <span>产品金额</span>
            <span class="colortext" style="padding-right: 4%;"><span style="font-size: 0.8em;">&#65509;</span>{{ordermsg.orderPrice}}</span>
        </div>
        <div>
            <span>红包抵扣</span>
            <span class="colortext" style="padding-right: 4%;" v-if="this.hbdk==true">-<span style="font-size: 0.8em;">&#65509;</span>{{ hbdkvalue }}</span>
            <span class="colortext" style="padding-right: 4%;" v-if="this.hbdk==false"><span style="font-size: 0.8em;">&#65509;</span>0</span>
        </div>
    </div>
    <div class="SurePay">
        <div class="SP_label">
            <span style="margin-left: -8%;">在线付款：</span>
            <span class="colortext" v-if="this.hbdk==true"><span style="font-size: 0.8em;">&#65509;</span>{{sum}}</span>
            <span class="colortext" v-if="this.hbdk==false"><span style="font-size: 0.8em;">&#65509;</span>{{ordermsg.orderPrice}}</span>
        </div>
        <div class="SP_btn" @click="surepay">确定付款</div>
    </div>
    
    
    		<setpaypassdialog ref="dialog"></setpaypassdialog>
    	 <softkeybord ref="keybord"></softkeybord>
    
    
  </div>
</template>

<script>
import { Group,XSwitch,XNumber,Radio } from 'vux'

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
    import { ORDERMSG_SIGN } from '../../store/ordermsg'

export default {
	
  components:{
      Group,
      XSwitch,
      XNumber,
      Radio,
      
      Softkeybord:resolve => {require(['./softkeybord.vue'], resolve)},
       Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
   computed: {
   	...mapState({ ordermsg: state => state.ordermsg}),
   	...mapState({ userinfo: state => state.userinfo}),
   },
   
  data (){
      return {
   					
      	 redPackets:'',         paypageshowflag:false,
					
          hbdkvalue:0,
          payWay:1,
          hbdk:false,
          QBZF:true,
          WSZF:true,
          ZFFS:'002',
          sum:'',
          
          options:[
              {
                icon: '../../../static/walletlogo.png',
                key: '001',
                value: '钱包支付'
              },
              {
                icon: '../../../static/wechatpay.png',
                key: '002',
                value: '微信支付'
              },
          ]
      }
  },
  props:[
      'orderdata'
  ],
  
  methods:{
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
  	...mapActions([ORDERMSG_SIGN]),
  	change(val){
  		 if(this.ordermsg.orderPrice>val||this.ordermsg.orderPrice==val){
		
  		this.hbdkvalue=val;
  		this.sum=this.ordermsg.orderPrice-val;
	}
  	else{
  		
  		this.hongbaovalue=this.ordermsg.orderPrice;
  		this.sum=0;
  	}
  		
  	},
     show(){
         this.paypageshowflag=true;
         this.sum=this.ordermsg.orderPrice;
     },
  

     surepay(){
     	if(window.localStorage.payPassword!=''){
     	if(this.hbdk==true){
     	
     			this.ordermsg.orderPrice=this.sum;
     		this.ordermsg.minusRedpacket=this.hbdkvalue;
     	this.ORDERMSG_SIGN(this.ordermsg);
     	
     	
				this.$refs.keybord.minusRedpacket=this.hbdkvalue;
     if(this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(this.ZFFS=='002'){
       						this.jsApiCall(this.ordermsg.orderId,this.userinfo.userId,this.ordermsg);
       					}
					                   
					                
                   
     
     	}
     	if(this.hbdk==false){
     			
										this.$refs.keybord.minusRedpacket="0";
                if(this.ZFFS=='001'){
       					 	 this.$refs.keybord.showpay=true;
       					
       					 }
       					 
       					 if(this.ZFFS=='002'){
       						this.jsApiCall(this.ordermsg.orderId,this.userinfo.userId,this.ordermsg);
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
   
   
   
  }
}
</script>

<style>
.colortext {
    color: #2baaed;
    
}

.PAYpage {
    position: absolute;
    top: 0;
    left:0;
    
    width: 100%;
    height: 100%;
    background-color: rgb(239, 239, 239);
    padding-bottom: 20%;
   overflow-y: auto;
   overflow-x: hidden;
}
.PAYpage>div {
    background-color: white;
}
.paypage_title {
    background-color: white;
    padding: 1% 4%;
    border-bottom: 0.5px solid #ccc;
}
.label {
    width: 26%;
    color:#727272
}
.instructions_mes {
    width: 75%!important;
    color:darkgrey;
}
.paypage_detail {
    background-color: white;
    margin-bottom: 10px;
    color:grey;
}
.paypage_detail:first-child {
    padding-top: 10px;
}
.paypage_detail>div {
    display: flex;
    padding:1% 4%;
}
.HBDK {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
     margin-left: 4%;
    
}
.paypage_HBDK_lable {
    display: flex;
    align-items: center;
    color: #000000;
    width: 50%;
    /*padding-left: 2%;*/
}
.paypage_HBDK_lable>img {
   
   
    padding-right: 7%;
}
.HBDKvalue {
    padding-left: 1%;
    color:darkgrey;
}
.ZFFSgroup {
    width:100%;
    /*padding-left: 1%;*/
    
}
.payDetail>div {
    display: flex;
    justify-content: space-between;
    padding-left: 4%;
    padding-bottom: 3%;
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
    width: 70%;
    height: 100%;
    line-height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-around
}
.SP_btn {
    flex: 1;
    background-color:#2baaed;
    color: white;
    text-align: center;
    line-height: 50px;
}
.input {
margin-left: 4.5%;	
text-align: center;
width: 90%;
height: 2em;
border: 1px solid gainsboro;
border-radius: 0.2em;
  	margin-top:2% ;
}
.input span{
float:left;
	width: 16.3%;
	height: 2em;
	text-align: center;
	border-right: 1px gainsboro solid;
}


.grid-center {
  display: block;
  text-align: center;
  color: black;
 
 
}
/********** 全局样式*************************** */
.weui-cell {
    margin: 0!important
}
</style>

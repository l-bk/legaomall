<template>
	<div >
		
		<div class="orderwrite" v-show="ordershow">
			<p style="color: #000000;">预订信息</p>
			<div style="background-color: white;">
					
					<div style="padding-bottom: 1%;font-size: 1.1em;color: #000000;">{{OrderData.stadiumId}}</div>
					<div style="font-size: 15px;color: #ccc;">{{ordermsg.fuStadiumId}}</div>
					
						<div @click='gotodate' style="padding-bottom: 1%">
				    	
				        <span >打球时间：<span style="color: #2baaed;">{{OrderData.gameDate}} </span><span style="float: right;padding-right: 5%;">></span></span>
				       
				    	</div>
					
					<div style="padding-bottom: 1%">价格包含：<span style="color: #ccc;">{{ordermsg.priceinclude}}</span></div>
				
			</div>
			<div class="personQ">
				<div>
					<p style="color: #000000;">打球人数</p>
					<p class="color01"><span style="font-size: 0.8em;">&#65509;</span><span >{{ordermsg.productPrice}}</span>*<span >{{OrderData.gameNum}}</span></p>
				</div>
				<div>
					
						<x-number :value="10" v-model="OrderData.gameNum" @on-change="change" :min="1" :max="5" style="height: 40px;"></x-number>
					
				</div>
			</div>
			<p style="color: #000000;">预订人信息</p>
				<div class="LXR">
					<div class="LXRitem"  @click="addcontact">
						<div>联系人：</div>
						<div class="color01"><span style='color:#2baaed ;'>{{OrderData.lianxiPerson}}</span><span class="color02">&nbsp; ></span></div>
					</div>
					<div class="LXRitem" @click="writephone">
						<div>手机号：</div>
						<div class="color01"><span style='color:#2baaed ;'>{{OrderData.lianxiNum}}</span><span class="color02">&nbsp; ></span></div>
					</div>
					<div class="LXRitem" @click="writenote">
						<div style="width: 20%">备注:</div>
						<div class="color02" style="width: 72%;overflow: hidden;text-align: right;text-overflow:ellipsis;white-space: nowrap;">{{OrderData.note}}</div>
						<div class="color02">&nbsp; ></div>
					</div>
				</div>
			<p style="color: #000000;">预订说明</p>
			<div class="instructions">
				<div><div>预订：</div><span class="instructions_mes">{{ordermsg.reserve}}</span></div>
				<div><div>取消：</div><span class="instructions_mes">{{ordermsg.cancel}}</span></div>
				<div><div>费用：</div><span class="instructions_mes">{{ordermsg.cost}}</span></div>
			</div>
			<div class="orderwrite-bottom">
				<div class="orderwrite_sum1">
					<span style="color: #000000;">总额：</span><span class="color01" style="font-size: 22px;padding-right: 8%;"><span style="font-size: 0.7em;">&#65509;</span>{{OrderData.orderPrice}}</span>
				</div>
				<div class="orderwrite_btn" @click="surebooking">确定预订</div>
			</div>	
		</div>
		<v-contact ref="contact" v-on:recieveContact="recieveContactData" v-model="OrderData.lianxiPerson"></v-contact>
		<v-phone ref="phone" v-on:recievePhone="recievePhoneData" v-model="OrderData.lianxiNum "></v-phone>
		<v-note ref="note" v-on:recieveNote="recieveNoteData" v-model="OrderData.note"></v-note>
		<v-paypage ref="paypage" :orderdata="OrderData"></v-paypage>
		<date ref='showdate' v-on:child-say="showdate"></date>
		<timeselect ref='showtime' v-on:child-say="showtime"></timeselect>
		<addplayer ref='showaddplayer' v-on:child-say="showaddplayer"></addplayer>
	</div>
</template>

<script>
//	import store from './vuex/store'
import { Group,XNumber,CellBox , Datetime,Cell} from 'vux'

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
import { USERINFO_SIGN } from '../../store/userinfo'

export default {
  name: 'app',
  components: {
  		Cell,
  	   Datetime,
		Group,
		XNumber,
		CellBox,
		VContact:resolve => {require(['./orderpage_contact'], resolve)},
		VPhone:resolve => {require(['./orderpage_phone'], resolve)},
		VNote:resolve => {require(['./orderpage_note'], resolve)},
		VPaypage:resolve => {require(['./paypage'], resolve)},
		Date:resolve => {require(['./date.vue'], resolve)},
      	Timeselect:resolve => {require(['./timeselect.vue'], resolve)},
      	Addplayer:resolve=>{require(['./addplayer.vue'],resolve)}
  },
   computed:{
   	...mapState({ ordermsg: state => state.ordermsg}),
   	...mapState({ userinfo: state => state.userinfo}),
   	
   },

	data() {
		return {
			year:'',
			ordershow:true,
			OrderData:{stadiumId:"",fuStadiumId:"",gameDate:"",productPrice:"",gameNum:"0",orderPrice:"",lianxiPerson:"",lianxiNum:"",note:"填写备注",orderState:"0",payWay:"",orderType:"3",userId:"",validTime:'',activityId:'',goodsSpecId:''},
			
		}
	},
	
	mounted(){
		this.getOrderData();
	},
	methods:{
		...mapActions([USERINFO_SIGN]),
		 gotodate(){
  		
		this.$refs.showdate.show();
		this.ordershow=false;
  	},
		 	showdate(sign){
		
		
		this.$refs.showtime.showmytime=sign;
		this.$refs.showdate.showmydate=false;

  		
  	},
  	gototime(){
 
			
		
		this.$refs.showtime.show();
  		this.ordershow=false;  
  	},
  	showtime(sign){
  		
		this.ordershow=true; 
		this.$refs.showtime.showmytime=false;
		var month=this.userinfo.month;
		var daytime=this.userinfo.day;
		if (month >= 1 && month <= 9) {
	        month = "0" + month;
		    }
		    if (daytime >= 0 && daytime <= 9) {
		        daytime= "0" + daytime;
		    }
		this.OrderData.gameDate=this.userinfo.year+'-'+month+"-"+daytime+' '+this.userinfo.time+':00';
   		this.ordermsg.gameDate=this.userinfo.year+'-'+month+"-"+daytime+' '+this.userinfo.time+':00';
   		this.ordermsg.gameTime=this.userinfo.time;
   		
   		
        this.ORDERMSG_SIGN(this.ordermsg);
  	
  	},
		...mapActions([ORDERMSG_SIGN]),
		 change (val) {
		 	
     this.OrderData.gameNum=val;
     this.ordermsg.gameNum=val;
     this.ORDERMSG_SIGN(this.ordermsg);
     this.OrderData.orderPrice =  this.OrderData.productPrice*this.OrderData.gameNum;
     
   },
		getOrderData(){
			var myDate = new Date();
			
			var year= myDate.getFullYear();
			
			this.year=year;
			this.OrderData.stadiumId=this.ordermsg.stadiumId;
			this.OrderData.fuStadiumId=this.ordermsg.fuStadiumId;
			this.OrderData.productPrice=this.ordermsg.productPrice;
			this.OrderData.gameDate=this.ordermsg.gameDate;
			this.OrderData.payWay=this.ordermsg.payWay;
			this.OrderData.userId=this.ordermsg.userId;
			this.OrderData.lianxiNum=this.ordermsg.lianxiNum;
			this.OrderData.lianxiPerson=this.ordermsg.lianxiPerson;
			this.OrderData.activityId=this.ordermsg.activityId;
			this.OrderData.goodsSpecId=this.ordermsg.shopSpId;
		},
		addcontact(){
		
			this.$refs.showaddplayer.players=this.ordermsg.lianxiPerson.split(",");
			
			
			this.$refs.showaddplayer.addplayer_show=true;
			this.ordershow=false;
		},
		showaddplayer(sign){
			this.OrderData.lianxiPerson=sign;
			this.$refs.showaddplayer.addplayer_show=false;
			this.ordershow=true;
		},
		writephone(){
			this.$refs.phone.show()
		},
		writenote(){
			this.$refs.note.show();
		},
		recieveContactData(mes){
			this.OrderData.lianxiPerson=mes;
		},
		recievePhoneData(mes){
			this.OrderData.lianxiNum = mes;
			console.log(mes)
		},
		recieveNoteData(mes){
			this.OrderData.note = mes;
		},
		surebooking() {
			this.postbooking()
		},
		postbooking(){
			if(this.ordermsg.orderId==''){//订单不存在
			if(this.OrderData.payWay==0){
				this.OrderData.orderState='0';
			}
			if(this.OrderData.payWay==1){
				this.OrderData.orderState='1';
			}
			var _OrderData = this.OrderData
			var OrderDatajson = JSON.stringify(_OrderData);
			this.ordermsg.lianxiPerson=this.OrderData.lianxiPerson;
			this.ordermsg.lianxiNum=this.OrderData.lianxiNum;
			this.ordermsg.note=this.OrderData.note;
			this.ordermsg.orderPrice=this.OrderData.orderPrice;
			this.ORDERMSG_SIGN(this.ordermsg);
			var _this=this;
			this.$http.post('/restapi/cum/myorder/createOrderByUserId',OrderDatajson)
			                .then((response) => {
			                	_this.ordermsg.orderId=response.data.orderId;
			                	_this.ORDERMSG_SIGN(_this.ordermsg)
					if(_this.OrderData.payWay==0){
				
           _this.$refs.paypage.show();
            _this.ordershow=false;
			}
	 if(_this.OrderData.payWay==1){
	 	
            _this.$router.push('/home/ordercompleted');
            
            }			
											
			                   
			                })
	
			
			}
			if(this.ordermsg.orderId!=''){//订单已存在
				
					var _this=this;
				
//     					this.ordermsg.minusRedpacket=this.hongbaovalue;
       					
       					this.OrderData.orderId=this.ordermsg.orderId;
       					
//     					this.ordermsg.orderPrice=this.OrderData.orderPrice-this.hongbaovalue;
       					 this.ORDERMSG_SIGN(this.ordermsg);
       					 var TbCumMyOrder = JSON.stringify(this.OrderData);
       					 this.$http.post('/restapi/cum/myorder/updateOrderInfo', TbCumMyOrder)
                .then((response) => {
                	if(_this.ordermsg.payWay==0){
					_this.ordershow==false;
                    _this.$refs.paypage.show();
                    _this.ordershow=false;
				}
					
                    if(_this.ordermsg.payWay==1){
//                  alert("预订成功，球场现付"+this.ordermsg.orderPrice);
                    _this.$router.push('/home/ordercompleted');
                    _this.ordershow=false;
                    }
                })
				
			}
			
		},
	}
}
</script>
<style>
.color00{
	color:red;
}
.color01 {
	color:#2baaed;
}
.color02 {
	color:gray;
}
.orderwrite {
	color:#727272;
  	background-color: #ebebeb;
}
.orderwrite>div {
	padding-left: 10px;
	}
.orderwrite>p {
	text-indent: 10px;
	height: 40px;
	line-height: 40px;
	color: #333333;
}
.personQ {
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	padding:  0;
}

.LXR {
	background-color: white;
	padding-right: 4%;
}
.LXRitem {
	display: flex;
	justify-content: space-between;
	height: 40px;
	line-height: 40px;
}
.instructions {
	background-color: white;
	margin-bottom: 80px;
}
.instructions>div {
	display: flex;
	padding: 5px 0;
	color: #333333;
}

.instructions_mes {
	display:inline-block;
	word-wrap:break-word;
	width: 85%;
	color:#727272;
}
.orderwrite-bottom {
	padding: 0!important;
	display: flex;
	height: 50px;
	width: 100%;
	position: fixed;
	bottom: 0;
}
.orderwrite_sum1 {
	background-color: white;
	width: 70%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 2%;
}

.orderwrite_btn {
	width: 30%;
	background-color: #2baaed;
	color: white;
	text-align: center;
	line-height: 50px;
}


</style>
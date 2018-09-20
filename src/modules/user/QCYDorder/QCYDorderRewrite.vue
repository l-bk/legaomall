<template>
	<div>
		<div v-if="OrderData.orderType==1"><purchasepaypage></purchasepaypage></div>
		<div v-if="OrderData.orderType==3"><orderpage></orderpage></div>
		<div v-if="OrderData.orderType==2"><golfpaypage></golfpaypage></div>
		<div v-if="OrderData.orderType==4"><blockpay></blockpay></div>
		
		
		
		
	</div>
</template>

<script>
//	import store from './vuex/store'
import { Group,XNumber,CellBox } from 'vux'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../../store/ordermsg'
export default {
  name: 'app',
  components: {
		Group,
		XNumber,
		CellBox,
		Orderpage:resolve => {require(['../../home/orderpage.vue'], resolve)},
		Blockpay:resolve => {require(['../../home/blockpay.vue'], resolve)},
		Purchasepaypage:resolve => {require(['../../home/purchasepaypage.vue'], resolve)},
		Golfpaypage:resolve => {require(['../../home/golfpaypage.vue'], resolve)},
		
  },
	data() {
		return {
			OrderData:[],
			
		}
	},
	computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	...mapState({ ordermsg: state => state.ordermsg }),
  },
//	computed:{
//		sum:function(){
//			this.OrderData.sum =  this.OrderData.price*this.OrderData.person
//			return this.OrderData.sum;
//		}
//	},
	mounted(){
		this.getorderdata();
	},
	methods:{
		...mapActions([ORDERMSG_SIGN]),
		getorderdata(){
			var _this=this;
			this.$http.get('/restapi/cum/myorder/getByMyOrders?orderId='+this.$route.params.id+'&userId='+this.userinfo.userId)
                .then((response) => {
                	
                  _this.OrderData=response.data[0]; 
                  _this.ordermsg.groupId=response.data[0].groupId;
                  _this.ordermsg.orderPrice=response.data[0].orderPrice;
                  _this.ordermsg.orderType=response.data[0].orderType;
                  _this.ordermsg.stadiumId=response.data[0].stadiumId;
				_this.ordermsg.fuStadiumId=response.data[0].fuStadiumId;
				_this.ordermsg.productPrice=response.data[0].productPrice;
				_this.ordermsg.gameDate=response.data[0].gameDate;
				_this.ordermsg.gameTime=response.data[0].gameTime;
				_this.ordermsg.priceinclude="果，僮，柜，车";
				_this.ordermsg.payWay=response.data[0].payWay;
				_this.ordermsg.lianxiNum=response.data[0].lianxiNum;
				_this.ordermsg.lianxiPerson=response.data[0].lianxiPerson;
				_this.ordermsg.validTime=response.data[0].validTime;
				_this.ordermsg.orderId=response.data[0].orderId;
				_this.ordermsg.userId=response.data[0].userId;
				_this.ordermsg.orderPrice=response.data[0].orderPrice;
				_this.ordermsg.activityId=response.data[0].activityId;		
				_this.ORDERMSG_SIGN(_this.ordermsg);
                })
                .catch(function(response) {
                })
		},

	}
}
</script>

<style>
.color01 {
	color:#2baaed
}
.orderwrite {
	color:#727272;
  	background-color: #ebebeb;
}
.orderwrite>div {
	padding: 0 10px;
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
	position: absolute;
	bottom: 0;
}
.orderwrite_sum {
	background-color: white;
	width: 70%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.orderwrite_sum>span {
	padding: 0 20px;
}
.orderwrite_btn {
	width: 30%;
	background-color: #2baaed;
	color: white;
	text-align: center;
	line-height: 50px;
}
</style>
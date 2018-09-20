<template>
  <div>
    <div style="height: 40px; line-height: 40px;text-indent: 15px;">请选择你要充值的额度</div>
    <div style="background-color: white;color: white">
        <checker
        v-model="moneySelect"
        type="checkbox"
        default-item-class="checkeritem"
        selected-item-class="checkeritem-selected"
        >
            <checker-item v-for="i in [1000, 2000, 3000]" :key="i" :value="i">{{i}}元</checker-item>
        </checker>
        <checker
        v-model="moneySelect"
        type="checkbox"
        default-item-class="checkeritem_red"
        selected-item-class="checkeritem-selected_red"
        >
            <checker-item v-for="i in [5000, 10000, 20000]" keyboard="number" :key="i" :value="i">{{i}}元</checker-item>
        </checker>
    </div>
    <div style="height: 60px; line-height: 60px;text-indent: 20px;">手动输入金额</div>
    <div style="background-color: white;"> 
        <x-input title="充值金额(元) :" placeholder="请输入充值金额" v-model="moneyInput"  :max="6" class="moneyInput"></x-input>
    </div>
    <div class="rechargebutton">
        <div class="rechargebutton_left"><span style="font-size: 0.8em;">&#65509;</span>{{totalPrice}}</div>
        <div class="rechargebutton_right" @click="ensurerecharge">立即支付</div>
    </div>
    
  </div>
</template>

<script>
import { Checker, CheckerItem,XInput  } from 'vux'

import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { ORDERMSG_SIGN } from '../../store/ordermsg'
export default {
  components: {
    Checker,
    CheckerItem,
    XInput,
   
  },
  data() {
    return {
        moneySelect: [],
        moneyInput:0,
        moneytotal:0,
        OrderData:{stadiumId:"钱包充值",fuStadiumId:"",gameDate:"0000-00-00 00:00:00",productPrice:"",gameNum:"",orderPrice:"",lianxiPerson:"",lianxiNum:"",note:"",orderState:"0",payWay:"0",orderType:"5",userId:"",validTime:'',activityId:''},
    }
  },
  computed: {
  	  ...mapState({ ordermsg: state => state.ordermsg}),
  	   ...mapState({ userinfo: state => state.userinfo}),
      totalPrice() {
        let total = 0;
        let i=0;
        var input01=parseInt(this.moneyInput)
        for (i=0;i<this.moneySelect.length;i++){
            total+=this.moneySelect[i];
        }
        if (isNaN(input01)){
            this.moneytotal=total;
            return total
        }
        else {
            this.moneytotal=total+input01;
            return total+input01
        };
      },
  },
  methods:{
  	...mapActions([ORDERMSG_SIGN]),
      ensurerecharge (){
      	this.OrderData.orderPrice=this.moneytotal;
      	this.OrderData.userId=this.userinfo.userId;
      	this.ordermsg.orderPrice=this.moneytotal;
      	this.ordermsg.stadiumId=this.OrderData.stadiumId;
      	this.ordermsg.orderType=this.OrderData.orderType;
      	this.ordermsg.userId=this.userinfo.userId;
      	this.ordermsg.minusRedpacket='0';
         this.ORDERMSG_SIGN(this.ordermsg);
				var OrderDatajson = JSON.stringify(this.OrderData);
				var _this=this;
        this.$http.post('/restapi/cum/myorder/createOrderByUserId',OrderDatajson)
                .then((response) => {
                	_this.ordermsg.orderId=response.data.orderId;
                	 _this.ORDERMSG_SIGN(_this.ordermsg);
                	_this.jsApiCall(response.data.orderId,_this.userinfo.userId,_this.ordermsg);
                })
      }
  }
}
</script>

<style>

.vux-checker-box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.checkeritem {
    width: 23%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    margin: 20px 10px;
    background: url(../../../static/checker-bgimg01.png);
    background-size:100% 100%; 
}
.checkeritem-selected {
    background: url(../../../static/blue_checker.png);
    background-size:100% 100%; 
}
.checkeritem_red {
     width: 23%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    margin: 20px 10px;
    background: url(../../../static/checker-bgimg02.png);
    background-size:100% 100%; 
}
.checkeritem-selected_red {
    background: url(../../../static/red_checker.png);
    background-size:100% 100%; 
}
.moneyInput {
    height: 40px;
    font-size: 20px;
}
.rechargebutton{
    display: flex;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    color: white;
    font-size: 25px;
}
.rechargebutton_left{
    width: 60%;
    line-height: 60px;
    text-align: center;
    background-color: #707070;
}
.rechargebutton_right{
    width: 40%;
    text-align: center;
    background-color:#2baaed;
    line-height: 60px;
}


</style>

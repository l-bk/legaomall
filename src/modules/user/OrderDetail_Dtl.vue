<template>
  <div>
    <div class="ODD_first">
        <div class="ODD_first_top">
            <div><h4>{{orderdatalist.stadiumId}}</h4></div>
            <p class="simplecolor">{{orderdatalist.fuStadiumId}}</p>
        </div>
        <div class="ODD_first_bottom">
            <p v-if="orderdatalist.orderType!=1">打球日期：<span>{{orderdatalist.gameDate}}</span></p>
            <p v-if="orderdatalist.orderType!=1">打球时间：<span>{{orderdatalist.gameTime}}</span></p>
            <p v-if="orderdatalist.orderType==1">可打球时间：<span>{{orderdatalist.validTime}}</span></p>
            
            <p>打球人数：<span>{{orderdatalist.gameNum}}</span></p>
            <p>球&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员：<span>{{orderdatalist.lianxiPerson}}</span></p>
            <p>联系号码：<span>{{orderdatalist.lianxiNum}}</span></p>
        </div>
    </div>
    <div class="ODD_second">
        <p>订单总额：<span style="color: #2baaed"><span style="font-size: 0.8em;">&#65509;</span>{{orderdatalist.orderPrice}}</span></p>
        <p>支付方式：<span v-if="orderdatalist.payWay==0">在线预付</span><span v-if="orderdatalist.payWay==1">球场现付</span></p>
        <p>订单编号：<span style="font-size: 0.8em;">{{orderdatalist.orderId}}</span></p>
        
        <p>订单状态：<span v-if="orderdatalist.orderState==0">待处理</span>
        	<span v-if="orderdatalist.orderState==1">待打球</span>
        	<span v-if="orderdatalist.orderState==3">已取消</span>
        	<span v-if="orderdatalist.orderState==3">已完成</span>
        </p>
        <p>下单时间：<span>{{orderdatalist.createDate}}</span></p>
    </div>
    <div class="ODD_third">
        <p style="display: inline">备注信息： <span style="word-wrap:break-word;color: #a9a9a9;" v-if="orderdatalist.note!=''">{{orderdatalist.note}}</span>
        	 <span style="word-wrap:break-word;color: #a9a9a9;" v-if="orderdatalist.note==''">无</span>
        </p>
       
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
  	return{
  		orderdatalist:[],
  	}
  },
  mounted(){
  	this.getorderdata();
  },
  computed: mapState({ userinfo: state => state.userinfo }),
  methods:{
  	getorderdata(){
  		var user_id=this.userinfo.userId;
            this.$http.get('/restapi/cum/myorder/getByMyOrders?userId='+user_id+'&orderId='+this.$route.params.id)
                .then((response) => {
                	
                   this.orderdatalist=response.data[0];
		           if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
					      		var myDate=new Date(response.data[0].gameDate.replace(/-/g,'/'));
					      		
					      		
					      	}
		      	else{
		      		 var myDate = new Date(response.data[0].gameDate);
                   
                }
                    var hour=myDate.getHours();
									 var minute=myDate.getMinutes();
									  if (hour >= 0 && hour <= 9) {
			              hour= "0" + hour;
             			}
							    if (minute >= 0 &&minute <= 9) {
							       minute= "0" + minute;
							    }
							    var time=hour +":"+minute;
							    this.orderdatalist.gameTime=time;
							    this.orderdatalist.gameDate=this.rerdatereal(response.data[0].gameDate);
                })
                .catch(function(response) {
                })
  	}
  },
}
</script>

<style>
.ODD_first p {
    font-size: 1em;
}
.ODD_first span ,.ODD_second span{
    color: #a9a9a9;
    margin-left: 2%;
}
.ODD_first {
    background-color: white;
}
.ODD_first_top {
    border-bottom: 1px solid #ccc;
    padding: 10px;
}
.ODD_first_bottom{
    padding: 10px;
}
.ODD_second {
    background-color: white;
    margin-top:10px;
    padding: 10px;
}
.ODD_third {
    background-color: white;
    /*display: flex;*/
    margin-top:10px;
    padding: 10px;
}
.simplecolor{
	color: grey;
}
</style>

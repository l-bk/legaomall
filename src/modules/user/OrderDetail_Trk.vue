<template>
  <div class="ODT">
   
   <div style="height:5em ;line-height:5em;border-bottom:  1px solid #ccc;padding-left: 5%;">订单编号：<span style="font-size: 0.8em;color: grey;">{{this.$route.params.id}}</span></div>
  
   <timeline>
      <!--<timeline-item >
      	<div v-if="orderdetail.orderState==1">
          <p>正在联系球场方...</p>
          <p > 受理人：陈晓丽<span class="recent">[13246812935]</span></p>
          <p class="time_style">{{orderdetail.createDate}}</p>
          </div>
      </timeline-item>-->
      <timeline-item>
         <p v-if="orderdetail.orderState==0"> 您预订的<span class="recent">{{orderdetail.stadiumId}}</span>尚未付款</p>
          <p v-if="orderdetail.orderState==1"> 您已成功预订<span class="recent">{{orderdetail.stadiumId}}</span></p>
         <p class="time_style">{{orderdetail.createDate}}</p>
      </timeline-item>
      <timeline-item>
          <p>感谢您在乐高高尔夫预订，诚心为您服务 。</p>
         
          <p class="time_style">{{orderdetail.createDate}}</p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Timeline,
    TimelineItem
  },
  data(){
  	return{
  		orderdetail:{},
  	}
  },
   computed: mapState({ userinfo: state => state.userinfo }),
   mounted(){
   	this.getorderdetail();
   },
  methods:{
  	getorderdetail(){
  		var _this=this;
  		var user_id=this.userinfo.userId;
  		 this.$http.get('/restapi/cum/myorder/getByMyOrders?userId='+user_id+'&orderId='+this.$route.params.id)
                .then((response) => {
                	_this.orderdetail=response.data[0];
                	
                })
  	},
  	
  },
}
</script>

<style>
ODT h4 {
  width: 100%
}
.ODT {
  background-color:white;
}
.recent {
  color: #04BE02;
}
.time_style{
	color: gainsboro;
	font-size: 0.9em;
}
</style>

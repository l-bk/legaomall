<template>
	<div class="ordercompleted">
		<div style="text-align: center;padding-top: 10%;color: gray;">
	  <img src="../../../static/ordercompleted.png" style="vertical-align: middle;width: 20%;">
	  <p style="color: #2baaed;font-size: 1.3em;">订单提交成功！</p>
	  <br />
	  <p v-if="ordermsg.payWay==0">(在线预付)</p>
	  
	  <p v-if="ordermsg.payWay==1">(球场现付)</p>
	  <br />
	  <p style="text-align: left;padding-left: 13%;"><span style="color: black;">订单号：</span><span style="font-size: 0.8em;">{{ordermsg.orderId}}</span></p>
	  <p style="text-align: left;padding-left: 13%;"><span style="color: black;">球场名称：</span><span style="font-size: 0.8em;">{{ordermsg.stadiumId}}</span></p>
	  <br><br><br>
	  <p><button style="background-color:#2baaed ;color: white;width:85%;height:2.5em;border-radius: 0.5em;outline: none;font-size: 1.2em;border: none;" @click='gotohome'>确定</button></p>
	    </div>
	</div>
</template>
black
<script>
//	import {} from 'vux'
	import { mapState } from 'vuex'
	export default{
		components:{},
		 computed: mapState({ ordermsg: state => state.ordermsg}),
		 mounted(){
		 	
		 },
	data () {
    return {
     
      
    }
  },
  methods:{
  	
  	gotohome(){
  		if(this.ordermsg.orderType==3){
  			this.$router.push('/home/booking');
  		}
  		if(this.ordermsg.orderType==4){
  			this.$router.push('/home/block_Booking');
  		}
  		if(this.ordermsg.orderType==2){
  			this.$router.push('/home/golfactivity');
  		}
  		if(this.ordermsg.orderType==1){
  			this.$router.push('/home/hotpurchase');
  		}
  	}
  },
 
	}
</script>

<style>
.ordercompleted{
	width: 100%;
	height: 100%;
	position: fixed;
	background-color: white;
}	
</style>
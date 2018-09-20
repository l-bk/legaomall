<template>
  <div>
   <div class="integral_header">
       <div class="integral_value">
           <p style="padding-top: 20px;font-size: 20px;">现有积分</p>
           <p style="font-size: 2.5em;">{{userinfo.point}}</p>
        </div>
       <div style="width: 100%;margin-top: 7%;">
            <div slot="content" class="integral_card">
                <div class="integral_card_item">
                    <router-link to="/integral/integral_get" replace>
                    <p><div class="exchange_style"><img src="../../../static/earn.png" style="vertical-align: middle;width: 40%;"></div>赚取</p>
                    </router-link>
                </div>
                <div class="integral_card_item">
                    <router-link to="/integral/integral_exchange" replace>
                    <p><div class="exchange_style"><img src="../../../static/exchange.png" style="vertical-align: middle;width: 50%;"></div>兑换</p>
                    </router-link>
                </div>
            </div>
       </div>
   </div>
   <div >
       <router-view class="integral_routerView"></router-view>
   </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data(){
		return{
			intergraldata:[],
		}
	},
	mounted(){},
	 computed: {
	...mapState({ userinfo: state => state.userinfo }),
	...mapState({ ordermsg: state => state.ordermsg }),
},
methods:{
	  
}
}
</script>

<style>
a {
    color: white;
}
.integral_header {
	margin-top: -3%;
    color: white;
    width: 100%;
    height: 10%;
 
    
    background-image:url('../../../static/background.jpg');
    background-size:100% 100%; 
}
.integral_value {

    text-align: center;
}
.integral_card {
    display: flex;
    background-color: rgba(0, 0, 0, 0.2)
}
.integral_card :first-child {
    border: none;
}
.integral_card_item {
		
    flex: 1;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
   
    border-left: 0.5px solid white;
}
.integral_routerView{
	
	-webkit-overflow-scrolling: touch;
	 overflow-y: scroll;
    overflow-x: hidden;
     position: absolute;
     height:70%;
     width: 100%;
     
}
.exchange_style{
	width:40px	;
	height: 40px;
	border-radius: 4em;
	background-color: white;
	float: left;
	line-height:35px;
	margin-top: 3%;
	margin-left:30% ;
}
</style>

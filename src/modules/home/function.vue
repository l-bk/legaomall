<template>
	<div class="nav">
	 <flexbox :gutter="0" wrap="wrap" >
      <flexbox-item :span="1/4" >
      	<a  @click="gotohotpurchase">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0" > <img src="../../../static/rushtopurchase.png" style="width:45%"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 特惠抢购</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>
      
      
      
      <flexbox-item :span="1/4">
      	<a @click="gotogolfactivity">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/xpCompetition.png" style="width:45%"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 赛事活动</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>
      
      
      
      <flexbox-item :span="1/4">
      	<a @click="gotobooking">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/golfcourse.png" style="width:45%"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo">球场预订</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>
      
      
      <!--<flexbox-item :span="1/4">
      	<a @click="showmsg">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/travel.png" style="width:50%;"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 旅游套餐</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>-->
      
      
      <flexbox-item :span="1/4">
      	<a @click="gotoblock_Booking">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/activity.png" style="width:45%;"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 包场活动</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>
      
      
      <flexbox-item :span="1/4">
      	<a @click="signup">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/signin.png" style="width:45%;"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 今日签到</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>
      
      
      <!--<flexbox-item :span="1/4">
      	<a @click="showmsg">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/pointsmall.png" style="width:50%;"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 积分商城</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>-->
      
     
      <!--<flexbox-item :span="1/4">
      	<a @click="showmsg">
      		<flexbox orient="vertical" :gutter="0">
      		
      	<flexbox-item><div class="flex-demo0"> <img src="../../../static/snatch.png" style="width:50%;"></div></flexbox-item>
      		<flexbox-item><div class="flex-demo"> 一元夺宝</div></flexbox-item>
      		</flexbox>
      	</a>
      </flexbox-item>-->
      
      
     
    </flexbox>
    <toast v-model="showmymsg" type='text' width='9.0em' :time="800" is-show-mask text="敬请期待" position="middle"></toast>	
    <toast v-model="issignup" type='text' width='9.0em' :time="800" is-show-mask text="您已签到" position="middle"></toast>

	<v-showqd ref="showqd" ></v-showqd>
	</div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider,Toast  } from 'vux'
import VShowqd from '../user/QianDaologo'
import {mapState} from 'vuex'
export default {
  components: {
    Flexbox, FlexboxItem, Divider,Toast,VShowqd
  },
  data(){
  	return{
  		showmymsg:false,
  		issignup:false,//判断是否是已签到
  	}
  	
  },
  computed: mapState({ userinfo: state => state.userinfo }),
  methods:{
  	gotodiscount(){
  		
  		this.$router.push('/home/discount')
  	},
  	gotobooking(){
  		
  		this.$router.push('/home/booking')
  	},
  	gotohotpurchase(){
  		this.$router.push('/home/hotpurchase')
  	},
  	gotogolfactivity(){
  		this.$router.push('/home/golfactivity')
  	},
  		gotoblock_Booking(){
  		this.$router.push('/home/block_Booking')
  	},
  	showmsg(){
  		this.showmymsg=true;
  	},
  	signup(){
  		
  		if(this.userinfo.signStat==0){
  			this.qiandaoclick(this.userinfo,this.$refs.showqd);
  		}
  		if(this.userinfo.signStat==1){
  			this.issignup=true;
  		}
  		
  	},
  	
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.nav{
	background-color: white;
	margin:0;
	padding-bottom: 1.5%;
}
.flex-demo ,.flex-demo0{
  text-align: center;
  color: black;
 
  background-color:white;

  background-clip: padding-box;
  padding-top: 8px;
}
.flex-demo{
	text-align: center;
  color: black;
 
  background-color:white;

  background-clip: padding-box;
   padding-top: 1px;
   font-size: 0.8em;
}

</style>
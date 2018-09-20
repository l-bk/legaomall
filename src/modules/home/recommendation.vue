<template>
	<div class="recommendation-nav" >
		
		<!--<div @click='showmsg'>
		<flexbox orient="vertical" :gutter="0" class="active-box">
			<flexbox-item >
				<div style="position: relative;">
				<div class="flex-active" style=""><img src="../../../static/travling.png"></div>
			<div style="background-color: orange;width:10% ;height: 20%;position: absolute;top:0px;right: 10%;text-align: center;color: white;">旅游</div>
			</div>
			</flexbox-item>
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left:2% ;">【周末爆款】清迈四天三夜三场球</div></flexbox-item>
				
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="3/4" style="text-align: left;">
						<div style="padding-left:5% ;color: gray;">出团时间：11月4~11~25~30</div>
					</flexbox-item>
					
					<flexbox-item :span="1/4" >
						<div ><span class="active-price"><span style="font-size: 0.8em;">&#65509;</span>2330</span><span style="font-size:5px;color: gray;">起</span></div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
		</flexbox>
		</div>-->
		
		
		
		
		
		
		<div @click="gotopurbookingdetail(bookingList.link)" v-if="bookingList!=undefined">
		<flexbox orient="vertical" :gutter="0"  class="active-box">
			<flexbox-item >
				<div style="position: relative;">
				<div class="flex-active" style=""  ><img :src="bookingList.image"></div>
			<div style="position: absolute;top:-5%;right: 1%;text-align: center;color: white;"><img src="../../../static/bookchang.png" style="vertical-align: middle;width: 60%;"></div>
			</div>
			</flexbox-item>
		<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left:4% ;">{{bookingList.title}}</div></flexbox-item>
				
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="3/4" style="text-align: left;">
						<div style="padding-left:5% ;">
						<flexbox orient="vertical" :gutter="0"  >
							<flexbox-item>
								<div style="font-size: 0.9em;color: gray;">18洞，果岭，侗，柜，车</div>
							</flexbox-item>
							<flexbox-item>
							<div style="border:1px #2baaed solid;color:#2baaed;width:35%;text-align: center;border-radius: 15px;font-size: 0.8em;" >在线预付</div>	
								
								<!--<div style="border:1px #2baaed solid;color:#2baaed;width:35%;text-align: center;border-radius: 15px;font-size: 0.8em;" v-if="bookingList.tbPdmCourt.payment==0">在线预付</div>
							<div style="border:1px darkgray solid;color:darkgray;width:35%;text-align: center;border-radius: 15px;font-size: 0.8em;"  v-if="bookingList.tbPdmCourt.payment==1">球场现付</div>-->
								
							</flexbox-item>
						</flexbox>
						</div>
					</flexbox-item>
					
					<flexbox-item :span="1/4" >
						<div ><span class="active-price"><span style="font-size: 0.8em;">&#65509;</span>{{bookingList.price}}</span></div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
		</flexbox>
		</div>
	
	
	<toast v-model="showtravel" type='text' width='9.0em' :time="800" is-show-mask text="敬请期待" position="middle"></toast>
	</div>
</template>

<script>
import { Flexbox, FlexboxItem,Clocker, Cell, XProgress,Toast } from 'vux'

export default {
  components: {
    Flexbox, FlexboxItem,Clocker, Cell, XProgress, Toast
  },
  data(){
  	return {
  		showtravel:false,
  		bookingList:[],
  	}
  },
  mounted(){
  	this.bookingdata();
  },
  methods:{
  	showmsg(){
    	this.showtravel=true;
    },
   bookingdata:function(){
			    	var _this = this;
			    

			      this.$http({
            method:'GET',

  			url:'/restapi/cms/cmsActivityRecommend/activityRecommendList'
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
           
            var bookingList = data.data.recommendList[0];
           
            _this.bookingList=bookingList;

			      
        },function(error){
//        alert("error");
        });
    
    },
    gotopurbookingdetail(item){
	
	
	window.location.href=item;
},
  	}
  
}
</script>

<style>
	.recommendation-nav{
  		background-color: #ebebeb;
		padding-top: 10px;
		padding-bottom: 20px;
	}
</style>
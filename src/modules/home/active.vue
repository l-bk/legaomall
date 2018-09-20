<template>
	<div class="active-nav">
		
			
	<div v-for="item in defaultList">	
	<!--限时抢购-->
		
	
	<flexbox orient="vertical" :gutter="0"  class="active-box" v-if="item.moduleName=='特惠抢购'">
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/4">
						<div class="flex-active" ><img src="../../../static/hotpurchasetitle.png" style="width: 90%;height: 100%;margin-left: 5%;margin-top: -4%;"></div>
					</flexbox-item>
					<flexbox-item :span="2/4">
						<div class="flex-active" style="color: red;"></div>
					</flexbox-item>
					<flexbox-item :span="1/4">
						<div class="flex-active" @click="gotohotpurchase" style="color: gray;font-size: 0.8em;">更多抢购></div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<div class="flex-active" @click="gotopurchasedetail(item.link)" v-if="item.image==null||item.image==''"><img src="../../../static/purchasepic.png"></div>
				<div class="flex-active" @click="gotopurchasedetail(item.link)" v-if="item.image!=null&&item.image!=''"><img :src="item.image"></div>
				
					
		
			</flexbox-item>
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left:4% ;">{{item.title}}</div></flexbox-item>
				
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="4/5" >
						
					<div style="font-size: 1em;margin-left: 5%;color: red;">
					<span><img src="../../../static/alarmClock.png" style="width: 8%;vertical-align: middle;">&nbsp;剩余时间：</span>
					<span class="clock">
						
					          <clocker :time="item.endDate" slot="value">
					          <span >&nbsp;%D </span> 天
					          <span >&nbsp;%H </span>时
					          <span >&nbsp;%M </span>分
					          <span >&nbsp;%S </span> 秒
					          </clocker>
                        
					</span>
									
                 	</div>
								
						
					</flexbox-item>
					
					<flexbox-item :span="1/5" >
						
						<div class="active-price"><span style="font-size: 0.8em;">&#65509;</span>{{item.price}}</div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
			
		</flexbox>
		
	
		
		
		
		
		
		
		
		<!--乐高包场-->
		<div @click="gotopurblocketail(item.link)" v-if="item.moduleName=='乐高包场'">
		<flexbox orient="vertical" :gutter="0" class="active-box">
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/4">
						<div class="flex-active" style="margin-bottom: 5%;"><img src="../../../static/blocktitle.png" style="width: 95%;height: 100%;margin-left: 10%;"></div>
					</flexbox-item>
					<flexbox-item :span="3/4">
						<div class="flex-active" style="color: red;"></div>
					</flexbox-item>
					
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<div class="flex-active" @click="gotopurblocketail(item.link)" ><img :src="item.image" v-if="item.image!=null&&item.image!=''"></div>
				
				<div class="flex-active" @click="gotopurblocketail(item.link)" ><img src="../../../static/baochang.png"  v-if="item.image==null||item.image==''"></div>
			</flexbox-item>
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left: 4%;">{{item.title}}</div></flexbox-item>
				<!--<flexbox-item :span="1/4"></flexbox-item>-->
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="3/4" style="text-align: left;">
						<div style="padding-left: 5%;font-size: 0.9em;color: grey;">活动日期 ：{{rerdatereal(item.endDate)}}</div>
							
					</flexbox-item>
					
						
					
					<flexbox-item :span="1/4" >
						<div style="float: right;padding-right: 8%;"><span class="active-price" ><span style="font-size: 0.8em;">&#65509;</span>{{item.price}}</span><span style="font-size:0.7em;color: darkgray;">起</span></div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
		</flexbox>
		</div>
		
		
		
		
		<!--一元夺宝-->
		<!--<div @click='showmsg'>
		<flexbox orient="vertical" :gutter="0" class="active-box" >
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/4">
						<div class="flex-active" ><img src='../../../static/1$Indiana.png' style="width: 85%;height: 100%;padding-left: 5%;"></div>
					</flexbox-item>
					<flexbox-item :span="3/4">
						<div class="flex-active" style="color: red;"></div>
					</flexbox-item>
					
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<div class="flex-active"><img src="../../../static/yiyuan.png"></div>
			</flexbox-item>
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left: 2%;color: black;">【名额有限】佛山刚果岭卷</div></flexbox-item>
				
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" >
					<flexbox-item :span="3/4" style="text-align: left;">
						<div style="padding-left: 6%" >
							<flexbox orient="vertical" :gutter="0" >
								
								<flexbox-item>
						      <progress :value="value" max="100" ></progress>
						      </flexbox-item>
						      <flexbox-item>
						      	<div style="color:gray;">还需<span style="color:red">{{peopleamount}}</span>人次</div>
						      </flexbox-item>
						</flexbox>
						</div>
							
					</flexbox-item>
					
						
					
					<flexbox-item :span="1/4" >
						<div style="border:1px red solid;border-radius: 5px;color: red;width:75%;font-size: 0.8em;text-align: center;">立即夺宝</div>
					</flexbox-item>
				</flexbox>
			</flexbox-item>
		</flexbox>
		</div>-->
		
		
		</div>
	
	<toast v-model="showonedollarValue" type='text' width='9.0em' :time="800" is-show-mask text="敬请期待" position="middle" ></toast>	
	</div>
</template>

<script>
import { Flexbox, FlexboxItem,Clocker, Cell, XProgress,Toast} from 'vux'

export default {
  components: {
    Flexbox, FlexboxItem,Clocker, Cell, XProgress,Toast
  },
  data(){
  	return {
  		showonedollarValue:false,
  		value:80,
  		peopleamount:50,
  		 scrollTop: 0,
  		defaultList:[],
  		actitydate:''//活动日期
  	}
  },
  mounted:function(){
  	this.getdefaultList();
  	
  },
  methods:{
  	
    showmsg(){
    	this.showonedollarValue=true;
    },
  	gotohotpurchase(){
  		
  		this.$router.push('/home/hotpurchase')
  	},
  gotopurchasedetail(item){
				
				
	window.location.href=item;
			},
 gotopurblocketail(item){
	
	
	window.location.href=item;
},
//			限时抢购接口
  	getdefaultList:function(){
			    	var _this = this;
			    

			      this.$http({
            method:'GET',
//         
            url:'/restapi/cms/cmsActivityRecommend/activityRecommendList',
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
           
            var defaultList = data.data.defaultList;
            _this.defaultList=defaultList;

			      
        },function(error){
//        alert("error");
        });
    
    },
    
    	rerdatereal(item){
	 	
  	 	
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var day=dayNames[_date.getDay()];
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal = year+'-'+month+'-'+daytime+"("+day+')';
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
         var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var day=dayNames[_date.getDay()];
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
            var _rerdatereal = year+'-'+month+'-'+daytime+"("+day+')';
          return  _rerdatereal;
      	}
         
  	 	
  	 	

  	 	

      },

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.active-nav{
	background-color: #ebebeb;
	
}
.active-box{
	margin-top:8px ;
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: white;
}
.flex-active{
  text-align: center;
  color: black;
 /*background-clip: padding-box;*/
 vertical-align: middle;
 
}
.flex-active img{
	width:95%;
	height:150px;
	border-radius:5px ;
}
.flex-active0 img{
	vertical-align: middle;
	text-align: center;
}
.clock{
	/*text-align: center;*/
	color: red;
	/*vertical-align: middle;*/
	font-size: 0.8em;
}
.clock span{
	background-color: red;
	border-radius: 3px;
	color: white;
	text-align: center;
	height: 1.8em;
	width: 1.8em;
	line-height: 1.8em;
}
.active-price{
	color:red;
	text-align: center;
	font-size: 20px;
}
progress {
    width: 180px;
    height: 14px;
    border: 1px white solid;
    border-radius:5px ;
 /*   background-color:-webkit-linear-gradient(left, orange , red);*/
    color: white; /*IE10*/
}

progress::-moz-progress-bar { background:gainsboro;border-radius: 5px; }
progress::-webkit-progress-bar { background: gainsboro;border-radius: 5px; }
progress::-webkit-progress-value  { background:-webkit-linear-gradient(left, orange , red); border-radius: 5px;}
</style>
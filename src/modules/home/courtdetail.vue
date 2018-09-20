<template>
	<div>
	<div class="courtdetail"  v-show='courtdetailshow'>

		<div><swiper loop :list="baselist" auto style="width:100%;margin:0 auto;" height="9em" dots-class="custom-bottom" dots-position="center"></swiper></div>
	<div>
		<flexbox orient="vertical" :gutter="0">
			
			
			<flexbox-item>
				
				
				<flexbox orient="vertical" :gutter="0" style="padding-top: 1%;">
					
					<flexbox-item >
						<flexbox :gutter="0" wrap="wrap" style="padding-left:3%;padding-bottom:4%;">
							<flexbox-item :span="3/4"><div style="font-size: 1em;color: ;"><span>{{shop.shopName}}</span><!--<span><img src="../../../static/arrows.png" style="vertical-align: middle;margin-top: -1%;"></span>--></div></flexbox-item>
<!--							<flexbox-item :span="1/5"><div style="float: right;text-align:center;color:#2baaed" @click='share'>分享&nbsp;<img src="../../../static/share.png" style="vertical-align: middle;width: 30%;"></div></flexbox-item>
-->						
						</flexbox>
					</flexbox-item>
					
					
					
					
					
					<flexbox-item >
						
						<flexbox :gutter="0" wrap="wrap" style="padding-left:3%;padding-bottom:4%;border-bottom: 1px gainsboro solid;">
							<flexbox-item ><div ><a :href="phone"><img src="../../../static/contact.png" style="vertical-align: middle;padding-right:3%;width: 8%;" ></a>
							<img src="../../../static/weather2.png" style="vertical-align: middle;padding-right: 3%;width: 8%;" @click="showweather('weather')">
							<img src="../../../static/geographicLocation.png" style="vertical-align: middle;padding-right: 0%;width: 8%;" @click='gotomapping'>
							</div>
							</flexbox-item>
							

						</flexbox>
					
					</flexbox-item>
					
					
					
					<flexbox-item >
						<div @click="showweather('servce')" v-if="serverslength!=0">
						<flexbox :gutter="0" wrap="wrap" style="padding-bottom:4%;font-size: 0.9em;text-align: center;padding-top: 5%;">
							<flexbox-item>服务：</flexbox-item>
							
							<flexbox-item v-for='i in shop.tbPdmServices' style="text-align: center;">
								<flexbox :gutter="0" wrap="wrap" >
									<flexbox-item v-if="i.serviceId==1"><div ><div style="text-align: center;"><img src="../../../static/restaurant.png" style="vertical-align: middle;width: 25%;"></div><div style="font-size: 0.7em;color: gray;text-align: center;">中西餐厅</div></div></flexbox-item>
									<flexbox-item v-if="i.serviceId==2"><div ><div style="text-align: center;"><img src="../../../static/grogshop.png" style="vertical-align: middle;width: 25%;"></div><div style="font-size: 0.7em;color: gray;text-align: center;">酒店住宿</div></div></flexbox-item>
									<flexbox-item v-if="i.serviceId==3"><div ><div style="text-align: center;"> <img src="../../../static/golf.png" style="vertical-align: middle;width: 25%;"></div ><div style="font-size: 0.7em;color: gray;text-align: center;">练习场</div></div></flexbox-item>
									<flexbox-item v-if="i.serviceId==4"><div ><div style="text-align: center;"><img src="../../../static/rent.png" style="vertical-align: middle;width: 25%;"></div><div style="font-size: 0.7em;color: gray;text-align: center;">租用球具</div></div></flexbox-item>
									
								</flexbox>
							</flexbox-item>
							
							
							
							
							
							
							<flexbox-item><div><img src="../../../static/arrows.png"></div></flexbox-item>
							

						</flexbox>
						</div>
					</flexbox-item >
					
				
				
				</flexbox>
			</flexbox-item>
			<div style="width: 100%;height: 0.5em;background-color: #ebebeb;"></div>
			
			
			
			
			
			
			<flexbox-item>
				<flexbox :gutter="0" wrap="wrap" style="padding:2%;text-align: center;border-bottom: 1px gainsboro solid;">
					
					<flexbox-item style="padding-left: 15%;">
					<div  @click='gotodate()'>
					<div style="margin-left: -25%;color: gray;">
					<img src="../../../static/optiondate.png" style="vertical-align: middle;width: 30%;">日期
					 </div>
					<div><span style="margin-left: -30%;color: #2baaed;font-size: 0.9em;">{{day}}  {{choosingdate}}</span>&nbsp;&nbsp;<span style=""><img src="../../../static/timechoose.png" style="vertical-align: middle;width: 11%;margin-top: -3%;"></span></div>
					</div>
					</flexbox-item>
					
					<flexbox-item><div ><img src="../../../static/longstring.png"></div></flexbox-item>
					
						<flexbox-item style="padding-right: 15%;">
					<div @click='gototime'>
					<div ><img src="../../../static/time.png" style="vertical-align: middle;width: 30%;">
					<span style="padding-left: 3%;color: gray;">时间</span></div>
					<div style="padding-top: 5%;"><span style="color: #2baaed;font-size: 0.9em;">{{choosingtime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=""><img src="../../../static/timechoose.png" style="vertical-align: middle;width:10%;margin-top: -3%;"></span></div>
					</div>
						</flexbox-item>
					
				</flexbox>
				
				<flexbox :gutter="0" wrap="wrap" style="padding:4%;" v-for="item in shop.tbPdmShopSpecs">
					<flexbox-item style="padding-bottom:1%;">
						<div style="padding-bottom:1%;font-size: 1.1em;">{{item.spName}}</div>
						<div style="font-size:0.8em ;padding-bottom:2%;color: gray;">{{item.specInfo}}</div>
						<div style="border: 1px gray solid; width:35%;border-radius:0.5em;color: black;text-align:center;font-size: 0.8em;" v-if="item.payment==1">球场现付</div>
						<div style="border: 1px  #2baaed solid; width: 35%;border-radius: 0.5em;color: #2baaed;text-align:center;font-size: 0.8em;" v-if="item.payment==0">在线预付</div>
					</flexbox-item>
					<flexbox-item >
						<div style="float: right;padding-right: 15%;">
						<div style="color: red;font-size: 1.3em;"><span style="font-size: 0.8em;">&#65509;</span>{{item.promotePrice}}<span style="font-size: 0.5em;color: gray">/位</span></div>
						</div>
						<div @click="gotoorder(item)" style="float: right;clear:both;margin-right: 15%;border: 1px #2baaed solid; height:2em;line-height:2em;padding-bottom:2%;width: 5em;border-radius: 0.5em;background-color: #2baaed;color: white;text-align:center;font-size: 0.8em;">预订</div>
						
					</flexbox-item>
				</flexbox>
			</flexbox-item>
		
		
		
		</flexbox>
	</div>
	
	
	
	<div id="weather" style="display: none;">
	<div id="masker3"></div>
	  
	  
	  <div class="weathererror" @click="hideweather('weather')"><img src="../../../static/extraerror.png"></div>
	  
	  <div style="position: fixed;top: 26%;width: 80%;left:7%;height:15em;background-color: white;z-index: 9999;padding: 3%;">
		<div style="padding-bottom: 2%;"><span>
			<img src="../../../static/places.png" style="width: 12%;height: 1.5em;vertical-align: middle;"></span>
		   当地天气	
		</div>
		
		<hr />
		<div v-for='(item,index) in weatherInfo'>
		<div>
			<span v-if='index==0'>{{showdayname(0)}} 今天</span>
			<span  v-if='index==1'>{{showdayname(1)}} 明天</span>
			<span  v-if='index==2'>{{showdayname(2)}} 后天</span>
			<span style="padding-left: 15%;" v-if="item.weather.indexOf('晴')>=0"><img src="../../../static/clearweather.png" style="width: 12%;vertical-align: middle;padding-top: 5%;"> </span>
		   <span style="padding-left: 15%;" v-if="item.weather.indexOf('雨')>=0"><img src="../../../static/rain.png" style="width: 12%;vertical-align: middle;padding-top: 5%;"> </span>
		   <span style="padding-left: 15%;" v-if="item.weather.indexOf('云')>=0"><img src="../../../static/thundershower.png" style="width: 12%;vertical-align: middle;padding-top: 5%;"> </span>
		   <span style="padding-left: 13%;"> {{item.low}}&#176;C~{{item.high}}&#176;C</span>
		</div>
		<div style="font-size: 0.85em;color: grey;margin-top: -4%;"><span>{{item.date}}</span><span style="padding-left: 60%;">{{item.weather}}</span></div>
         </div>
	</div>
	</div>
	
	
	
	<div id="servce" style="display: none;">
	<div id="masker3"></div>
	  
		
	  
	  <div class="servceerror" @click="hideweather('servce')"><img src="../../../static/extraerror.png"></div>	  
	  <div style="position: fixed;top: 15%;width: 80%;left:7%;height:23em;background-color: white;z-index: 9999;padding: 3%;">
	  	
	  	<div v-for='i in shop.tbPdmServices'>
		<div v-if="i.serviceId==1" style="padding-left: 8%;color: gray;border-bottom: 1px #ebebeb solid;padding-bottom: 5%;padding-top: 2%;">
			<div><span style="padding-right: 5%;"><img src="../../../static/restaurant.png" style="vertical-align: middle;"> </span><span>中/西餐厅</span></div>
			<div style="font-size: 0.85em;padding-left: 1%;">多功能宴会厅可容纳100人，西餐厅约60个尊贵雅座</div>
		</div>
		
		
		<div v-if="i.serviceId==2" style="padding-left: 8%;color: gray;border-bottom: 1px #ebebeb solid;padding-bottom: 5%;padding-top: 2%;">
			<div><span style="padding-right: 5%;"><img src="../../../static/grogshop.png" style="vertical-align: middle;"> </span><span>住宿酒店</span></div>
			<div style="font-size: 0.85em;padding-left: 1%;">多功能宴会厅可容纳100人，西餐厅约60个尊贵雅座</div>
		</div>
		
		
		<div  v-if="i.serviceId==3" style="padding-left: 8%;color: gray;border-bottom: 1px #ebebeb solid;padding-bottom: 5%;padding-top: 2%;">
			<div><span style="padding-right: 5%;"><img src="../../../static/golf.png" style="vertical-align: middle;"> </span><span>练习场</span></div>
			<div style="font-size: 0.85em;padding-left: 1%;">60元/50个球</div>
		</div>
		
		
		<div v-if="i.serviceId==4" style="padding-left: 8%;color: gray;border-bottom: 1px #ebebeb solid;padding-bottom: 5%;padding-top: 2%;">
			<div><span style="padding-right: 5%;"><img src="../../../static/rent.png" style="vertical-align: middle;"> </span><span>租用球具</span></div>
			<div style="font-size: 0.85em;padding-left: 1%;">球杆租用200元/套，鞋子70元/双</div>
		</div>
		
		
	</div>
		
	</div>
	
	</div>
	
	
	</div>
	
	<date ref='showdate' v-on:child-say="showdate"></date>
	<timeselect ref='showtime' v-on:child-say="showtime"></timeselect>
	<toast v-model="showshare" type='text' width='9.0em' :time="800" is-show-mask text="请使用微信分享" position="top" ></toast>
	</div>
</template>

<script>
	import { Swiper,Flexbox, FlexboxItem,Toast} from 'vux' 
	 import { mapActions } from 'vuex'
	  import { mapState } from 'vuex'
	  import { USERINFO_SIGN } from '../../store/userinfo'
    import { ORDERMSG_SIGN } from '../../store/ordermsg'
	export default{
	components:{Swiper,Flexbox, FlexboxItem,Toast,
	  Date:resolve => {require(['./date.vue'], resolve)},
      Timeselect:resolve => {require(['./timeselect.vue'], resolve)},
    
	},
	data(){
		return{
			serverslength:'',
			showshare:false,/*分享的提示*/
			courtdetailshow:true,/*订场详情的展示与否*/
			phone:'',
			weatherInfo:[],
			baselist:[],
			fulldate:'',
			choosingdate:'',
			choosingtime:'09:00',
			shop:{},
			day:'',
			msg:{},//分享信息的对象
			ordermsg:{stadiumId:"",fuStadiumId:"",orderPrice:"",gameDate:"",productPrice:"",priceinclude:'',payWay:'',gameTime:'',gameNum:"0",lianxiPerson:"",lianxiNum:"",note:"填写备注",orderType:"3",userId:"",orderId:'',cancel:'',cost:'',reserve:'',minusRedpacket:'0',activityId:'',shopSpId:'',redPackageDeduction:''},
			
		}
	},
 created (){
 	this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 1000)
 },
 computed:{
 	...mapState({ userinfo: state => state.userinfo }),
 	...mapState({ location: state => state.location }),
 	
 },
	mounted(){
//		
		this.courtdetaildata();
		this.getmyDay();
		this.getphonenum();

	
	},
	methods: {
		gotomapping(){
			this.$router.push('/home/mapping');
		},
		getphonenum(){//获取客服电话
  		var _this=this;
  		this.$http.get('/restapi/cms/article/serviceImg')
				.then((response)=>{
					var id=response.data[0].id;
				_this.$http.get('/restapi/cms/article/selectContact?id='+id)
				.then((response)=>{
					
					_this.phone='tel:'+response.data.contact;
				
				})
				.catch(function(response){
					
				})
				})
				.catch(function(response){
					
				})
  	},
		 
		share(){
			this.showshare=true;
		},
		 ...mapActions([USERINFO_SIGN]),
		 gotodate(){
  		
		this.$refs.showdate.show();
		this.courtdetailshow=false;
  	},
		 	showdate(sign){
		
		
		this.$refs.showtime.showmytime=sign;
		this.$refs.showdate.showmydate=false;

  		
  	},
  	
  	gototime(){
 
			
		
		this.$refs.showtime.show();
  		this.courtdetailshow=false;  
  	},
  	showdayname(item){
  		var dayNames = new Array("周日","周一","周二","周三","周四","周五","周六");
  		var myDate = new Date();
  		if(myDate.getDay()+item-6>0)
  		{
  			var day=dayNames[myDate.getDay()+item-7];
  		}
  		if(myDate.getDay()+item-6<=0){
  			 var day=dayNames[myDate.getDay()+item];
  		}
  		
  		
  		 return day;
  	},
  	showtime(sign){
  		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六")
		this.courtdetailshow=sign; 
		this.$refs.showtime.showmytime=false;
		this.choosingtime=sign;
		var month=this.userinfo.month;
		var daytime=this.userinfo.day;
		if (month >= 1 && month <= 9) {
	        month = "0" + month;
		    }
		    if (daytime >= 0 && daytime <= 9) {
		        daytime= "0" + daytime;
		    }
		this.choosingdate=month+"-"+daytime;
		
        this.ordermsg.gameDate=this.userinfo.year+'-'+this.userinfo.month+"-"+this.userinfo.day+' '+this.userinfo.time+':00';
  	    this.ORDERMSG_SIGN(this.ordermsg);
  	    var mydate=new Date(this.ordermsg.gameDate);
  	    var day=dayNames[mydate.getDay()];
		this.day=day;
		this.choosingtime=this.userinfo.time;
//      alert(this.userinfo.year+'-'+this.userinfo.month+"-"+this.userinfo.day+' '+this.userinfo.time+':00');
  	},
		 	
		courtdetaildata(){
			    	var _this = this;
			    var id=this.$route.params.id;
			   
			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/goods/getSpecDetail?id='+id,
             url:'/restapi/pdm/shop/getShopDetail?shop_id='+id,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
          
		window.sessionStorage.lon=data.data.tbPdmShop.longitude ;
		window.sessionStorage.lat=data.data.tbPdmShop.latitude;
          _this.getweather(data.data.tbPdmShop.latitude,data.data.tbPdmShop.longitude);
            var shop = data.data.tbPdmShop;
            _this.serverslength=shop.tbPdmServices.length;//球场服务的数组长度 
            _this.shop =shop ;
            
    		 _this.msg.name=_this.shop.shopName;
          _this.msg.shopDesc=_this.shop.shopDesc;
            _this.msg.userName=_this.userinfo.lianxiPerson;
           _this.msg.image=_this.shop.shopImg;
           if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
		   var myurl= window.sessionStorage.url.split('#')[0];
		  
		   } else {
		   var myurl = window.location.href.split('#')[0];
		   
		   }
           
       _this.sharetowx(myurl,_this.msg,1);
       
       
       var baselist = data.data.shopAlbumList;
			       
		            for(var i=0;i<baselist.length;i++){
		            	var obj=new Object();
		            	
		            	obj.img='http://120.24.249.13:38080'+baselist[i];
		            	
		            	_this.baselist.push(obj);
		            }
			      
        },function(error){
          alert("error");
        });
    
    },
    getweather(lat,lon){
    	var _this=this;
				
				
				this.$http.get('http://120.24.249.13:9010/restapi/weather?latitude='+lat+"&longitude="+lon).then(function(res){
			        
			        _this.weatherInfo = res.data.list;
			       
			      }).catch(function(err) {
			      	
			        console.log(err);
			      });
    },
			showweather(item){
				
				
				
  		var weather= document.getElementById(item);
  		weather.style.display="block";
  	},
  		hideweather(item){
  		var weather= document.getElementById(item);
  		weather.style.display="none";
  	},
  	...mapActions([ORDERMSG_SIGN]),
		gotoorder(item) {
			
			this.ordermsg.stadiumId=this.shop.shopName;
			this.ordermsg.fuStadiumId=item.spName;
			this.ordermsg.productPrice=item.promotePrice;
			this.ordermsg.activityId=item.shopId;
			this.ordermsg.shopSpId=item.shopSpId;
			this.ordermsg.gameTime=this.choosingtime;
			this.ordermsg.priceinclude=item.priceMemo;
			this.ordermsg.payWay=item.payment;
			this.ordermsg.userId=this.userinfo.userId;
			this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
			this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
			this.ordermsg.reserve=item.reserve;
			this.ordermsg.redPackageDeduction=item.redPackageDeduction;
			this.ordermsg.cancel=item.cancel;
			this.ordermsg.cost=item.cost;
			this.ORDERMSG_SIGN(this.ordermsg);
			this.$router.push('/home/orderpage')
		},

		getmyDay(){
			var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
			var myDate = new Date();
			var day=dayNames[myDate.getDay()+1];
			var month=myDate.getMonth()+1;
			var daytime=myDate.getDate()+1;
			var year=myDate.getFullYear();
			this.userinfo.year=year;
			
			this.userinfo.month=month;
			
			this.userinfo.day=daytime;
			
			this.USERINFO_SIGN(this.userinfo);
//			var hour=myDate.getHours();
//			var minute=myDate.getMinutes();
			
			 if (month >= 1 && month <= 9) {
	        month = "0" + month;
		    }
		    if (daytime >= 0 && daytime <= 9) {
		        daytime= "0" + daytime;
		    }
			this.choosingdate=month+'-'+daytime;
			this.ordermsg.gameDate=year+'-'+this.choosingdate+' '+'09:00:00';
			this.day= day;
			
		},
		
		
	}
	}
</script>

<style>
	.courtdetail{
		width: 100%;
		height: 100%;
		
		background-color: white;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.weathererror{
	position: fixed;
	z-index:99999;
	top:28%;
	right: 10%;
	
}
.servceerror{
		position: fixed;
	z-index:99999;
	top:17%;
	right: 10%;
}
#masker3{
	position: fixed;
	width: 100%;
	height:100%;
	background-color:black ;
		top:0;
		opacity:0.2;
		z-index:999;
		overflow: hidden;
		
}

</style>
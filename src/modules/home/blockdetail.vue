<template>
	<div>
		<div v-show='blockdetailshow' class="blockdetail">
			
		
		<div>
     		<img :src="blockdetailList.bpImg" style="width:100% ;height: 10em;" v-if="blockdetailList.bpImg!=''&&blockdetailList.bpImg!=null">
			<img src="http://sc.jb51.net/uploads/allimg/140628/10-14062PAGB04.jpg" style="width:100% ;height: 10em;" v-if="blockdetailList.bpImg==''||blockdetailList.bpImg==null">

		</div>
	
	
	<flexbox orient="vertical" :gutter="0">
			
			
			<flexbox-item >
						<flexbox :gutter="0" wrap="wrap" style="padding-bottom:1%;padding-left: 4%;">
							<flexbox-item ><div style="font-size: 1em;" class="block_fontstyle" id="bpName"> </div></flexbox-item>
							<!--<flexbox-item ><div style="float: right;padding-right:15%;text-align:center;color:#2baaed" @click='share'>分享<img src="../../../static/share.png" style="vertical-align: middle;width: 25%;"></div></flexbox-item>-->
						</flexbox>
					</flexbox-item>
					
					
					
					
					
					<flexbox-item >
						<div style="border-bottom: 1px gainsboro solid;">
						<flexbox :gutter="0" wrap="wrap" style="padding-bottom:4%;padding-left: 4%;">
							<flexbox-item >
							<div ><a :href='phone'><img src="../../../static/contact.png" style="vertical-align: middle;padding-right:3%;width: 8%;"></a>
							<img src="../../../static/weather2.png" style="vertical-align: middle;padding-right: 3%;width: 8%;" @click="showweather">
							<img src="../../../static/geographicLocation.png" style="vertical-align: middle;padding-right: 0%;width: 8%;" @click='gotomapping'>
							<div style="float: right;color: red;margin-right: 10%;font-size: 1.1em;"><span style="font-size: 0.8em;">&#65509;</span>{{blockdetailPrice}}</div>
							</div>
							
							</flexbox-item>
							

						</flexbox>
						</div>
					</flexbox-item>
					
					
					
			
			
			
			
			<flexbox-item style="font-size: 0.8em;color: gray;">
				<flexbox :gutter="0" wrap="wrap" style="padding:4%;text-align: center;border-bottom: 1px gainsboro solid;">
					
					<flexbox-item style="padding-left: 10%;">
					
					
					
					<div @click="showPosition('top',1)">
						
					
					<div style="margin-left: -10%;color: gray;">
					<img src="../../../static/optiondate.png" style="vertical-align: middle;width: 30%;">日期
					 </div>
					<div><span style="margin-left: -20%;color:gray;">{{day}}  {{choosingdate}}</span>&nbsp;&nbsp;<span style=""><img src="../../../static/timechoose.png" style="vertical-align: middle;width: 11%;margin-top: -2%;"></span></div>
					</div>
					</flexbox-item>
					
					<flexbox-item><div ><img src="../../../static/longstring.png"></div></flexbox-item>
					
					
					<flexbox-item style="padding-right: 10%;">
						
					<div @click='gototime'>
					<div ><img src="../../../static/time.png" style="vertical-align: middle;width: 25%;">
					<span style="padding-left: 3%;color: gray;">时间</span></div>
					<div style="margin-top: 3%;"><span style="margin-left: 0%;color: #2baaed;">{{choosingtime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=""><img src="../../../static/timechoose.png" style="vertical-align: middle;width: 11%;margin-top: -2%;"></span></div>
					</div>
					</flexbox-item>
					
				
				</flexbox>
				
			</flexbox-item>
			
			
			
			<flexbox-item style="font-size: 0.9em;padding: 3%;margin-bottom: 5%;">
			<div style="padding-left: 2%;" v-if="blockdetailList.joinNumber==blockdetailList.maxJoinNumber&&typeof(blockdetailList.joinNumber)==undefined"><img src="../../../static/alreadyfull.png" style="width: 30%;height: 2.5em;"></div>	
			<div style="color:black;padding-left: 4%;font-weight: bold;" v-if="blockdetailList.joinNumber!=blockdetailList.maxJoinNumber">已报名：<span style="color: #2baaed;">{{blockdetailList.joinNumber}}人</span> <progress :value="blockdetailList.joinNumber" :max="blockdetailList.maxJoinNumber" ></progress></div>
			
			</flexbox-item>
			
			
			
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="padding-left: -1%;margin-top: -8%;">
			
				
				
				
			    <flexbox-item :span="1/7" v-for="(img,index) in headlist" v-if='index<14&&showallhead==false' ><span style=""><img :src="img" style="width:55%;border-radius: 2em; height:1.8em;vertical-align: middle;margin-left: 20%;margin-top: 15%;"></span></flexbox-item >
			    
			    <flexbox-item :span="1/7" v-for="(img,index) in headlist" v-if='showallhead==true'><span style=""><img :src="img" style="width:55%;border-radius: 2em; height:1.8em;vertical-align: middle;margin-left: 20%;margin-top: 15%;"></span></flexbox-item >
			  

	
				</flexbox >
			
			
			</flexbox-item>
			
			
			
			<flexbox-item><div style="text-align: center;" @click="loadingmoreteam(0)" id="downimg"><img src="../../../static/down1.png" style="width: 4%;"></div></flexbox-item>
			<flexbox-item><div style="text-align: center;display: none;" @click="loadingmoreteam(1)" id="upimg"><img src="../../../static/up.png" style="width: 4%;"></div></flexbox-item>
			
			
	
	</flexbox>
	<div style="height: 0.5em;background-color: #ebebeb;"></div>
	
	
	
	<div style="margin-bottom: 20%;font-size: 0.85em;">
		<div style="font-size:1.1em;padding-left:4%;color: #2baaed;border-bottom: 1px #ebebeb solid;padding-top: 2%;padding-bottom: 2%;"><span><img src="../../../static/bookingDetails.png" style="width: 8%;height: 1.4em;vertical-align: middle;margin-right: 2%;"></span>详情</div>
		<div id='bpdetail' style="height:auto;width: 99%;margin-left: 3.5%;"></div>
	</div>
   
	
	
	<div id="weather" style="display: none;">
	<div id="masker3"></div>
	  
	  
	  <div class="weathererror" @click="hideweather"><img src="../../../static/extraerror.png"></div>
	  
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
	
	
	
	<div style="position: fixed;bottom: 0;width: 100%;color: white;"> 
	
	<div style="background-color:#2baaed;font-size: 1.2em; width:100%;height:2.8em ;float: right;text-align: center;line-height: 2.8em;">
      
      <div @click="gotoblockpay" v-if="blockcode!=001&&blockcode!=002&&blockcode!=006">立即报名</div>
      <div v-if="blockcode==001" @click="showPosition ('top',0)">您已报名</div>
      <div v-if="blockcode==002">报名人数已满</div>
      <div v-if="blockcode==006" @click="showPosition ('top',2)">立即报名</div>
     </div>
	</div>
	
	
	
	
    </div>
    <toast v-model="showhasorder" type='text' width='9.0em' :time="800" is-show-mask text="您有订单还没支付" position="position" ></toast>
    <toast v-model="showPositionValue" type='warn' width='9.0em' :time="800" is-show-mask text="包场不能选择日期" position="position"></toast>
    <toast v-model="showBlockValue" type='text' width='9.0em' :time="800" is-show-mask text="您已包场" position="bottom"></toast>
	<date ref='showdate' v-on:child-say="showdate"></date>
	<timeselect ref='showtime' v-on:child-say="showtime"></timeselect>
	<setpaypassdialog ref="dialog"></setpaypassdialog>
	</div>
</template>


<script>
import { XProgress, Cell, Divider,Flexbox, FlexboxItem,Toast } from 'vux'
 import { mapActions } from 'vuex'
    import { ORDERMSG_SIGN } from '../../store/ordermsg'
     import { USERINFO_SIGN } from '../../store/userinfo'
import { mapState } from 'vuex'
export default {
  components: {
    
    Divider,
   Flexbox, 
    FlexboxItem,
    Cell,
   Toast,
    XProgress,
    Date:resolve => {require(['./date.vue'], resolve)},
    Timeselect:resolve => {require(['./timeselect.vue'], resolve)},
     Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
   computed: {
   	...mapState({ userinfo: state => state.userinfo }),
   	...mapState({ location: state => state.location }),
   },
  data () {
  	
    return {
    	showallhead:false,
    	msg:{},//分享信息的对象
    	showhasorder:false,
    	phone:'',
    	headlist:[],
    	blockdetailPrice:'',
    	activityDate:'',
    	 position: 'default',
    	showPositionValue:false,/*该字段表示包场日期不可选择的提示*/
    	showBlockValue:false,/*该字段表示报名栏的提示*/
    	blockdetailshow:true,
    	weatherInfo:[],
    	month:'',
    	blockcode:'',/*该字段是表示包场的情况，003为还可以包场,001表示该用户已经包场，002表示包场人数已满*/
    	nowday:'',
      blockdetailList:{},
      choosingdate:'',
	  choosingtime:'09:00',
	  day:'',
     ordermsg:{stadiumId:"",fuStadiumId:"",minPrice:'',maxPrice:'',orderPrice:"",gameDate:"",productPrice:"",priceinclude:'',payWay:'0',gameTime:'',gameNum:1,lianxiPerson:"张三三",lianxiNum:"15113895233",note:"填写备注",orderType:"4",userId:"",orderId:'',bpId:'',minusRedpacket:'0',activityId:''},

    }
  },
  updated(){
  	this.getpdetail();
  	
	
	this.controlimg_style('bpdetail','94%','10em');
  },
  mounted(){
	
	this.getphonenum();
	this.blockdetaildata();
	
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
  	getweather(lat,lon){
    	var _this=this;
				
				
				this.$http.get('http://120.24.249.13:9010/restapi/weather?latitude='+lat+"&longitude="+lon).then(function(res){
			        
			      _this.weatherInfo = res.data.list;
//			        for(var i=0;i<weatherInfo.length;i++){
//			        	var weatherobj=new Object();
//			        	weatherobj.weather=weatherInfo[i].weather;
//			        	weatherobj.high=weatherInfo[i].high;
//			        	weatherobj.date=weatherInfo[i].date;
//			        	weatherobj.low=weatherInfo[i].low;
//			        	weatherobj.city=weatherInfo[i].city;
//			        	_this.weatherInfo.push(weatherobj);
//			        	
//			        	
//			        }
//			       console.log(_this.weatherInfo);
			      }).catch(function(err) {
			      	
			        console.log(err);
			      });
    },
  	...mapActions([USERINFO_SIGN]),
  	 showPosition (position,value) {
  	 	
      this.positon=position;
      if(value==1)
      this.showPositionValue=true;
      if(value==0)
       this.showBlockValue=true;
       if(value==2)
       this.showhasorder=true;
    },
//	gotodate(position){
//		this.position = position;
//    this.showPositionValue = true;
////		this.$refs.showdate.show();
////		this.blockdetailshow=false;
//	},
  	showdate(sign){
		
		
		this.$refs.showtime.showmytime=sign;
		this.$refs.showdate.showmydate=false;

  		
  	},
  	
  	
  	gototime(){
  		 
			
		
		this.$refs.showtime.show();
  		this.blockdetailshow=false; 
  		
  	},
  	showtime(sign){
  		
		this.blockdetailshow=sign; 
		this.$refs.showtime.showmytime=false;
		this.choosingtime=sign;
        this.ordermsg.gameDate=this.userinfo.year+'-'+this.userinfo.month+"-"+this.userinfo.day+' '+this.userinfo.time+':00';
  	    this.ORDERMSG_SIGN(this.ordermsg);
  	   
  	    var time= this.rerdatereal(this.ordermsg.gameDate,3);
  	    if(time>=14)
  	    {
  	    	this.blockdetailPrice=this.blockdetailList.price;
  	    }
  	    if(time<14)
  	    {
  	    	this.blockdetailPrice=this.blockdetailList.minPrice;
  	    }
  	},
  	 rerdatereal(item,id){
  	 	
  	 	/*id=0,表示返回的是年，月和日*/
  	 	if(id==0){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal = year+'-'+month+'-'+daytime;
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
         var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal =year+'-'+month+'-'+daytime;
          return  _rerdatereal;
      	}
         
  	 	}
	 	/*id=1,表示返回的是月和日*/
  	 	if(id==1){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal = month+'-'+daytime;
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
         var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		this.userinfo.year=year;
			this.userinfo.month=month;
			this.userinfo.day=daytime;
			this.USERINFO_SIGN(this.userinfo);
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal =month+'-'+daytime;
          return  _rerdatereal;
      	}
         
  	 	}
  	 	
  	 	/*id=2,表示返回的是星期几*/
  	 	if(id==2){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var _rerdatereal=dayNames[_date.getDay()];
          
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
      		 var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
          var _rerdatereal = dayNames[_date.getDay()];
          return  _rerdatereal;
      	}
         
  	 	}
  	 	
  	 	
  	 	/*id=3,表示返回的是小时*/
  	 	if(id==3){
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		
      		var _rerdatereal=_date.getHours();
          
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
      		var _rerdatereal=_date.getHours();
          return  _rerdatereal;
      	}
         
  	 	}
      
      },
  		getmyDay(activitytime){
  			
			
			var _this=this;
			this.choosingdate=this.rerdatereal(activitytime,1);
		
			this.day=this.rerdatereal(activitytime,2);
			var year=this.userinfo.year;
			var month=this.userinfo.month;
			var daytime=this.userinfo.day;
			if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
			var activityDate=year+'-'+month+'-'+daytime;
            this.$http.get('/restapi/pdm/bp/judgeNumber?userId='+this.userinfo.userId+'&bpId='+this.$route.params.id+'&activityDate='+activityDate)
                .then((response) => {
                	
                   _this.blockcode=response.data.code;
                   if(response.data.code=='006'){
				_this.$refs.dialog.showdialog=true;
				_this.$refs.dialog.title='您尚有该包场订单未支付！'
				_this.$refs.dialog.path='/qcydorderrewrite/'+response.data.orderId;
				_this.$refs.dialog.handlename='前往支付';
			}
                    
                })
                .catch(function(response) {
                })
		},
		getheadlist(bpname){
			this.$http.get('/restapi/pdm/bp/getUserAvatarImg?bpId='+this.$route.params.id)
                .then((response) => {
                	
                   this.headlist=response.data.avatarImg;
                    
                })
                .catch(function(response) {
                })
		},
		getpdetail(){
			var bpdetail=document.getElementById('bpdetail');
			
        
        	bpdetail.innerHTML=this.blockdetailList.bpDetail;
		},
		
  	blockdetaildata(){
  		
			    var _this = this;
			    var id=this.$route.params.id;
			   
			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/bp/getBpDetail?bp_id='+id,
            url:'/restapi/pdm/bp/getBpDetail?bp_id='+id,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
        	
		
            //赋值给alllist数组,
            _this.phone='tel:'+data.data.tbPdmShop.shopTel;
            window.sessionStorage.lon=data.data.tbPdmShop.longitude ;
		    window.sessionStorage.lat=data.data.tbPdmShop.latitude;
            _this.getweather(data.data.tbPdmShop.latitude,data.data.tbPdmShop.longitude);
            var blockdetailList = data.data;
            _this.blockdetailList=blockdetailList;
            _this.writetitle(_this.blockdetailList,1,'包场','bpName');
			_this.getmyDay(blockdetailList.activityDate);
			_this.activityDate=blockdetailList.activityDate;
			 _this.blockdetailPrice =blockdetailList.minPrice;
			 _this.ordermsg.minPrice=blockdetailList.minPrice;
			 _this.ordermsg.maxPrice=blockdetailList.price;
			  _this.ordermsg.bpId=id;
			
			 _this.ordermsg.gameDate=_this.rerdatereal(blockdetailList.activityDate,0)+' '+"09:00:00";
			  _this.ORDERMSG_SIGN(_this.ordermsg);
			  _this.getheadlist(data.data.bpName);
			  
			_this.msg.name=_this.blockdetailList.bpName;
          _this.msg.shopDesc=_this.blockdetailList.bpDetail;
            _this.msg.userName=_this.userinfo.lianxiPerson;
           _this.msg.image=_this.blockdetailList.bpImg;
           if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
		   var myurl= window.sessionStorage.url.split('#')[0];
		  
		   } else {
		   var myurl = window.location.href.split('#')[0];
		   
		   }
       _this.sharetowx(myurl,_this.msg,1);
		
			      
     
        },function(error){
          alert("error");
        });
    
    },
   
  	showweather(){
  		var weather= document.getElementById("weather");
  		weather.style.display="block";
  	},
  		hideweather(){
  		var weather= document.getElementById("weather");
  		weather.style.display="none";
  	},
   ...mapActions([ORDERMSG_SIGN]),
    gotoblockpay(){
    	    this.ordermsg.stadiumId=this.blockdetailList.bpName;
			this.ordermsg.activityId=this.$route.params.id;
			this.ordermsg.productPrice=this.blockdetailPrice;

			this.ordermsg.gameTime=this.choosingtime;
			this.ordermsg.userId=this.userinfo.userId;
			this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
		this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
		
			this.ORDERMSG_SIGN(this.ordermsg);
    	this.$router.push('/home/blockpay')
    },
    loadingmoreteam(id){
      	  	this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 300)
    	if(id==0){
    		
    		this.showallhead=true;
    		var downimg=document.getElementById('downimg');
    		var upimg=document.getElementById('upimg');
    		downimg.style.display='none';
    		upimg.style.display='block';
    	}
    	if(id==1){
    		this.showallhead=false;
    		var downimg=document.getElementById('downimg');
    		var upimg=document.getElementById('upimg');
    		downimg.style.display='block';
    		upimg.style.display='none';
    	}
    	

    },
    
   
   
//  isloadingextra(){
//  	if(!window.name){
//  		var extra=document.getElementById("extra");
//  		extra.style.display="block";
//  		window.name="purchasrdetail"
//  	}
//  }
    
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.block_fontstyle{
	
     white-space: normal;
    	
     color:black;
    width:100%;
    
		}
.blockdetail{
		/*position: relative;*/
		width: 100%;
		height: 100%;
		background-color: white;
		position: fixed;
		overflow-y: scroll;
		overflow-x: hidden;
	}

.tab-swiper {
  background-color: #fff;
  height: 100px;
}
.weathererror{
	position: fixed;
	z-index:99999;
	top:28%;
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

progress {
    width: 40%;
    height: 0.6em;
    border: 1px solid #ebebeb;  
    border-radius:5px ;
    background-color:#ebebeb;
    color:#ebebeb; /*IE10*/
}

progress::-moz-progress-bar { background: #0064B4;border-radius: 5px; }
progress::-webkit-progress-bar { background: #ebebeb;border-radius: 5px; }
progress::-webkit-progress-value  { background: #2baaed; border-radius: 5px;}
</style>
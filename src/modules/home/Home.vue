<template>
	<div >
    <div class="home" id="home" v-show='showhome'>
	
	<div class='myscroll' id='myscroll'>
	<div class="myscroll_nav">
	<Shufflingfigure></Shufflingfigure>
	<function></function>
	<active></active>
	<flexbox orient="vertical" :gutter="0" class="recommendation">
			<flexbox-item>
				<div style="padding-top: 10px; color: #2baaed;text-align: center;font-size: 1.3em;">产品推荐</div>
			</flexbox-item>
			<flexbox-item>
				<div style="text-align: center;">—— &middot; 超惠 &middot; 超值 &middot; 超赞 &middot; ——</div>
			</flexbox-item>
		</flexbox>
	<recommendation></recommendation>
	<div class="home-bottom"><divider>亲!到底啦~</divider></div>
	</div>
	</div>
	
	
	
	<div style="width:100% ;height: 7.5%;position: fixed;top:0%;text-align: center;color:white;" id="headbar">
    	<flexbox :gutter="0" wrap="wrap">
    		<flexbox-item :span="2/9" style="padding-left: 3%;" >
    		<div @click="gotomap">
    			<flexbox :gutter="0" wrap="wrap">
    			<flexbox-item :span="4/7"><div style="font-size: 0.8em;padding-top: 2%;" >{{dircity}}</div></flexbox-item>
    			<flexbox-item :span="2/7" style="padding-right: 2%;"><img src="../../../static/triangularform.png" id="triangle" style="width: 45%;"></flexbox-item>
    			</flexbox>
    		</div>	
    		</flexbox-item >
    		 
    		 <flexbox-item :span="3/7" style="text-align: center;padding-left: 3%;">
    			<div > <router-link to='/home/coursesearch'><input placeholder="请输入球场名搜索订场/旅游" class="myinput" id='myinput'></router-link></div>	
    		</flexbox-item>
    		
    		<flexbox-item :span="1/9" style="padding-left:17%;padding-top: 3%;">
    			<div @click="gotomapping" ><img src="../../../static/location.png"  id="locationimg" style="width: 50%;"></div>	
    		</flexbox-item>
    	</flexbox>
    </div>
    <div style="position: absolute;top:46%;right:0%;border-radius: 3em;" @click="gototop" v-if='showtop==1'><img src="../../../static/top.png" style="width: 67%;margin-left: 22%;"></div>
	<div style="position: absolute;top:55%;right: 0%;border-radius: 3em;" @click="gotocontactman"><img src="../../../static/customservice.png" style="height:4rem;"></div>
	<div id="showhongbao" style="display: none;overflow: hidden;">
  <div id="masker"></div>
  
   	<div id="errorfirst" @click="hongbaocancel"><img src="../../../static/error.png"></div>
   	
   	<div id="hongbao">
   		
   		<div><img src="../../../static/redPacket.png"></div>
   	 <div  style="padding-left: 22%;margin-top: -12%;"><button @click="hongbaoget">立即领取></button></div>
   	</div>
   
   
   </div>
   
   
   
   <div id="hbsuccess" style="display: none;overflow: hidden;">
  <div id="masker"></div>
  
   	<div id="errorsecond" @click="hongbaonotchenck"><img src="../../../static/error.png"></div>
   	<div id="hongbao">
   	<div><img src="../../../static/redPacketSuc.png"></div>
   <div id="msg"> 领取成功!</div>
   <div  @click="hongbaocheck" style="padding-left: 23%;"><button>查看红包></button></div>
   
   </div>
   
   </div>
   
   </div>
   <Mapping ref='showmap' v-on:fun="showmap"></Mapping>
</div>	
</template>
<script>
	

import { Flexbox, FlexboxItem,Divider} from 'vux'
import Shufflingfigure from './Shufflingfigure'
import Function from './function'
import Active from './active'
import Recommendation from './recommendation'

import { mapState } from 'vuex'
import { mapActions } from 'vuex'

import { USERINFO_SIGN } from '../../store/userinfo'
var mystorage=window.localStorage;
	export default{
		components:{ Shufflingfigure,Function,Active,Flexbox, FlexboxItem,Recommendation,Divider,
		Mapping:resolve =>{require(['./map.vue'], resolve)}
		
		},
		data(){
			return{
				showhome:true,
				showtop:'0',/*为1时显示回到顶部图片*/
				transparency:0,/*透明度*/
				scroll:0,/*滚动条的值*/
				dircity:'',/*定位城市*/
				userinfo:{
					userId:'',
					lianxiPerson:'',
					lianxiNum:'',
					headimgurl:'',
					point:'',
					sex:'',
					redPackets:'',
					commission:'',
					referralCode:'',
					year:'',month:'',day:'',time:'',signStat:''
				},
				
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
		mounted(){
			
	    this.isuserlongin();
		this.getuserinfo();
			
		window.addEventListener('scroll',this.scrollfunc,true);
		
		
		  
		},

	methods:{
		 gotomap(){
    	this.$refs.showmap.isshow=true;
    	this.showhome=false;
    	this.$emit('fun',false);
    	
    	},
		showmap(fun){
			
			this.dircity=fun;
			this.showhome=true;
			this.$emit('fun',true);
		},
		gototop(){/*回到顶部*/
			
			var top=document.getElementById("myscroll").scrollTop;
			while(top!=1){
			top=top-1;
			
           document.getElementById("myscroll").scrollTop=top;  
      
			
			 
			}
			
		},
		scrollfunc(){
			
			if(this.$route.name=="首页"){
				
			
			   var myinput=document.getElementById('myinput');
			   var locationimg=document.getElementById('locationimg');
			   var triangle=document.getElementById('triangle');
				var headbar=document.getElementById('headbar');	    	
			  var myscroll=document.getElementById("myscroll").scrollTop;
//			  if(this.transparency<1&&myscroll-this.scroll==1){
//			  
//			  	this.transparency=this.transparency+0.2;
//			  	headbar.style.opacity=this.transparency;
//			  }
//			  if(this.transparency>0&&this.scroll-myscroll==1){
//			  	console.log(this.transparency);
//			  	this.transparency=this.transparency-0.1;
//			  	headbar.style.opacity=this.transparency;
//			  }
             if(myscroll>100){
             	myinput.style.background='url(../../../static/search_search1.png)center left 4px no-repeat';
             	myinput.style.backgroundColor='gainsboro';
             	myinput.setAttribute('class', 'myinput change')
             	headbar.style.backgroundColor='white';
             	headbar.style.borderBottom='1px solid gainsboro';
             	headbar.style.color='black';
             	triangle.src='../../../static/triangularform1.png';
             	locationimg.src='../../../static/location-2.png';
             }
			if(myscroll<100){
				myinput.style.background='url(../../../static/search_search.png) center left 4px no-repeat';
				myinput.style.backgroundColor='ghostwhite';
				myinput.setAttribute('class', 'myinput ')
             	headbar.style.backgroundColor='';
             	headbar.style.borderBottom='';
             	headbar.style.color='white';
             	triangle.src='../../../static/triangularform.png';
				locationimg.src='../../../static/location.png';	            
			}
			if(myscroll>300){
				this.showtop=1;
			}
			if(myscroll<300){
				this.showtop=0;
			}
			this.scroll=myscroll;
//         console.log(myscroll);
      }     
},
		...mapActions([USERINFO_SIGN]),
 			getuserinfo()
				{
					window.sessionStorage.url=document.URL;
//					alert(mystorage.lianxiPerson);
					if(mystorage.userId!=undefined){
					this.userinfo.userId=mystorage.userId;
			          this.userinfo.lianxiPerson=mystorage.lianxiPerson;
			          this.userinfo.lianxiNum=mystorage.lianxiNum;
			           this.userinfo.headimgurl=mystorage.headimgurl;
			           this.userinfo.referralCode=mystorage.referralCode;
			           this.userinfo.redPackets=mystorage.redPackets;
			           this.userinfo.signStat=mystorage.signStat;
					  this.USERINFO_SIGN(this.userinfo);
					  this.locationshow();
					  
					}
					
					if(mystorage.userId==undefined){
						this.locationshow();
					 var _this=this;
					 
					 var name="code";
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = window.location.search.substr(1).match(reg);
				     if(r!=null){
				    var code=unescape(r[2]);
				    
				   
				     this.$http({
			            method:'GET',
			            url:'/restapi/index1?code='+code ,
			            //使用定义的全局变量 用$get()获取t
			         
			            
			        }).then(function(data){
			            //赋值给alllist数组,
						
//			           alert(data.data.userinfo.userId);
			          mystorage.userId=data.data.userinfo.userId;
			          mystorage.lianxiPerson=data.data.userinfo.userName;
			          mystorage.lianxiNum=data.data.userinfo.phone;
			          mystorage.referralCode=data.data.referralCode;
			           mystorage.headimgurl=data.data.headImgUrl;
			           mystorage.signStat=data.data.userinfo.signStat;
			           mystorage.redPackets=data.data.userinfo.redPackets;
			            mystorage.payPassword=data.data.userinfo.payPassword;
			           _this.userinfo.redPackets=data.data.userinfo.redPackets;
			          _this.userinfo.userId=data.data.userinfo.userId;
			          _this.userinfo.lianxiPerson=data.data.userinfo.userName;
			          _this.userinfo.lianxiNum=data.data.userinfo.phone;
			           _this.userinfo.headimgurl=data.data.headImgUrl;
			            _this.userinfo.referralCode=data.data.referralCode;
			            _this.userinfo.signStat=data.data.userinfo.signStat;
			            
					  _this.USERINFO_SIGN(_this.userinfo);
					  if(data.data.code!="000"){
					  	var hongbao=document.getElementById("showhongbao");
					  hongbao.style.display="block";
					  }
			 		 

 

			        },function(error){
//			          alert("error");
			        });
				     
					
					}
					}
					
					
					
				    
				},
			getcity(){
				this.dircity=this.mapping.city;
				
			},
			
             //领取红包
			hongbaoget(){
				this.$http.get('/restapi/cum/red/updateRedPackets?userId='+this.userinfo.userId+'&redState=1')
                .then((response) => {
//                  this.redPackets=response.data.redPackets;
                })
                .catch(function(response) {
                })
				var hbsuccess=document.getElementById("hbsuccess");
				var hongbao=document.getElementById("showhongbao");
				
				
				hongbao.style.display="none";
				hbsuccess.style.display="block";
				
				
				
			},
			//不领取红包
			hongbaocancel(){
				this.$http.get('/restapi/cum/red/updateRedPackets?userId='+this.userinfo.userId+'&redState=0')
                .then((response) => {
//                  this.redPackets=response.data.redPackets;
                })
                .catch(function(response) {
                })
				var hbsuccess=document.getElementById("hbsuccess");
				var hongbao=document.getElementById("showhongbao");
				
				hbsuccess.style.display="none";
				hongbao.style.display="none";
//				this.isshow=true;
			},
			//不查看红包
			hongbaonotchenck(){
				
				var hbsuccess=document.getElementById("hbsuccess");
				var hongbao=document.getElementById("showhongbao");
				
				hbsuccess.style.display="none";
				hongbao.style.display="none";
//				this.isshow=true;
			},
			//查看红包
			hongbaocheck(){
				
				var hbsuccess=document.getElementById("hbsuccess");
				
				hbsuccess.style.display="none";
				this.$router.push('/hongbao/HB_unreceived');
				
			},
			
			gotocontactman(){
				this.$router.push('/contact/contactman')
			},
			isuserlongin(){
//				window.localStorage.clear();
                	
				
				var redirect_uri="http%3A%2F%2Fprogolf.uerbx.com";
				var _this=this;
				if(mystorage.name!='home'){
					
				
					mystorage.name="home";

					 this.$http({
			            method:'GET',
			            url:'/restapi/indexBefore?redirect_uri='+redirect_uri ,
			            //使用定义的全局变量 用$get()获取t
			         
			            
			        }).then(function(data){
			            //赋值给alllist数组,
		
			          
			          location.href=data.data.url;
					   
			        },function(error){
//			          alert("error");
			        });
				
				
				
				}
			},
		

    locationshow(){
    	
    	
    	 var _this=this;
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				
				window.sessionStorage.lat=r.latitude;
				window.sessionStorage.lon=r.longitude;
				
				_this.dircity=r.address.city;
				
				
				
				
								
				var gg_lat= r.latitude;//纬度
				var gg_lon = r.longitude;//经度
				
				var __this= _this;
				 _this.$http({
			            method:'GET',
			            url:'/restapi/locate?gg_lon='+ gg_lon+'&gg_lat='+gg_lat,
			            //使用定义的全局变量 用$get()获取t
			         
			            
			        }).then(function(data){
			            //赋值给alllist数组,
		
			           
			           
//			           alert("当前定位是："+__this.dircity);
						      
			        },function(error){
//			          alert("error");
			        });
			}
			else {
				alert('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true})
    	
    	

    },
   
    gotomapping(){
    	this.$router.push('/home/mapping');
    },
    
		},
		
	}
</script>

<style>
	
.home{
	width: 100%;
	height: 100%;
	
}	

.home-bottom {
	color: gray;
	width:100%;
	height: 5em;
	
	/*font-size: 8px;*/
	text-align: center;
	margin-bottom: 10%;
	
	
	
}
.myscroll{
 position: absolute;
  overflow-y:scroll;
 
 -webkit-overflow-scrolling: touch;
height:100%;
width: 100%;
}
/*myscroll_nav{
	
	-webkit-overflow-scrolling: touch;
}*/
.recommendation{
	
	
	color: gray;
	
}
#masker{
	position: fixed;
	width: 100%;
	height:100%;
	background-color:black ;
		top:0;
		opacity:0.7;
		z-index:999;
		overflow: hidden;
}
#hongbao{
	position: fixed;
	width: 100%;
	height:100%;
	/*background-color:grey ;*/
		top:29%;
		left: 10%;
	/*	opacity:0.6;*/
		z-index:99999;
		
}
#hongbao img{
	width: 80%;
	height: 50%;
}
#hongbao button{
	width: 50%;
	height: 2em;
	background-color: #FF69B4;
	outline: none;
	border: 1px solid orange;
	border-radius:15px ;
	color: white;
	
}
#errorfirst,#errorsecond{
	position: fixed;
	width: 100%;
	height:100%;
	/*background-color:grey ;*/
		top:25%;
		left: 75%;
	/*	opacity:0.6;*/
		z-index:99999;
}


#msg{
	color: white;
	padding-left: 31%;
	margin-top: -9%;
}
.myinput{
	margin-top: 3%;
	width:110%;
	border:1px white solid;
	height: 2.0em;
	border-radius: 1em;
	outline: none;
	font-size: 0.7em;
	color:white;
	text-align: center;
	text-indent: 7%;
	
	background:url(../../../static/search_search.png) center left 4px no-repeat ;
	background-color: white;
}

#myinput.change::-webkit-input-placeholder {
  color: white;
}
#myinput.change:-moz-placeholder {
  color: white;
}
#myinput.change:-ms-input-placeholder {
  color: white;
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import setWechatTitle from './utils/setWechatTitle.js'
import store from './store/'
import  { LoadingPlugin } from 'vux'
Vue.config.productionTip = false
Vue.use(LoadingPlugin)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {path:'/',
    redirect:'/home'},

{
    path:'/home',
    meta: { auth: false },
    component: resolve => require(['./modules/home/Home'], resolve),
    name:'首页',
    title:'首页'
},

{
    path:'/home/discount',

     meta: { auth: false },
    component: resolve => require(['./modules/home/discount'], resolve),
    name:'特惠时段',
    title:'特惠时段'
},
{
    path:'/home/booking',
    
     meta: { auth: false },
    component: resolve => require(['./modules/home/booking'], resolve),
    name:'订场',
    title:'订场'
},
   {
    path:'/home/hotpurchase',
   
     meta: { auth: false },
    component: resolve => require(['./modules/home/Hotpurchase'], resolve),
    name:'特惠抢购'
},
{
    path:'/home/purchasedetail/:id',
     meta: { auth: false },
    component: resolve => require(['./modules/home/purchasedetail'], resolve),
    
    name:'抢购详情'
},
{
    path:'/home/courtdetail/:id',
     meta: { auth: false },
    component: resolve => require(['./modules/home/courtdetail'], resolve),
   
    name:'球场详情'
},
{
    path:'/home/orderpage',
    meta: { auth: false },
    component: resolve => require(['./modules/home/orderpage'], resolve),

    name:'填写订单'
},
{
    path:'/home/paypage',
     meta: { auth: false },
    component: resolve => require(['./modules/home/paypage'], resolve),
   
    name:'订单支付'
},
{
    path:'/home/purchasepaypage',
     meta: { auth: false },
    component: resolve => require(['./modules/home/purchasepaypage'], resolve),
   
   
    name:'抢购支付'
},
{
    path:'/home/ordercompleted',
     meta: { auth: false },
    component: resolve => require(['./modules/home/ordercompleted'], resolve),
   
   
    name:'提交完成'
},
//{
//  path:'/home/map/:id',
//   meta: { auth: false },
//  component: resolve => require(['./modules/home/Map'], resolve),
// 
//  name:'乐高商城'
//},
{
    path:'/home/mapping',
     meta: { auth: false },
    component: resolve => require(['./modules/home/Mapping'], resolve),
   
    name:'地图定位'
},
{
    path:'/home/coursesearch',
     meta: { auth: false },
    component: resolve => require(['./modules/home/coursesearch'], resolve),
    
    name:'球场搜索'
},
{
    path:'/home/golfactivity',
    meta: { auth: false },
    component: resolve => require(['./modules/home/golfactivity'], resolve),
    
    name:'赛事活动'
},
{
    path:'/home/golfactivitydetail/:id',
     meta: { auth: false },
    component: resolve => require(['./modules/home/golfactivitydetail'], resolve),
    
    name:'赛事详情'
},
{
    path:'/home/golfpaypage',
     meta: { auth: false },
    component: resolve => require(['./modules/home/golfpaypage'], resolve),
    
    name:'赛事支付'
},
   {
    path:'/home/block_Booking',
     meta: { auth: false },
    component: resolve => require(['./modules/home/block_Booking'], resolve),
    
    name:'乐高包场'
},
{
    path:'/home/blockdetail/:id',
     meta: { auth: false },
    component: resolve => require(['./modules/home/blockdetail'], resolve),
    
    name:'包场详情'
},
{
    path:'/home/blockpay',
     meta: { auth: false },
    component: resolve => require(['./modules/home/blockpay'], resolve),
    
    name:'包场报名'
},


{
    path:'/contact/contactman',
     meta: { auth: false },
    component: resolve => require(['./modules/contact/contactman'], resolve),
   
    name:'客服联系'
},
{
    path:'/home/softkeybord',
     meta: { auth: false },
    component: resolve => require(['./modules/home/softkeybord'], resolve),
   
    name:'支付'
},



{
    path:'/hongbao',
     meta: { auth: false },
    component: resolve => require(['./modules/hongbao/Hongbao'], resolve),
    redirect:'/hongbao/HB_unreceived',
    name:'红包',
     children:[
      {
      	meta: { auth: false },
        path:'/hongbao/HB_get',
        component: resolve => require(['./modules/hongbao/HB_get'], resolve),
        name:'红包',
      },
      {
      	meta: { auth: false },
        path:'/hongbao/HB_use',
        component:resolve => require(['./modules/hongbao/HB_use'], resolve),
        name:'红包',
      },
      {
      	meta: { auth: false },
        path:'/hongbao/HB_unreceived',
        component:resolve => require(['./modules/hongbao/HB_unreceived'], resolve),
        name:'红包',
      }
    ]
},

{
	meta: { auth: false },
    path:'/user',
   component:resolve => require(['./modules/user/User'], resolve),
    name:'我的信息'

},
{
	meta: { auth: false },
    path:'/changepassword',
   component:resolve => require(['./modules/user/changepass'], resolve),
    name:'支付密码设置'

},
{
	meta: { auth: false },
    path:'/wallet',
    redirect:'/wallet/wallet_payDetail',
    component:resolve => require(['./modules/user/Wallet'], resolve),
    name:'我的钱包',
    children:[
      {
      	meta: { auth: false },
        path:'/wallet/wallet_payDetail',
        component:resolve => require(['./modules/user/Wallet_payDetail'], resolve),
        name:'我的钱包',
      },
      {
      	meta: { auth: false },
        path:'/wallet/wallet_rechargeDetail',
        component:resolve => require(['./modules/user/Wallet_rechargeDetail'], resolve),
        name:'我的钱包',
      }
    ]
},
{
	meta: { auth: false },
    path:'/integral',
    redirect:'/integral/integral_get',
   component:resolve => require(['./modules/user/Integral'], resolve), 
    name:'我的积分',
    children:[
      {
      	meta: { auth: false },
        path:'/integral/integral_get',
       component:resolve => require(['./modules/user/Integral_get'], resolve), 
        name:'我的积分'
      },
      {
      	meta: { auth: false },
        path:'/integral/integral_exchange',
         component:resolve => require(['./modules/user/Integral_exchange'], resolve), 
        name:'我的积分'
      }
    ]
},
{
	meta: { auth: false },
    path:'/orderFL',
   component:resolve => require(['./modules/user/OrderFL'], resolve),
    name:'订单分类'
},
{
	meta: { auth: false },
    path:'/qcydorderList/:id',
    component:resolve => require(['./modules/user/QCYDorder/QCYDorderList'], resolve),
    name:'我的订单',
},
{
	meta: { auth: false },
    path:'/qcydorderrewrite/:id',
   component:resolve => require(['./modules/user/QCYDorder/QCYDorderRewrite'], resolve),
    
    name:'订单修改',
},
{
	meta: { auth: false },
    path:'/orderList/orderdetail/:id',
    component:resolve => require(['./modules/user/OrderDetail'], resolve),
   
    name:'订单详情'
},
{
	meta: { auth: false },
    path:'/test',
    
    component:resolve => require(['./modules/user/test'], resolve),
   
},
{
	meta: { auth: false },
    path:'/rechargepage',
    component:resolve => require(['./modules/user/RechargePage'], resolve),
    
    name:'充值'
}  
]

const router = new VueRouter({
	mode:'history',//去掉URL中的'#'
  routes,
})
//router.beforeEach(({meta, path}, from, next) => {
//  var { auth = true } = meta
//  var isLogin = Boolean(store.state.user.id) //true 用户已登录， false 用户未登录
//
//  if (auth && !isLogin && path !== '/login') {
//      return next({ path: '/login' })
//  }
//  next()
//})
 FastClick.attach(document.body)

// Vue.config.productionTip = false

/* eslint-disable no-new */
//Vue.prototype.showmsg = function () {
//	
//}

Vue.prototype.controlimg_style=function(name,width,height){//适配详情图片的样式
			var imgs=document.getElementById(name).getElementsByTagName("img");
			
			for(var i=0;i<imgs.length;i++){
				imgs[i].style.width=width;
				imgs[i].style.height=height;
			}
		},  		
Vue.prototype.writetitle=function(list,key,name,id){
				if(key==0){
					var myarray=list;
				for(var i=0;i<myarray.length;i++){
					var item=document.getElementById(i);
					if(name=='包场'){
					item.innerHTML=myarray[i].bpName;
				}
					if(name=='特惠'){
					item.innerHTML=myarray[i].spName;
				}
					if(name=='赛事'){
					item.innerHTML=myarray[i].matchName;
				}
					
				}
				}
				
			
				if(key==1){
					var myarray=list;
					var item=document.getElementById(id);
					if(name=='包场'){
					item.innerHTML=myarray.bpName;
				}
					if(name=='特惠'){
					item.innerHTML=myarray.spName;
				}
				if(name=='赛事'){
					item.innerHTML=myarray.matchName;
				}
				}
				
			},
Vue.prototype.url_property=function(name){
	if(window.location.href.indexOf(name)!=-1){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 var property=unescape(r[2]);
	 
	window.sessionStorage.commission=property;
	}
	 
	
}
Vue.prototype.qiandaoclick=function(userinfo,showqd){//签到的全局方法，不同页面用到了该方法

      		
           this.$http.post('/restapi/cum/userinfo/updatepoint',{userId:userinfo.userId})
                .then((response) => {
                   
                    
                    
                    showqd.originalscore=userinfo.point;
                    showqd.latestscore=response.data.point;
                    userinfo.point=response.data.point;
                    userinfo.signStat=response.data.sign_stat;
                    
                 if(response.data.sign_stat==1){
                	showqd.show();
                }
                  
                })
                
                .catch(function(response) {
                    // console.log(response)
               })
      

}



Vue.prototype.userLogin=function(userinfo,USERINFO_SIGN){//用户登录

	if(window.localStorage.userId!=undefined){
		
		userinfo.userId=window.localStorage.userId;
  userinfo.lianxiPerson=window.localStorage.lianxiPerson;
  userinfo.lianxiNum=window.localStorage.lianxiNum;
   userinfo.headimgurl=window.localStorage.headimgurl;
   userinfo.referralCode=window.localStorage.referralCode;
   userinfo.redPackets=window.localStorage.redPackets;
   
  USERINFO_SIGN(userinfo);
	}
//	if(window.localStorage.userId==undefined){
//		
//	}
}

//Vue.prototype.getlocation=function(url){//微信jssdk获取地理位置
//	
//	var myurl=encodeURIComponent(url);
//	 var _this=this;
//   	this.$http({
//          url: '/restapi/index2?url='+myurl,
//           method:'GET',
//                
//			        }).then(function(data){
//			    
//              wx.config({
//
//		          	debug: false,
//                  appId: data.data.appId,
//                  timestamp: parseInt(data.data.timestamp),
//                  nonceStr: data.data.nonceStr,
//                  signature: data.data.signature,
//                  jsApiList: [
//                      'getLocation','openLocation'
//                  ]
//              });
//            })
//               wx.ready(function () {
//              
//              //获取地理位置
//              wx.getLocation({
//									    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//									    success: function (res) {
//									    	
//									        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//									        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//									        var speed = res.speed; // 速度，以米/每秒计
//									        var accuracy = res.accuracy; // 位置精度
////									        window.localStorage.lat=res.latitude;
////									        window.localStorage.lon=res.longitude;
//									        console.log(latitude+'--'+longitude);
//									    }
//									});
//               
//               
//               })
//               
//               
//}
Vue.prototype.sharetowx=function(url,msg,id){//调用微信jssdk,分享至朋友圈，朋友
	

//	alert(url);
	var myurl=encodeURIComponent(url);
		
	 var _this=this;
     	this.$http({
            url: '/restapi/index2?url='+myurl,
             method:'GET',
                  
			        }).then(function(data){
//			  				alert(data.data.signature);
                wx.config({

		          			debug: false,
                    appId: data.data.appId,
                    timestamp: parseInt(data.data.timestamp),
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: [
                        'onMenuShareAppMessage','onMenuShareTimeline'
                    ]
                });
                
                wx.ready(function () {
                	 
                	 if(id==0){//特惠抢购的分享方式。
                		
                		   wx.onMenuShareAppMessage({
                    	title:msg.userName+'推荐你抢购:'+msg.name, // 分享标题
									    desc:'原价'+msg.marketPrice+'元 '+'抢购价'+msg.promotePrice+'元 ', // 分享描述
									    link:msg.url, // 分享链接
									    imgUrl: msg.image, // 分享图标
//									   trigger: function (res) {
//                          alert('用户点击发送给朋友');
//                      },
//                        fail: function (res) {
//                         alert(JSON.stringify(res));
//                      },
				                success: function () { 
				                	
				                    alert('分享成功！')
				                },
//				                cancel: function () { 
//				                	alert('falied');
//				                    // 用户取消分享后执行的回调函数
//				                    alert("分享失败！")
//				                }
				            });
                    
                    wx.onMenuShareTimeline({
											    title: msg.userName+'推荐你抢购:'+msg.name, // 分享标题
											    link: msg.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
											    imgUrl: msg.image, // 分享图标
											    success: function () { 
											       alert("分享成功！") // 用户确认分享后执行的回调函数
											    },
											    cancel: function () { 
											    	alert('failed'+reason);
//											         alert("分享失败！") // 用户取消分享后执行的回调函数
											    }
											});
                	}
                	
                	
                	
                	
                	
                	
                	       	if(id==1){//其他模块的分享方式。
                		
                		   wx.onMenuShareAppMessage({
					              title:msg.userName+'给你推荐:'+msg.name, // 分享标题
										    desc:msg.shopDesc, // 分享描述
										    link:url, // 分享链接
										    imgUrl: msg.image, // 分享图标
										    type: '', // 分享类型,music、video或link，不填默认为link
										    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            alert("分享成功！")
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                            alert("分享失败！")
                        }
                    });
                    
                    wx.onMenuShareTimeline({
											    title: msg.userName+'给你推荐:'+msg.name, // 分享标题
											    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
											    imgUrl: msg.image, // 分享图标
											    success: function () { 
											       alert("分享成功！") // 用户确认分享后执行的回调函数
											    },
											    cancel: function () { 
											         alert("分享失败！") // 用户取消分享后执行的回调函数
											    }
											});
                	}
                 
                });
                wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//          alert("errorMSG:"+res.errMsg);
        });
                
                
            
        })
	
}
Vue.prototype.rerdatereal = function (item){//兼容iPhone和android的时间格式参数
	
         if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
          var _rerdatereal = _date.getFullYear()+'-'+month+'-'+_date.getDate();
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
      		 var month=_date.getMonth()+1;
          var _rerdatereal = _date.getFullYear()+'-'+month+'-'+_date.getDate();
          return  _rerdatereal;
      	}
      },
      
      
      //调起微信支付接口的函数
Vue.prototype.jsApiCall = function (orderId,user_id,ordermsg){
	
	var _this=this;
	  this.$http.get('/restapi/wx/toPay?orderId='+orderId+'&userId='+user_id+'&minusRedpacket='+ordermsg.minusRedpacket)
                .then((response) => {
					
 //调用微信JS api 支付
        
            WeixinJSBridge.invoke(
            	
             'getBrandWCPayRequest', {  
           "appId": response.data.data.appId,     //公众号名称，由商户传入      
           "timeStamp":response.data.data.timeStamp,         //时间戳，自1970年以来的秒数      
           "nonceStr":response.data.data.nonceStr , //随机串      
           "package" : response.data.data.package,     //统一订单号  
           "signType" : "MD5",         //微信签名方式：      
           "paySign" : response.data.finalsign //支付签名  
       },  
       function(res){     
　　　　　
           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
           	
           
							//判断是否是包场，并改变包场人数。
			            if(ordermsg.orderType=='4') {
			            	var __this=_this;
			            	 
						  _this.$http.get('/restapi/pdm/bp/addJoinNumber?bpId='+ordermsg.bpId+'&addNum='+ordermsg.gameNum)
			               .then((response) => {
				               
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			           //判断是否是特惠抢购，并改变剩余分数。
			            if(ordermsg.orderType=='1') {
			            	
			            	 
						  _this.$http.get('/restapi/pdm/shop/updateGoodsNumber?spId='+ordermsg.spId+'&saleNum='+ordermsg.gameNum)
			               .then((response) => {
				                
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			              //判断是否是钱包充值，并改变钱包。
			            if(ordermsg.orderType=='5') {
			            
			            	 
						  _this.$http.get('/restapi/cum/userinfo/saveTopup?userId='+ordermsg.userId+'&price='+ordermsg.orderPrice)
			               .then((response) => {
				                
			                })
			                .catch(function(response) {
			                })
						        	
						        }
			            
			            
			             //判断是否是赛事活动，并改变剩余分数。
			            if(ordermsg.orderType=='2') {
			            	var __this=_this;
			            	 
						  _this.$http.get('/restapi/match/matchdate/updateApplyNumAndLimitNum?id='+ordermsg.activityid)
			               .then((response) => {
				               
			                })
			                .catch(function(response) {
			                })
						        	
						        }
           	 
           	 _this.$router.push('/home/ordercompleted');
           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
           if(res.err_msg == "get_brand_wcpay_request:fail"||res.err_msg == "get_brand_wcpay_request:cancel" ) {
           	alert('支付失败 ');
           	_this.$router.push('/home');
           }    //
           
       }  
            );



                })
                .catch(function(response) {
                })
					
	 
        

       
}
  
  
  //监听微信浏览器,调起微信支付函数
 Vue.prototype.callpay = function (){
 	
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                }
            }else{
                this.jsApiCall();
            }
        
}
// router.afterEach(function(transition){
// 	console.log(transition);
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')


router.afterEach((to, from) => {
  var _name = to.name
  setWechatTitle(_name)// ...
  
})

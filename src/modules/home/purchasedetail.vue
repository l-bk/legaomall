<template>
	<div class="purchasedetail">
		
		<div>
			
			<img :src="purchasedetailList.image" style="width:100% ;height: 10em;" v-if="purchasedetailList.image!=''&&purchasedetailList.image!=null">
			<!--<img src="http://sc.jb51.net/uploads/allimg/140628/10-14062PAGB04.jpg" style="width:100% ;height: 10em;" v-if="purchasedetailList.image==''||purchasedetailList.image==null">-->
		</div>
	
	
	<flexbox orient="vertical" :gutter="0">
			
			
			<flexbox-item>
				
				
				<flexbox orient="vertical" :gutter="0" style="padding:4%;">
					
					<flexbox-item >
						<flexbox :gutter="0" wrap="wrap" style='margin-top: -4%;margin-left: -1%;'>
							<flexbox-item :span="2/3"><div style="font-size: 1em;width: 160%;" id='spName'></div></flexbox-item>
							<!--<flexbox-item :span="1/3"><div style="float: right;padding-right:15%;text-align:center;color:#2baaed" @click='share'>分享<img src="../../../static/share.png" style="vertical-align: middle;width: 25%;"></div></flexbox-item>-->
						</flexbox>
					</flexbox-item>
					
					
					
					<flexbox-item style="font-size: 0.9em;color: darkgray;">
						<div >开始时间：{{purchasedetailList.startTime}}</div>
						<div>结束时间：{{purchasedetailList.dueDate}}</div>
						<div >使用时间：{{purchasedetailList.useTime}}</div>
						<div style="color: red;">抢购提示：抢购前请仔细阅读抢购须知</div>
						<div style="color: red;float: right;font-size: 1.5em;padding-right: 9%;"><span style="font-size: 0.8em;">&#65509;</span>{{purchasedetailList.promotePrice}}<span style="font-size: 0.5em;color:black;">/位</span></div>
					</flexbox-item>
					
					
					
				
				
				</flexbox>
			</flexbox-item>
			<div style="width: 100%;height: 0.5em;background-color: #ebebeb;"></div>
			
			
			
			
			
			</flexbox>
	
	
	
	<div style="overflow-y: auto;	overflow-x: hidden;">
       <tab :line-width=2 active-color='#2baaed' bar-active-color="red" v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="350px" :show-dots="false">
        <swiper-item  key="0">
          <div class="tab-swiper vux-center"> <div class="purchaseswiper" id='robKnown'> </div></div>
        </swiper-item>
        <swiper-item key="1">
          <div class="tab-swiper vux-center"> <div class="purchaseswiper" id='feeInclude'></div></div>
        </swiper-item>
        <swiper-item key="2">
          <div class="tab-swiper vux-center"><div class="purchaseswiper" id='detail' ></div></div>
        </swiper-item>
      </swiper>
    </div>
    
    
   
	<!--活动期间-->
	<div style="position: fixed;bottom: 0;width: 100%;font-size: 0.84em;color: white;" v-if="purchasedetailList.dueDate>currentdate"> 
	<div style="background-color:rgb(244,54,54);width:60%;height:5em ;float: left;text-align: center;line-height: 5em;">
		剩余
     <span >
						
      <clocker :time="list.time" slot="value">
      <span style="background-color: white;color:red">%D</span> 天
      <span style="background-color: white;color:red;">%H</span> :
      <span style="background-color: white;color:red;">%M</span> :
      <span style="background-color: white;color:red;">%S</span>
      </clocker>
        
	</span>
                 结束
     </div>
	<div style="background-color:rgb(254,185,0);width:40%;height:5em ;float: right;text-align: center;line-height: 2.5em;">
      <div style="font-size: 1.3em;padding-top: 1%;"><span >&#65509;</span>{{purchasedetailList.promotePrice}}</div>
      <div @click="gotopay" style="font-size: 1.2em;padding-bottom: 2%;">立即抢购</div>
     </div>
	</div>
	
	
	<!--活动结束-->
	<div style="position: fixed;bottom: 0;width: 100%;font-size: 0.84em;color: white;" v-if="purchasedetailList.dueDate<currentdate"> 
	
	<div style="background-color:grey;width:100%;height:5em ;float: right;text-align: center;line-height: 5em;">
     
      <div >活动结束</div>
     </div>
	</div>

		
	<!--活动尚未开始-->
	<div style="position: fixed;bottom: 0;width: 100%;font-size: 0.84em;color: white;" v-if="purchasedetailList.startTime>currentdate"> 
	
	<div style="background-color:rgb(244,54,54);width:100%;height:5em ;float: left;text-align: center;line-height: 5em;">
		剩余
     <span >
						
      <clocker :time="list.time" slot="value">
      <span style="background-color: white;color:red">%D</span> 天
      <span style="background-color: white;color:red;">%H</span>:
      <span style="background-color: white;color:red;">%M</span>:
      <span style="background-color: white;color:red;">%S</span>
      </clocker>
        
	</span>
                 开始抢购
     </div>
	</div>
	
	
	
<!--	
	<div id="extra" v-show="extrashow">
	<div id="masker2"></div>
	
	
	
	
	<div class="extraorder" >
		<div class="extraerror" @click="cancelextra"><img src="../../../static/extraerror.png"></div>
	<div class="extrapro" ><img src="../../../static/extrapro.jpg" ></div>
		<div style="float: right;margin:5%;margin-right:13%;font-size: 0.9em;">
			<div>adidas高尔夫球服 优雅透气 <br />舒适春夏</div>
			<div style="color: red;"><span style="font-size: 0.8em;">&#65509;</span>280</div>
		</div>
		<hr style="width: 100%;color: #ebebeb;">
		<div >
			<div>颜色：</div>
			<div style="background-color: rgb(242,73,32);border: 1px red solid;color: white;width:30%;border-radius: 0.2em;text-align: center;margin-top: 4%;margin-bottom: 4%;">白色</div>
		</div>
		<hr style="width: 100%;"/>
		<div >
			<div>尺码：</div>
			
			<div class="box">
        <checker v-model="demo11" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>
      </checker>
     
  
     

    
		</div>
		</div>
		
		<hr style="width: 100%;" />
			<div class="num" style="padding-bottom: 3%;margin-top: 3%;">
    		<flexbox :gutter="0" wrap="wrap">
    			
    			<flexbox-item><div >购买数量：</div></flexbox-item>
    			
    			
    			<flexbox-item>
    				<div style="margin-right:20%;text-align: center;">
    				<flexbox :gutter="0" wrap="wrap" class="numberadd">
    					
    					<flexbox-item><div><button type="button" @click="countdown"> — </button></div></flexbox-item>
    					<flexbox-item><div><button type="button" id="count"> 1 </button></div></flexbox-item>
							<flexbox-item><div><button type="button" @click="countup"> + </button></div></flexbox-item>
							
    				
    		
    				</flexbox>
    				</div>
    			</flexbox-item>
    		 
    		 
    		 </flexbox>
    	
    	
    		
    
    	</div>
		<hr style="width: 120%;" />
		
		<div @click="purchaseextra" style="background-color: rgb(242,73,32);border: 1px red solid;color: white;width:40%;height: 2.5em;line-height: 2.5em; border-radius: 0.2em;text-align: center;margin-top: 5%;margin-left: 25%;">立即抢购</div>
		
	</div>
 </div>-->
 		<setpaypassdialog ref="dialog"></setpaypassdialog>
		<toast v-model="isexceeding" type='text' width='9.5em' :time="800" is-show-mask :text="warmtext" position="bottom" ></toast>
	
	</div>
</template>


<script>
import { Tab,TabItem, Sticky,Clocker, Cell, Divider, XButton, Swiper, SwiperItem,Flexbox, FlexboxItem ,Checker, CheckerItem,Toast} from 'vux'
 import { mapActions } from 'vuex'
 import { ORDERMSG_SIGN } from '../../store/ordermsg'
 import { USERINFO_SIGN } from '../../store/userinfo'
 import { mapState } from 'vuex'
const list = () => ['抢购须知', '包含费用', '详情介绍']

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    Flexbox, 
    FlexboxItem,
    Clocker, 
    Cell,
    Checker, 
    CheckerItem,
    Toast,
    Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
  computed: mapState({ userinfo: state => state.userinfo }),
  
  data () {
    return {
    	msg:{name:'',promotePrice:'',marketPrice:'',image:'',userName:''},//分享信息的对象
    	showshare:false,/*分享的提示*/
    	ordermsg:{stadiumId:"",fuStadiumId:"",orderPrice:"",gameDate:"0000-00-00 00:00",productPrice:"",priceinclude:'',payWay:'',gameTime:'0000-00-00 00:00',gameNum:1,lianxiPerson:"",lianxiNum:"",note:"填写备注",address:'填写地址',orderType:"1",userId:"",orderId:'',validTime:'',color:'',size:'',spId:'',minusRedpacket:'0',redPackageDeduction:''},
    	extrashow:true,
    	purchasedetailList:{},
    	list:{
    		time:'2017-08-01'
    	},
    	items1: [{
        key: '1',
        value: 'XL'
      }, {
        key: '2',
        value: 'L'
      }, {
        key: '3',
        value: 'M'
      }],
      demo11:{
        key: '1',
        value: 'XL'
      },
      list2: list(),
      value:1,
      demo2: '美食',
      list3: ['收到的消息', '发出的消息'],
      demo3: '收到的消息',
      list4: ['正在正映', '即将上映'],
      demo4: '即将上映',
      demoDisabled: 'A',
      index: 0,
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      },
      currentdate:'',
      orderlength:0,//已购买份数
      isexceeding:false,//显示是否可以抢购产品
      hasnotpay_order:'',//未支付订单
      warmtext:'您已超过抢购限制'
    }
  },
  updated(){
  	
  	this.controlimg_style('detail','98%','10%');
  },
  mounted(){
	this.url_property('userId');
	this.purchasedetaildata();
	this.isextrashow();
	this.getNowFormatDate();
	
	
  },
  methods: {
  	share(){
			this.showshare=true;
		},
  	purchasedetaildata(){
			    	var _this = this;
			    var id=this.$route.params.id;
			    
			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/goods/getSpecDetail?id='+id,
             url:'/restapi/pdm/goods/getSpecDetail?id='+id+'&userId='+this.userinfo.userId,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
           _this.hasnotpay_order=data.data.orderId;
           if(data.data.orderId){
 	  		_this.$refs.dialog.showdialog=true;
			_this.$refs.dialog.title='您尚有该抢购订单未支付！'
			_this.$refs.dialog.path='/qcydorderrewrite/'+this.hasnotpay_order;
			_this.$refs.dialog.handlename='前往支付';
           }
            if(_this.userinfo.userId==undefined){
           	
           	_this.userLogin(_this.userinfo,_this.USERINFO_SIGN);
           }
       		var detail=document.getElementById('detail');
            var robKnown=document.getElementById('robKnown');
            var feeInclude=document.getElementById('feeInclude');
             robKnown.innerHTML=data.data.tbPdmGoodsSpec.robKnown;
             feeInclude.innerHTML=data.data.tbPdmGoodsSpec.feeInclude;
            detail.innerHTML=data.data.tbPdmGoodsSpec.detailIntroduction;
            _this.orderlength=data.data.orderLength;//已购买分数
            var purchasedetailList = data.data.tbPdmGoodsSpec;//特惠产品详情信息数组
            _this.purchasedetailList=purchasedetailList;
            _this.writetitle(_this.purchasedetailList,1,'特惠','spName');
           _this.list.time= _this.purchasedetailList.dueDate;
           _this.ordermsg.spId=id;
           _this.msg.name=_this.purchasedetailList.spName;
          _this.msg.marketPrice=_this.purchasedetailList.marketPrice;
           _this.msg.promotePrice=_this.purchasedetailList.promotePrice;
           _this.msg.image=_this.userinfo.headimgurl;
           _this.msg.userName=_this.userinfo.lianxiPerson;
           
           _this.msg.url=_this.getNewUrl('userId',_this.userinfo.userId);
           if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
		   var myurl= window.sessionStorage.url.split('#')[0];
		  
		   } else {
		   var myurl = window.location.href.split('#')[0];
		   
		   }
 
		

       	_this.sharetowx(myurl,_this.msg,0);
			      
       
			      
        },function(error){
          alert("error");
        });
    
    },
    getNewUrl(name,value){
    	var url='http://progolf.uerbx.com'+this.$route.path ;
		var newUrl="";
		var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
		var tmp = name + "=" + value;
       if(url.indexOf("?")!=-1){
      
		
		 newUrl= url.replace(eval(reg),tmp);
		 console.log(newUrl);
			return newUrl;
       }
       if(url.indexOf("?")==-1){
       	 newUrl= url+"?"+tmp;
       	 console.log(newUrl);
       	 return newUrl;
       }
    },
    isextrashow(){
    	if(window.name!='purchasedetail'){
    		this.extrashow=true;
    		window.name='purchasedetail';
    	}
    	else this.extrashow=false;
    	
    	
    },
  	countup(){
    	
    	var count=document.getElementById("count");
    	var value=parseInt(count.innerHTML);
    	
     value=value+1;
     
    	count.innerHTML=value;
    	this.value=value;
    	
    },
     countdown(){
    	var count=document.getElementById("count");
    	var value=parseInt(count.innerHTML);
    	if(value!=0){
    		 value=value-1;
     
    	count.innerHTML=value;
    	this.value=value;
    	}
    
    	
    },
    onItemClick (index) {
      console.log('on item click:', index)
    },
    addTab () {
      if (this.list2.length < 5) {
        this.list2 = list().slice(0, this.list2.length + 1)
      }
    },
    removeTab () {
      if (this.list2.length > 1) {
        this.list2 = list().slice(0, this.list2.length - 1)
      }
    },
    next () {
      if (this.index === this.list2.length - 1) {
        this.index = 0
      } else {
        ++this.index
      }
    },
    prev () {
      if (this.index === 0) {
        this.index = this.list2.length - 1
      } else {
        --this.index
      }
    },
    ...mapActions([ORDERMSG_SIGN]),
     ...mapActions([USERINFO_SIGN]),
    gotopay(){
    	if(typeof(this.hasnotpay_order)=='undefined'){
    	if(this.orderlength<2){
    		this.ordermsg.stadiumId=this.purchasedetailList.spName;
		this.ordermsg.fuStadiumId="";
		this.ordermsg.productPrice=this.purchasedetailList.promotePrice;
		this.ordermsg.gameDate=this.purchasedetailList.useTime;
		this.ordermsg.gameTime=this.purchasedetailList.useTime;
		this.ordermsg.priceinclude="果，僮，柜，车";
		this.ordermsg.payWay=0;
		this.ordermsg.userId=this.userinfo.userId;
		this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
		this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
		this.ordermsg.validTime=this.purchasedetailList.useTime;
		this.ordermsg.redPackageDeduction=this.purchasedetailList.redPackageDeduction;
		this.ORDERMSG_SIGN(this.ordermsg);
		
    	this.$router.push('/home/purchasepaypage')
    	}
    	if(this.orderlength>=2){
    		this.isexceeding=true;
    	}
    	}
    	else{
    		
    		this.warmtext='您有订单未处理';
    		this.isexceeding=true;

    	}
    },
    
    cancelextra(){
    	var extra=document.getElementById("extra");
    	extra.style.display="none";
    },
    purchaseextra(){
    	
    	var extra=document.getElementById("extra");
//  	alert("搶購成功"+this.value+this.demo11.value);
    	
    	this.ordermsg.stadiumId='adidas高尔夫球服';
		this.ordermsg.fuStadiumId="";
		this.ordermsg.productPrice=280;
		this.ordermsg.size=this.demo11.value;
		this.ordermsg.gameNum=this.value;
		this.ordermsg.color="白色";
		this.ordermsg.payWay=0;
		this.ordermsg.userId=this.userinfo.userId;
		this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
		this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
		this.ordermsg.validTime=this.purchasedetailList.useTime;
		this.ORDERMSG_SIGN(this.ordermsg);
		extra.style.display="none";
		this.$router.push('/home/purchasepaypage')
    },
//  isloadingextra(){
//  	if(!window.name){
//  		var extra=document.getElementById("extra");
//  		extra.style.display="block";
//  		window.name="purchasrdetail"
//  	}
//  }
    getNowFormatDate() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    this.currentdate = currentdate;
		 
		}
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/center.less';
.purchasedetail{
		/*position: relative;*/
		width: 100%;
		height: 100%;
		background-color: white;
		overflow-x: hidden;
		
		
		
	}

.tab-swiper {
  background-color: #fff;
 padding-top: 2%;
 padding-left: 4%;
 padding-right: 2%;
  overflow: hidden;
}
.purchaseswiper{
	height: 300px;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;	
}
#extra{
	
}
.extraorder{
	position: fixed;
	width: 100%;
	height:auto;
	background-color:white ;
	bottom: 0;
	z-index:9999;
	padding-left: 5%;
	padding-bottom: 5%;
	/*overflow-y: scroll;
	overflow-x: hidden;*/
	
}
.extraerror{
	position: absolute;
	z-index:99999;
	top:1%;
	right: 6%;
	
}
.extrapro{
	position: absolute;
	z-index:99999;
	top:-4%;
	left: 2%;
	
	width: 25%;
	height: 6.1em;
	border-style: solid ;
	border-color: #ebebeb;
	border-radius: 0.2em;
	
	
	
}
.extrapro img{
	width:100%;
	height: 6em;
}
#masker2{
	position: fixed;
	width: 100%;
	height:100%;
	background-color:black ;
		top:0;
		opacity:0.7;
		z-index:999;
		overflow: hidden;
		/*display: none;*/
}
.box {
  margin-right: 20%;
  padding-bottom: 5%;
  padding-top: 3%;
}
.demo1-item {
  border: 1px solid #ebebeb;
  background-color: #ebebeb;
  padding: 5px 15px;
  margin-right:5% ;
  width: 15%;
  height: 1em;
  text-align: center;
  line-height: 1em;
  border-radius: 0.3em;
}
.demo1-item-selected {
  background-color:rgb(242,73,32) ;
}
.numberadd button{
	width: 80%;
	height: 2em;
	background-color: white;
	outline: none;
	border:1px #ebebeb solid;
	border-radius: 0.2em ;
	
}
</style>
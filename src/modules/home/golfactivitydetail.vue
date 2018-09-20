<template>
	<div class="golfactivitydetail">
		
		<div>
			<img :src="golfdetaillist.image" style="width:100% ;height: 10em;" v-if="golfdetaillist.image!=''&&golfdetaillist.image!=null">
			<!--<img src="http://sc.jb51.net/uploads/allimg/140628/10-14062PAGB04.jpg" style="width:100% ;height: 10em;" v-if="golfdetaillist.image==''||golfdetaillist.image==null">-->

		</div>
	
	
	<flexbox orient="vertical" :gutter="0">
			
			
			<flexbox-item>
				<div style="border-bottom: 1px gainsboro solid;">
				
				<flexbox orient="vertical" :gutter="0" style="padding-left:2.5%;">
					
					<flexbox-item >
						<flexbox :gutter="0" wrap="wrap" >
							<flexbox-item :span="3/5"><div style="font-size: 1.1em;" class="fontstyle" id='matchName'></div></flexbox-item>
							<!--<flexbox-item :span="2/5"><div style="float: right;margin-right:15%;text-align:center;color:#2baaed" @click='share'>分享<img src="../../../static/share.png" style="vertical-align: middle;width: 30%;"></div></flexbox-item>-->
						</flexbox>
					</flexbox-item>
					
					
					
					<flexbox-item style="font-size: 0.8em;">
					<flexbox :gutter="0" wrap="wrap" >
							<flexbox-item :span="2/3"><div style="color:gray;">{{golfdetaillist.matchInfo}}</div></flexbox-item>
							<flexbox-item :span="1/3"><div style="color: red;font-size: 1.5em;float: right;margin-right: 20%;"><span style="font-size: 0.8em;">&#65509;</span>{{golfdetaillist.price}}<span style="font-size: 0.5em;color:black;">/位</span></div></flexbox-item>
						</flexbox>	
						
					</flexbox-item>
					
					
					
				
				
				</flexbox>
				</div>
			</flexbox-item>
			
			
			
			
			<flexbox-item style="font-size: 0.9em;padding: 3%;">
			<div style="padding-left: 2%;" v-if="golfdetaillist.limitNum&&golfdetaillist.applyNumbe&&golfdetaillist.limitNum==golfdetaillist.applyNumber"><img src="../../../static/alreadyfull.png" style="width: 30%;height: 2.5em;"></div>	
			<div style="color:black;padding-left: 3%;font-size: 1.1em;" v-if="golfdetaillist.limitNum!=golfdetaillist.applyNumber">已报名：<span style="color: #2baaed;">{{groupnum}}组</span> <progress :value="golfdetaillist.applyNumber" :max="golfdetaillist.limitNum" ></progress></div>
			
			</flexbox-item>
			
			
			
			
			<flexbox-item  style='margin-top: -1%;'>
				
				<div style="height: 100px;width: 100%;overflow-y: auto;overflow-x: hidden;-webkit-overflow-scrolling: touch;">
					
					
					
				
				<!--当前已有人报名的情况-->
				<div v-if='golfheadlist.length!=0'>
				
					<!--只显示两组已报名人数,但报名人数有多组的情况-->
				<div v-if='golfheadlist.length>1'>
				
				<div v-show="showtwohead" >
				<flexbox :gutter="0" wrap="wrap" style="padding-left: 4%;padding-top: 4%;margin-bottom: 1%;" v-for="(item,index) in 2"  >
			
				
				<flexbox-item ><span style="color:#2baaed ;">第{{item}}组：</span></flexbox-item >
					<flexbox-item style='margin-left: -65%;'>
						
							
					<span v-for="i in golfheadlist" v-if="i.groupId==item">
						
							<span v-for="j in i.list">
							<span ><img :src="j.userImg" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right:3.5%;"></span>
							</span>
							
							
							<span  v-for="k in 4-i.list.length" @click='sendid(item)' v-if='code==002'>
								   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
								</span>
							<span  v-for="k in 4-i.list.length" v-if='code==001' @click="showmsg(1)">
							   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
							</span>
							<span  v-for="k in 4-i.list.length" @click='showmsg(2)' v-if='code==003'>
								   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
								</span>
								
					</span>

					
					
			
					
					
						
					</flexbox-item >
			   </flexbox >
				</div>
				</div>	
				
				
				
				
				
				
				<!--显示所有组-->
				<div v-show="showallhead" >
					
					
						
					<!--显示已有报名人的组-->
				<flexbox :gutter="0" wrap="wrap" style="padding-left: 4%;margin-top: 2%;" v-for="(item,index) in golfheadlist.length" >
			
				
				<flexbox-item ><span style="color:#2baaed ;">第{{item}}组：</span></flexbox-item >
				<flexbox-item style='margin-left: -65%;'>
						
					<span v-for="i in golfheadlist"  v-if="i.groupId==item">
						
							<span v-for="j in i.list">
							<span ><img :src="j.userImg" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right:3.5%;"></span>
							</span>
							
							
							<span  v-for="k in 4-i.list.length" @click='sendid(item)' v-if='code==002&&i.list!=undefined'>
								   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
								</span>
					<span  v-for="k in 4-i.list.length" v-if='code==001&&i.list!=undefined' @click="showmsg(1)">
					   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
					</span>	
					
					<span  v-for="k in 4-i.list.length" v-if='code==003&&i.list!=undefined' @click="showmsg(2)">
					   <span ><img src="../../../static/joinhere.png" style="width:11%;border-radius: 2em; height:2em;vertical-align: middle;margin-left: 8%;margin-right: 4%;"></span>
					</span>	
					</span>
					
					
					
						
						
							
					</flexbox-item >
			
			</flexbox >
			
			
			</div>
			
				</div>
				</div>
			</flexbox-item>
			
			
			
			<flexbox-item><div style="text-align: center;margin-top: 1%;" @click="loadingmoreteam(0)" v-show='showdown'><img src="../../../static/down1.png" style="width: 4%;"></div></flexbox-item>
			<flexbox-item><div style="text-align: center;margin-top: 1%;" @click="loadingmoreteam(1)" v-show='showup'><img src="../../../static/up.png"></div></flexbox-item>
			
			
	
	</flexbox>
	<div style="height: 0.5em;background-color: #ebebeb;"></div>
	
	
	
	<div >
       <tab :line-width=2 active-color='#2baaed' bar-active-color="red" v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="350px" :show-dots="false">
        <swiper-item  key="0">
          <div class="tab-swiper "> <div class="golfactivityswiper" id='matchProcess'></div></div>
        </swiper-item>
        <swiper-item key="1">
          <div class="tab-swiper "><div class="golfactivityswiper" id='priceInclude'></div></div>
        </swiper-item>
        <swiper-item key="2">
          <div class="tab-swiper " ><div class="golfactivityswiper" id='detail'></div></div>
        </swiper-item>
      </swiper>
    </div>
    
    
   
	
	<div style="position: fixed;bottom: 0;width: 100%;color: white;"> 
	
	<div style="background-color:#2baaed;font-size: 1.2em; width:100%;height:2.8em ;float: right;text-align: center;line-height: 2.8em;">
      <div v-if='code==003' @click="showmsg(2)">立即报名</div>
      <div v-if='code==002' @click="gotopay">立即报名</div>
      <div v-if='code==001' @click="showmsg(0)">您已报名</div>
     </div>
	</div>
	
	
	
	<setpaypassdialog ref="dialog"></setpaypassdialog>
	<toast v-model="showshare" type='text' width='9.0em' :time="800" is-show-mask text="请使用微信分享" position="top" ></toast>
	<toast v-model="showValue" type='text' width='9.0em' :time="800" is-show-mask text="您已包场" position="bottom"></toast>	
	<toast v-model="showValue1" type='text' width='9.0em' :time="800" is-show-mask text="您已包场" position="top"></toast>
	<toast v-model="showValue2" type='text' width='9.0em' :time="800" is-show-mask text="您有未支付订单" position="top"></toast>	
	
	</div>
</template>


<script>
import { XProgress,Tab,TabItem,Cell, Swiper, SwiperItem,Flexbox, FlexboxItem ,Toast} from 'vux'
const list = () => ['赛事流程', '包含费用', '详情介绍']
 import { mapActions } from 'vuex'
 import { ORDERMSG_SIGN } from '../../store/ordermsg'
 import { mapState } from 'vuex'
export default {
	
  components: {
    Tab,
    TabItem,
   Toast,
    Swiper,
    SwiperItem,
    Flexbox, 
    FlexboxItem,
     Cell,
    
    XProgress,
    Setpaypassdialog:resolve => {require(['./setpaypassdialog.vue'], resolve)}
  },
  data () {
    return {
    	msg:{},//分享信息的对象
    	showshare:false,/*分享的提示*/
    	ordermsg:{matchDate:'',stadiumId:"",fuStadiumId:"",orderPrice:"",gameDate:"",productPrice:"",priceinclude:'',payWay:'0',gameTime:'',gameNum:"1",lianxiPerson:"",lianxiNum:"",note:"填写备注",address:'填写地址',orderType:"2",userId:"",orderId:'',validTime:'',groupId:'',activityId:'',minusRedpacket:'0'},
    	showtwohead:true,/*显示两组报名人数*/
    	showallhead:false,/*显示所有报名人数*/
    	code:'',/*用于判断该用户是否已经报名该赛事*/
      golfdetaillist:{},/*获取当前赛事信息*/
      golfheadlist:[],/*获取当前头像列表*/
     showdown:true,/*是否向上显示箭头*/
    showup:false,/*是否向下显示箭头*/
     groupnum:'',/*已报名组数*/
      list2: list(),
      showValue:false,
      showValue1:false,
      showValue2:false,
      applynumber:'',
      demo2: '美食',
      list3: ['收到的消息', '发出的消息'],
      demo3: '收到的消息',
      list4: ['正在正映', '即将上映'],
      demo4: '即将上映',
      demoDisabled: 'A',
      index: 0,
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      }
    }
  },
   computed: mapState({ userinfo: state => state.userinfo }),
  mounted(){
//	this.isloadingextra();
    this.golfdetaildata();
  },
   updated(){
  	
  	this.controlimg_style('detail','98%','10%');
  },
  methods: {
  	share(){
			this.showshare=true;
		},
  	showmsg(i){
  		if(i==0){this.showValue=true;}
     	
     	if(i==1){this.showValue1=true;}
     	if(i==2){this.showValue2=true;}
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
    sendid(item){
    	 	this.ordermsg.stadiumId=this.golfdetaillist.matchName;
		
		this.ordermsg.productPrice=this.golfdetaillist.price;
		this.ordermsg.matchDate=this.golfdetaillist.matchDate;
		
	
		
		this.ordermsg.userId=this.userinfo.userId;
		this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
		this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
		
		
		this.ordermsg.activityId=this.$route.params.id;
		this.ordermsg.groupId=item;
		this.ORDERMSG_SIGN(this.ordermsg);
    	
    	
    	this.$router.push('/home/golfpaypage')
    },
     ...mapActions([ORDERMSG_SIGN]),
    gotopay(){
    	this.ordermsg.stadiumId=this.golfdetaillist.matchName;
		
		this.ordermsg.productPrice=this.golfdetaillist.price;
		this.ordermsg.matchDate=this.golfdetaillist.matchDate;
		this.ordermsg.activityId=this.$route.params.id;
	
		
		this.ordermsg.userId=this.userinfo.userId;
		this.ordermsg.lianxiNum=this.userinfo.lianxiNum;
		this.ordermsg.lianxiPerson=this.userinfo.lianxiPerson;
		
		
		
		
		if(this.golfdetaillist.applyNumber/4<1){
			this.ordermsg.groupId=1;
		}
		if(this.golfdetaillist.applyNumber/4>1){
			this.ordermsg.groupId=this.golfdetaillist.applyNumber/4+1;
		}
		this.ORDERMSG_SIGN(this.ordermsg);
    	this.$router.push('/home/golfpaypage')
    },
    
   
    loadingmoreteam(id){
    	if(id==0){
    		this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 1000)
    	
    	this.showallhead=true;
    	this.showtwohead=false;
    	this.showdown=false;
    	this.showup=true;
    	}
    	if(id==1){
    		this.showallhead=false;
    	this.showtwohead=true;
    	this.showdown=true;
    	this.showup=false;
    	}
    	
//  	this.showmore=false;
    },
   golfdetaildata(){
			    	var _this = this;
			    var id=this.$route.params.id;
			    
			      this.$http({
            method:'GET',
             url:'/restapi/match/matchdate/getDetail?id='+id+'&userId='+this.userinfo.userId,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
           var detail=document.getElementById('detail');
           var matchProcess=document.getElementById('matchProcess');
           var priceInclude=document.getElementById('priceInclude');
            
           detail.innerHTML=data.data.matchData.matchDetails;
		   matchProcess.innerHTML=data.data.matchData.matchProcess;
		   priceInclude.innerHTML=data.data.matchData.priceInclude;
		   
            var golfdetaillist = data.data.matchData;
            _this.golfdetaillist=golfdetaillist;
            _this.writetitle(_this.golfdetaillist,1,'赛事','matchName');
          var listfirst=data.data.list;
          var listfinal=data.data.nullList;
         _this.groupnum=data.data.list.length;
          
           
			_this.code=data.data.code;
			if(data.data.code=='003'){
			_this.$refs.dialog.showdialog=true;
				_this.$refs.dialog.title='您尚有该赛事订单未支付！'
				_this.$refs.dialog.path='/qcydorderrewrite/'+data.data.orderId;
				_this.$refs.dialog.handlename='前往支付';
				
			}
			for(var i=0;i<listfirst.length;i++){
				for(var j=0;j<listfinal.length;j++){
				if(listfirst[i].groupId==listfinal[j].groupId)
				{
				listfinal[j].list.push.apply(listfinal[j].list,listfirst[i].list);
				console.log(listfinal[j].list);
				}
			}
			}
			_this.golfheadlist=listfinal;
			
		_this.msg.name=_this.golfdetaillist.matchName;
          _this.msg.shopDesc=_this.golfdetaillist.matchInfo;
            _this.msg.userName=_this.userinfo.lianxiPerson;
           _this.msg.image=_this.golfdetaillist.image;
           
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
.fontstyle{
	
    	
     color:black;
    width:160%;
    
    
		}
.golfactivitydetail{
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
  padding-top:4%;
  padding-left: 3%;
  padding-right: 2%;
  overflow: hidden;
 /*overflow-y: auto;
 overflow-x: visible;*/
  
  
}
.golfactivityswiper{
	height: 280px;overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

progress {
    width: 40%;
    height: 0.6em;
    border: 1px solid #ebebeb;  
    border-radius:5px ;
    background-color:#ebebeb;
    color:#ebebeb; /*IE10*/
   vertical-align: middle;
}

progress::-moz-progress-bar { background: #0064B4;border-radius: 5px; }
progress::-webkit-progress-bar { background: #ebebeb;border-radius: 5px; }
progress::-webkit-progress-value  { background: #2baaed; border-radius: 5px;}
</style>
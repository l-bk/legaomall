<template>
	<div class="hotpurchase-nav" id='hotpurchase_nav'>
		<div class="hotpurchase-img">
			<swiper loop :list="baselist" auto style="width:100%;margin:0 auto;" height="9em" dots-class="custom-bottom" dots-position="center"></swiper>
		</div>
		
		<!--限时抢购-->
		<div >
		<div v-for="(item,index) in limitList" @click="gotopurchasedetail(item)">
		<!--<flexbox orient="vertical" :gutter="0"  class="hotpurchase-box"  v-if="currentdate<=item.startTime">-->
		<flexbox orient="vertical" :gutter="0"  class="hotpurchase-box"  >
	
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item >
						<div  ><img src="../../../static/hotpurchasetitle.png" style="width: 20%;height: 100%;padding-left: 1%;"></div>
					</flexbox-item>
					
					
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<div class="flex-hotpurchase" v-if="item.image!=null"><img :src="item.image"></div>				
                 <div class="flex-hotpurchase" v-if="item.image==null"><img src="../../../static/purchasepic.png"></div>
			
			</flexbox-item>
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap" style="text-align: left;">
				<flexbox-item ><div style="padding-left:4% ;" :id="index"></div></flexbox-item>
				<!--<flexbox-item :span="1/4"></flexbox-item>-->
				</flexbox>
			</flexbox-item>
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="4/5" >
						
					<div style="font-size: 0.9em;margin-left: 5%;color: red;">
					<span><img src="../../../static/alarmClock.png" style="width: 8%;vertical-align: middle;">&nbsp;剩余时间：</span>
					<span class="clock">
						
					          <clocker :time="item.dueDate" slot="value">
					          <span >&nbsp;%D </span> 天
					          <span >&nbsp;%H </span>时
					          <span >&nbsp;%M </span>分
					          <span >&nbsp;%S </span> 秒
					          </clocker>
                        
					</span>
									
                 	</div>
								
						
					</flexbox-item>
					
					<flexbox-item :span="1/5" >
						<div class="hotpurchase-price"><span style="font-size: 0.8em;">&#65509;</span>{{item.promotePrice}}</div>
						
					</flexbox-item>
					
					
				</flexbox>
			</flexbox-item>
			<flexbox-item>
					
					<div style="padding-left:5% ;color: red;font-size: 0.8em;">还剩{{item.goodsNumber-item.sale}}份</div>
					
					<div  style="margin-left:75%; border: 1px red solid;color: red;border-radius: 0.5em;text-align: center;width:20%;font-size: 0.8em;" v-if="currentdate<item.dueDate">立即抢购</div>
					<div  style="margin-left:75%; border: 1px gray solid;color: gray;border-radius: 0.5em;text-align: center;width:20%;font-size: 0.8em;" v-if="currentdate>item.dueDate">活动结束</div>
					
					
					</flexbox-item>
					
		</flexbox>
		</div>
<load-more :show-loading="true" background-color="#fbf9fe" v-if='isshow==true' style='margin-top:-0.3%;padding-bottom: 10%;'></load-more>
</div>

<div v-if="reach_bottom==true" style="padding-bottom: 18%;text-align: center;background-color: #ebebeb;color: gray;"><divider>亲！到底了~</divider></div>		
<div v-if="listlength==1" class="hotpur_none">
	<p>暂无抢购信息~</p>
</div>			
		
		
		
		
		
	
		
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { USERINFO_SIGN } from '../../store/userinfo'
	import { mapState } from 'vuex'
	import {Flexbox, FlexboxItem,Clocker, Cell,Swiper,Divider,LoadMore } from 'vux'
	export default{
		data(){
			return{
				limitList:[],
				currentdate:'',
				baselist:[],
				listlength:'',
				page:1,
			    isshow:false,
			    nomorelist:false,
			    reach_bottom:false,
			}
		},
	components:{Flexbox, FlexboxItem,Clocker, Cell,Swiper,Divider,LoadMore },
	mounted(){
		this.limitimg();
		this.limitlist();
		this.getNowFormatDate();
		window.addEventListener('scroll',this.isbottom,true);
		
	},
	 computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	
  },
	updated(){
		this.writetitle(this.limitList,0,'特惠');
	},
		methods:{
			...mapActions([USERINFO_SIGN]),
			isbottom(){
					if(this.$route.name=='特惠抢购'){
			  		var scrollTop=document.getElementById('hotpurchase_nav').scrollTop;
			  		var offsetHeight=document.getElementById('hotpurchase_nav').offsetHeight;
			  		var scrollHeight=document.getElementById('hotpurchase_nav').scrollHeight;
					console.log(scrollHeight-scrollTop-offsetHeight);
					if(((scrollHeight-scrollTop-offsetHeight)==5||(scrollHeight-scrollTop-offsetHeight)<5)&&this.nomorelist==false){
						this.isshow=true;
						this.page=this.page+1;
						this.limitlist();
					}
					
		}
  	},
			gotopurchasedetail(item){
				
				
				this.$router.push('/home/purchasedetail/'+item.spId)
			},
	limitlist(){
		var _this = this;
			    

			      this.$http({
            method:'GET',

            url:'/restapi/pdm/goods/closeSpecList?page='+this.page
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
         	  if(_this.userinfo.userId==undefined){
           	
           	_this.userLogin(_this.userinfo,_this.USERINFO_SIGN);
           }
            var  limitList = data.data.closeSpecList;
            if(limitList.length==0){
            	
            	_this.nomorelist=true;
            	_this.reach_bottom=true;
            }
            _this.isshow=false;
            _this.limitList.push.apply(_this.limitList,limitList);
            
           
         if(_this.limitList.length==0){
            	_this.listlength=1;
            }
            
			

			      
        },function(error){
          alert("error");
        });
    
	},
			//特惠列表录播图接口
  	limitimg(){
			    	var _this = this;
			    

			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/goods/closeSpecList',
            url:'/restapi/pdm/goods/closeSpecList?page=1'
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
          	
            var piclist=data.data.img;
            for(var i=0;i<piclist.length;i++){
            	var obj=new Object();
		            	
            	obj.img=piclist[i];
            	
            	_this.baselist.push(obj);
            	
            }
			

			      
        },function(error){
          alert("error");
        });
    
    },
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
		},
	
	}
</script>


	<style lang="less">
@import '~vux/src/styles/1px.less';
.hotpurchase-nav{
	background-color: #ebebeb;
	height: 100%;
	width: 100%;
	 position: absolute;
  overflow-y:auto;
 
 -webkit-overflow-scrolling: touch;
}
.hotpurchase-box{
	margin-top:0.4em ;
	/*padding-top: 3em;*/
	padding-bottom: 8px;
	background-color: white;
}
.flex-hotpurchase{
  text-align: center;
  color: black;
 /*background-clip: padding-box;*/
 vertical-align: middle;
 
}
.flex-hotpurchase img{
	width:95%;
	height:150px;
	border-radius:5px ;
}
/*.flex-active0 img{
	vertical-align: middle;
	text-align: center;
}*/

.clock span{
	background-color: red;
	border-radius: 3px;
	color: white;
	text-align: center;
}
.hotpurchase-price{
	color:red;
	text-align: center;
	font-size: 1.1em;
	padding-right: 8%;
}
.hotpur_none{
	width: 100%;
	height: 100%;
	text-align: center;
	
	background: url('http://120.24.249.13:38080/userfiles/blocknone.png') no-repeat center;
	background-color: white;
}
.hotpur_none p{
	padding-top: 120%;
	color: gainsboro;
	padding-left: 10%;
}

</style>
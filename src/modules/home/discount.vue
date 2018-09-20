<template>
<div class="hotpurchase">
			<div v-show='showdiscount'>
			<div style="padding: 2%;">
			<button-tab v-model="tab">
				<button-tab-item @on-item-click="gotobooking()">球场预订</button-tab-item>
				<button-tab-item @on-item-click="gotodiscount()">特惠时段</button-tab-item>
				
			</button-tab>
			</div>
			
			<div style="border-top: 0.3px gainsboro solid;border-bottom: 0.3px gainsboro solid;">
				<flexbox :gutter="0" wrap="wrap" class="filter" >
					<flexbox-item :span="1/5" style="border-right:1px solid gainsboro;line-height: 1em;font-size: 1em;padding-left: 1%;text-align: center;color: #2baaed;" ><div @click='gotomap'>{{cityname}}&nbsp;&nbsp;<img src="../../../static/towardstheright.png" style="vertical-align: middle;width: 8%; "></div></flexbox-item>
					<flexbox-item :span="2/7" ><div id="hotype" @click="courtfilter(3)" style="border-right:1px solid gainsboro;line-height: 1em;font-size: 1em;text-align: center;color: #2baaed;"><span>特惠类型</span>&nbsp;&nbsp;<img src="../../../static/down2.png" style="vertical-align: middle;width: 10%; "></div></flexbox-item>
					<flexbox-item :span="2/7" >
						
						
			     
			      <div style="" id="datechoice" @click="courtfilter(4)" style="border-right:1px solid gainsboro;line-height: 1em;font-size: 1em;text-align: center;color: #2baaed;"><span>选择星期</span>&nbsp;&nbsp;<img src="../../../static/down1.png" style="vertical-align: middle;width:10%;  "></div>
			    

				
					</flexbox-item>
					<flexbox-item :span="1/5"><div @click="courtfilter(5)" id="courttype" style="font-size: 1em;text-align: center;line-height: 1em;margin-left: 10%;">&nbsp;<span>筛选</span>&nbsp;<img src="../../../static/down1.png" style="vertical-align: middle; text-align: center;width:15%;"></div></flexbox-item>
				</flexbox>
				</div>
			
			
			
				<div style="overflow-y: auto;height:78%;width:100%;overflow-x: hidden;position: absolute;background-color: white;-webkit-overflow-scrolling: touch;" id='discount_nav'>
		
		
		<flexbox orient="vertical" :gutter="0" >
			<flexbox-item >
			 <flexbox orient="vertical" :gutter="0" style="padding: 1%;margin-bottom:0%;border-bottom: 1px solid gainsboro;" v-for="item in discountlist"> <!--border-bottom: 8px #EBEBEB solid;-->
					 
					 
					 <flexbox-item  style="">
					 	
					 	
			    <div style="padding:3%;margin-bottom:1%;border-bottom: 1px gainsboro solid;">
							<flexbox :gutter="0" wrap="wrap">
								<flexbox-item  >
									<flexbox :gutter="0" wrap="wrap">
									<flexbox-item  ><div style="font-size: 1.1em;line-height: 1.1em;margin-left: 1%;margin-top: -10%;" class="fontstyle"><br />{{item.shopName}}</div></flexbox-item  >
			                        <flexbox-item  ><div style="margin-right: -5%;float: right;color: gray;font-size: 0.9em;"><img src="../../../static/location2.png" style="vertical-align: middle;width: 13%;margin-top: -3%;">距离您{{parseInt(item.distance)}}公里</div>	</flexbox-item  >					
								   </flexbox>
								</flexbox-item>
						
					
					        </flexbox>
			    </div>
					</flexbox-item>
					
					 
					 
					 <flexbox-item style="padding:3%;padding-left: 10%;">
					 	<div  @click="gotocourtdetail(item)" v-for="it in item.tbPdmShopSpecs">
					 		
						<flexbox :gutter="0" wrap="wrap" style="">
							<flexbox-item  ><div style="width:60%;height: 7em;"><img :src="item.shopImg" style="width:100%;height:6em;border-radius: 0.5em;"></div></flexbox-item>
							<flexbox-item   style="margin-top: -2%;">
								<div style="margin-top: -3%;font-size: 0.95em;margin-left: -35%;">
								<div style="margin-bottom: 0%;">{{it.spName}}</div>
								<div style="margin-bottom: 6%;color: gray;">优惠时段：{{it.specdata}}</div>
								<div style="margin-bottom: 1%;">
									<div style="text-align: center;width:30%;float: left;border-radius: 0.5em;border: 1px gray solid;color:gray ;" v-if="it.payment==1">球场现付</div>
									<div style="text-align: center;width:30%;float: left;border-radius: 0.5em;border: 1px #2baaed solid;color:#2baaed ;" v-if="it.payment==0">在线预付</div>
								<div style="color: red;float: right;margin-right: 15%;font-size: 1.3em;"><span style="font-size: 0.8em;">&#65509;</span>{{it.promotePrice}}</div>
								</div>
								</div>
							</flexbox-item>
						</flexbox>
						</div>
						
					</flexbox-item>
					
					 
					
					
				</flexbox>
				<!--<div style="background-color: #ebebeb;width: 100%;height: 1em;"></div>-->
			</flexbox-item>
			
			
		</flexbox>
		<load-more :show-loading="true" background-color="#fbf9fe" v-if='isshow==true'></load-more>
		<div v-if="listlength==1" class="discount_none">
				<p>暂无球场特惠时段信息~</p>
			</div>		
					
			
			</div>
		
			 

		
		</div>
		<courtfilter ref='showfilter' v-on:child-say="showfilter"></courtfilter>
		<Mapping ref='showmap' v-on:fun="showmap"></Mapping>
</div>
	
</template>

<script>

import { Datetime, XDialog,Flexbox, FlexboxItem,ButtonTab, ButtonTabItem,Divider,LoadMore} from 'vux'

export default {
	  

  components: {
    Flexbox, 

     XDialog,
    FlexboxItem,
    ButtonTab, 
    ButtonTabItem,
    Divider,
    LoadMore,
    
     Courtfilter:resolve => {require(['./courtfilter.vue'], resolve)},
     Mapping:resolve =>{require(['./map.vue'], resolve)}
  },
  mounted(){
  	this.discountdatadefault();
  	window.addEventListener('scroll',this.isbottom,true);
  	this.getlocation();
  	
  },
  data(){
  	return{
  		 tab:1,
		 discountlist:[],
		 showdate:false,
		 limitHourValue: '',
		 datetime:'',
		 listlength:"",
		 page:1,
		 isshow:false,
		 nomorelist:false,
		 showdiscount:true,
		 cityname:'',
  	}
  },

  methods:{
  	gotomap(){
  		
    	this.$refs.showmap.isshow=true;
    	this.showdiscount=false;
    	this.$emit('fun',false);
    	
    	},
		showmap(fun){
			
			this.cityname=fun;
			this.showdiscount=true;
			this.$emit('fun',true);
		},
  	
  	getlocation(){
		
		
			
			var _this=this;
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
					
					
					_this.cityname=r.address.city;
				
				
		}
		})
		
		
  	},
  	isbottom(){
  		if(this.$route.name=='特惠时段'){
  		var scrollTop=document.getElementById('discount_nav').scrollTop;
  		var offsetHeight=document.getElementById('discount_nav').offsetHeight;
  		var scrollHeight=document.getElementById('discount_nav').scrollHeight;
		console.log(scrollHeight-scrollTop-offsetHeight);
		if(((scrollHeight-scrollTop-offsetHeight)==5||(scrollHeight-scrollTop-offsetHeight)<5)&&this.nomorelist==false){
			this.isshow=true;
			this.page=this.page+1;
			this.discountdatadefault();
			
			

			
		}
		}
		
  	},
  		courtfilter(id){
  		
  		this.$refs.showfilter.showfilter=true;
  		this.$refs.showfilter.id=id;
		},
		
	showfilter(val){ /*根据courtfilter页面传回来的值请求接口*/
		this.$refs.showfilter.showfilter=false;
		var hotype=document.getElementById('hotype');
		var datechoice = document.getElementById("datechoice");
		var courttype = document.getElementById("courttype");
		
		if(val.id==3)
		{
		hotype.children[0].innerHTML=val.condition;
		hotype.children[0].style.color="#2baaed";
		datechoice.children[0].style.color="black";
		courttype.children[0].style.color="black";
		hotype.children[1].src="../../../static/down2.png";
		datechoice.children[1].src="../../../static/down1.png";
		courttype.children[1].src="../../../static/down1.png";
		}
		if(val.id==4)
		{
		datechoice.children[0].innerHTML=val.condition;
		datechoice.children[0].style.color="#2baaed";
		hotype.children[0].style.color="black";
		courttype.children[0].style.color="black";
		hotype.children[1].src="../../../static/down1.png";
		datechoice.children[1].src="../../../static/down2.png";
		courttype.children[1].src="../../../static/down1.png";
		}
		if(val.id==5)
		{
			
		courttype.children[0].innerHTML=val.condition;
		courttype.children[0].style.color="#2baaed";
		datechoice.children[0].style.color="black";
		hotype.children[0].style.color="black";
		courttype.children[1].src="../../../static/down2.png";
		datechoice.children[1].src="../../../static/down1.png";
		hotype.children[1].src="../../../static/down1.png";
		}
	},
  	discountdatadefault(){
	    var _this = this;
	    var hotype = document.getElementById("hotype");
	    var datechoice = document.getElementById("datechoice");
			  
		
		hotype.children[0].style.color="#2baaed";
		datechoice.children[0].style.color="black";
		courttype.children[0].style.color="black";
		hotype.children[1].src="../../../static/down2.png";
		datechoice.children[1].src="../../../static/down1.png";
		courttype.children[1].src="../../../static/down1.png";

			      this.$http({
            method:'GET',

            url:'/restapi/pdm/shop/getShopWithSpecList?page='+this.page,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
          

			var  discountlist = data.data.ShopWithSpecList;
            if(discountlist.length==0){
            	
            	_this.nomorelist=true;
            }
            _this.isshow=false;
            _this.discountlist.push.apply(_this.discountlist,discountlist);
            
           
         if(_this.discountlist.length==0){
            	_this.listlength=1;
            }
			      
        },function(error){
//        alert("error");
        });
    
    },
//  bookingdatachoice(){
//			    	var _this = this;
//			    
//             var hotype = document.getElementById("hotype");
//			    var datechoice = document.getElementById("datechoice");
//			     hotype.children[0].src="../../../static/down1.png"
//			  datechoice.children[1].children[0].src="../../../static/down2.png"
//			    hotype.style.color="black";
//			   datechoice.style.color="#2baaed"
//			      this.$http({
//          method:'GET',
////           url:'/restapi/pdm/shop/getBookList?sortBy=price&ad=asc',
//          url:'/restapi/pdm/shop/getShopWithSpecList?sortBy=price&ad=asc&page=1',
//          //使用定义的全局变量 用$get()获取
//         
//          
//      }).then(function(data){
//          //赋值给alllist数组,
//         
//          var discountlist = data.data.ShopWithSpecList;
//          _this.discountlist=discountlist;
//
//			      
//      },function(error){
////        alert("error");
//      });
//  
//  },
   
   
   
  	gotobooking(){
  		this.$router.push('/home/booking');
  	},
  	gotohotpurchase(){
  		this.$router.push('/home/hotpurchase');
  	},
  	
  	gotocourtdetail(item){
  		this.$router.push('/home/courtdetail/'+item.shopId);
  	},
  	
  },
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
.hotpurchase{
		width: 100%;
		height: 100%;
		background-color: white;
		margin: 0;
		padding: 0;
		font-size: 0.9em;
		
	}
	/*.discountbody{
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		height: auto;
	}*/
	.filter{
		text-align: center;
		background-color: white;
		height:2.5em;
		/*margin-top: -4%;*/
		
	}
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  
}
.fontstyle{
	 overflow: hidden; /*自动隐藏文字*/
     text-overflow: ellipsis;/*文字隐藏后添加省略号*/
     white-space: nowrap;/*强制不换行*/
    	
     color:black;
    width:110%;
    
		}
	.discount_none{
	width: 100%;
	height: 100%;
	text-align: center;
	
	background: url('http://120.24.249.13:38080/userfiles/blocknone.png') no-repeat  50% 20%;
	background-color: white;
}
.discount_none p{
	padding-top: 80%;
	color: gainsboro;
	padding-left: 10%;
}
</style>
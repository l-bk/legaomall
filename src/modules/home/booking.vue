<template>
<div class="booking">
	    <div v-show='showbooking'>
			<div style="padding: 2%;">
			<button-tab v-model="tab">
				<button-tab-item @on-item-click="gotobooking()">球场预订</button-tab-item>
				<button-tab-item @on-item-click="gotodiscount()">特惠时段</button-tab-item>
				
			</button-tab>
			</div>
			
			<div style="border-top: 1px gainsboro solid;border-bottom: 1px gainsboro solid;">
				<flexbox :gutter="0" wrap="wrap" class="filter" >
					<flexbox-item :span="1/5" ><div style="border-right:1px solid gainsboro;font-size: 1em;text-align: center;color: #2baaed;padding-left: 20%;" @click='gotomap'>{{cityname}}&nbsp;<img src="../../../static/towardstheright.png" style="vertical-align: middle;width: 10%; ">&nbsp;</div></flexbox-item>
					<flexbox-item :span="2/7" ><div id="distance" @click="courtfilter(0)" style="border-right:1px solid gainsboro;font-size: 1em;text-align: center;color: #2baaed;"><span>距离最近</span>&nbsp;&nbsp;<img src="../../../static/down2.png" style="vertical-align: middle; width: 10%;"></div></flexbox-item>
					<flexbox-item :span="2/7" ><div id="price" @click="courtfilter(1)" style="border-right:1px solid gainsboro;font-size: 1em;text-align: center;"><span>价格选择</span>&nbsp;&nbsp;<img src="../../../static/down1.png" style="vertical-align: middle; width: 10%;"></div></flexbox-item>
					<flexbox-item :span="1/5"> <div  id="courttype" @click="courtfilter(2)" style="font-size: 1em;text-align: center;">&nbsp;<span>筛选</span>&nbsp;<img src="../../../static/down1.png" style="vertical-align: middle;width: 15%; "></div></flexbox-item>
				</flexbox>
				</div>
			
			
			
			
			
				<div style="overflow-y: auto;height:79%;width:100%;overflow-x: hidden;background-color: white;position:absolute;-webkit-overflow-scrolling: touch; " id='booking_nav'>
				
				
				<flexbox orient="vertical" :gutter="0" >
				<flexbox-item >
			 	
			 <flexbox orient="vertical" :gutter="0" style="padding: 1%;margin-bottom:0%" v-for="item in bookinglist">
					 <flexbox-item style="padding-left: 4%;">
					 	<div  @click="gotocourtdetail(item)" style="border-bottom: 0.5px gainsboro solid;margin-top: 2%;">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item  ><div style="width:60%;height: 7em;"><img :src="item.shopImg" style="width:100%;height:6em;border-radius: 0.5em;"></div></flexbox-item>
							<flexbox-item   >
								<div style="margin-top: -5%;font-size: 0.95em;margin-left: -35%;">
								<div style="margin-bottom: 3%;font-size: 1.1em;font-weight: bolder;">{{item.shopName}}</div>
								<div style="margin-bottom: 1%;color: gray;">
								<span v-if="item.tbPdmCourt.courtType==1">山地类型</span> 
								<span v-if="item.tbPdmCourt.courtType==2">森林类型</span> 
								<span v-if="item.tbPdmCourt.courtType==3">林克斯类型</span> 
									| <span>{{item.tbPdmCourt.courtArea}}码</span> |&nbsp;<span>{{item.tbPdmCourt.holeNumber}}洞</span></div>
								
							    <div style="float: left;text-align: center;vertical-align: middle;"><img src="../../../static/location2.png" style="float: left;vertical-align:middle;width: 14%;margin-top: 2.5%;"><span style="font-size: 0.9em;color:darkgray;">  距离您{{parseInt(item.distance)}}公里</span></div>
								<div style="color: red;float:right;font-size: 1.3em;margin-right: 15%;" v-for='(i,index) in item.tbPdmShopSpecs' v-if="index==0"><span style="font-size: 0.8em;">&#65509;</span>{{i.promotePrice}}<span style="font-size: 0.7em;color:gray;">起</span></div>
								
								</div>
							</flexbox-item>
						</flexbox>
						</div>
						<!--<hr style="width: 100%;">-->
					</flexbox-item>
					
					
			 </flexbox>
				
			</flexbox-item>		
					</flexbox>
					
				<load-more :show-loading="true" background-color="#fbf9fe" v-if='isshow==true'></load-more>
				<div v-if="listlength==1" class="booking_none">
				<p>暂无信息~</p>
			</div>	
				
					
					
		
				
					
					
					
					
					
					
			
			</div>
		
		
			</div>
				<!--<div style="text-align: center;background-color: #EBEBEB;">亲！到底了~</div>-->	
	<courtfilter ref='showfilter' v-on:child-say="showfilter"></courtfilter>
	<Mapping ref='showmap' v-on:fun="showmap"></Mapping>
</div>
	
</template>

<script>
//	import store from './vuex/store'
import { Flexbox, FlexboxItem,ButtonTab, ButtonTabItem,Divider,LoadMore} from 'vux'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { USERINFO_SIGN } from '../../store/userinfo'


export default {

  components: {
    Flexbox, 
    FlexboxItem,
    ButtonTab, 
    ButtonTabItem,
    Divider,
    LoadMore,
    Courtfilter:resolve => {require(['./courtfilter.vue'], resolve)},
    Mapping:resolve =>{require(['./map.vue'], resolve)}
  },
  data(){
  	return{
  		tab:0,
  		showbooking:true,
  		bookinglist:[],
  		filterdata:{
  			courtType:'',
  			minPrice:'',
  			maxPrice:'',
  			
  		},
  		listlength:'',
  		 page:1,
      isshow:false,
      nomorelist:false,
      cityname:'',
      
  	}
  },
   computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	...mapState({ mapping: state => state.mapping })
  },

  mounted:function(){
	this.bookingdatadefault();
  	window.addEventListener('scroll',this.isbottom,true);
	this.getlocation();
  	
  	
  },
  methods:{
  	 gotomap(){
    	this.$refs.showmap.isshow=true;
    	this.$refs.showmap.id='1';
    	this.showbooking=false;
    	this.$emit('fun',false);
    	
    	},
		showmap(fun){
			
			this.cityname=fun;
			this.showbooking=true;
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
  	
  	...mapActions([USERINFO_SIGN]),
  	isbottom(){
  		if(this.$route.name=='订场'){
  		var scrollTop=document.getElementById('booking_nav').scrollTop;
  		var offsetHeight=document.getElementById('booking_nav').offsetHeight;
  		var scrollHeight=document.getElementById('booking_nav').scrollHeight;
//		console.log(scrollHeight-scrollTop-offsetHeight);
		if(((scrollHeight-scrollTop-offsetHeight)==5||(scrollHeight-scrollTop-offsetHeight)<5)&&this.nomorelist==false){
			this.isshow=true;
			this.page=this.page+1;
			this.bookingdatadefault();
			
			

			
		}
		}
		
  	},
  	courtfilter(id){
  		
  		this.$refs.showfilter.showfilter=true;
  		this.$refs.showfilter.id=id;
		},
		
	showfilter(val){ /*根据courtfilter页面传回来的值请求接口*/
		var _this=this;
		this.$refs.showfilter.showfilter=false;
		var distance=document.getElementById('distance');
		var price = document.getElementById("price");
		var courttype = document.getElementById("courttype");
		
		if(val.id==0)/*距离最近筛选*/
		{
		distance.children[0].innerHTML=val.condition;
		distance.children[0].style.color="#2baaed";
		price.children[0].style.color="black";
		courttype.children[0].style.color="black";
		distance.children[1].src="../../../static/down2.png";
		price.children[1].src="../../../static/down1.png";
		courttype.children[1].src="../../../static/down1.png";
		
		if(val.condition==='距离最近'||val.condition==='默认'){
				      this.$http({
            method:'GET',    
            url:'/restapi/pdm/shop/getBookList?sortBy=distance&page=1',
            //使用定义的全局变量 用$get()获取
           }).then(function(data){
            //赋值给alllist数组,
           
            var bookinglist = data.data.bookList;
            _this.bookinglist=bookinglist;
            },function(error){
      
        });
			
		}
		
		
		}
		if(val.id==1)/*价格选择筛选*/
		{
		price.children[0].innerHTML=val.condition;
		price.children[0].style.color="#2baaed";
		distance.children[0].style.color="black";
		courttype.children[0].style.color="black";
		distance.children[1].src="../../../static/down1.png";
		price.children[1].src="../../../static/down2.png";
		courttype.children[1].src="../../../static/down1.png";
		this.filterdata.page=1;
		if(val.condition==='价钱最低'){
				      this.$http({
            method:'GET',    
            url:'/restapi/pdm/shop/getBookList?sortBy=price&page=1',
            //使用定义的全局变量 用$get()获取
           }).then(function(data){
            //赋值给alllist数组,
           
            var bookinglist = data.data.bookList;
            _this.bookinglist=bookinglist;
            },function(error){
      
        });
			
		}
		if(val.condition==='默认'){
				      this.$http({
            method:'GET',    
            url:'/restapi/pdm/shop/getBookList?page=1',
            //使用定义的全局变量 用$get()获取
           }).then(function(data){
            //赋值给alllist数组,
           
            var bookinglist = data.data.bookList;
            _this.bookinglist=bookinglist;
            },function(error){
      
        });
			
		}
		else{
		if(/.*[\u4e00-\u9fa5]+.*$/.test(val.condition)&&val.condition.indexOf("以上")>0) {
			 this.filterdata.minPrice=val.condition.replace(/[^0-9]/ig,"");
			 this.filterdata.maxPrice='';
		}
		if(/.*[\u4e00-\u9fa5]+.*$/.test(val.condition)&&val.condition.indexOf("以下")>0) {
			 this.filterdata.maxPrice=val.condition.replace(/[^0-9]/ig,"");
			 this.filterdata.minPrice='';
		}
		if(val.condition.indexOf("-")>0) {
			 var price=val.condition.split('-');
			 this.filterdata.minPrice=price[0];
			  this.filterdata.maxPrice=price[1];
		}
		var filterdata = JSON.stringify(this.filterdata);
		this.$http.post('/restapi/pdm/shop/screen',filterdata)
                .then((response) => {
             var bookinglist = response.data.list;
            _this.bookinglist=bookinglist;
                })
               }
		}
		if(val.id==2)/*筛选*/
		{
		courttype.children[0].innerHTML=val.condition;
		courttype.children[0].style.color="#2baaed";
		distance.children[0].style.color="black";
		price.children[0].style.color="black";
		courttype.children[1].src="../../../static/down2.png";
		price.children[1].src="../../../static/down1.png";
		distance.children[1].src="../../../static/down1.png";
		
		if(val.condition==='山地'){
			
			this.filterdata.courtType='1';
			 this.filterdata.maxPrice='';
			 this.filterdata.minPrice='';
		}
		if(val.condition==='森林'){
			this.filterdata.courtType='2';
			 this.filterdata.maxPrice='';
			 this.filterdata.minPrice='';
		}
		if(val.condition==='林克斯'){
			this.filterdata.courtType='3';
			 this.filterdata.maxPrice='';
			 this.filterdata.minPrice='';
		}
		if(val.condition==='不限'){
			this.filterdata.courtType='';
			 this.filterdata.maxPrice='';
			 this.filterdata.minPrice='';
		}
		var filterdata = JSON.stringify(this.filterdata);
		this.$http.post('/restapi/pdm/shop/screen',filterdata)
                .then((response) => {
             var bookinglist = response.data.list;
            _this.bookinglist=bookinglist;
                })
		
		}
		
	},
  		bookingdatadefault(){
			    var _this = this;
			    var distance = document.getElementById("distance");
			    var price = document.getElementById("price");
			  
			    distance.children[0].src="../../../static/down2.png"
			  price.children[0].src="../../../static/down1.png"
			    distance.style.color="#2baaed";
			    price.style.color="black"

			      this.$http({
            method:'GET',

            url:'/restapi/pdm/shop/getBookList?page='+this.page,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
           
			if(_this.userinfo.userId==undefined){
           	
           	_this.userLogin(_this.userinfo,_this.USERINFO_SIGN);
           }
			var  bookinglist = data.data.bookList;
            if(bookinglist.length==0){
            	
            	_this.nomorelist=true;
            }
            _this.isshow=false;
            _this.bookinglist.push.apply(_this.bookinglist,bookinglist);
            
           
         if(_this.bookinglist.length==0){
            	_this.listlength=1;
            }
			      
        },function(error){
//        alert("error");
        });
    
    },
    bookingdataprice(){
			    	var _this = this;
			    
               var distance = document.getElementById("distance");
			    var price = document.getElementById("price");
			     distance.children[0].src="../../../static/down1.png"
			  price.children[0].src="../../../static/down2.png"
			    distance.style.color="black";
			    price.style.color="#2baaed"
			      this.$http({
            method:'GET',
//           url:'/restapi/pdm/shop/getBookList?sortBy=price&ad=asc',
            url:'/restapi/pdm/shop/getBookList?sortBy=price&ad=asc',
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
           
            var bookinglist = data.data.bookList;
            _this.bookinglist=bookinglist;

			      
        },function(error){
//        alert("error");
        });
    
    },
  	gotobooking(){
  		this.$router.push('/home/booking');
  	},
  	gotodiscount(){
  		this.$router.push('/home/discount');
  	},
  	gotocourtdetail(item){
  		this.$router.push('/home/courtdetail/'+item.shopId);
  	},
  	},
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/close';
	.booking{
		width: 100%;
		height: 100%;
		background-color: white;
		margin: 0;
		padding: 0;
		font-size: 0.9em;
		
	
		
	}
	.filter{
		text-align: center;
		background-color: white;
		height:2.5em;
		/*margin-top: -4%;*/
		
	}
	.booking_none{
	width: 100%;
	height: 100%;
	text-align: center;
	
	background: url('http://120.24.249.13:38080/userfiles/blocknone.png') no-repeat center;
	background-color: white;
}
.booking_none p{
	padding-top: 100%;
	color: gainsboro;
	padding-left: 10%;
}
	/*button-tab{
		border-radius: 0.1em;
	}*/
</style>
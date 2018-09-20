<template>
	<div class="coursesearch">
		<flexbox orient="vertical" :gutter="0">
			
	       <!--搜索框-->
	 <flexbox-item >
			<flexbox :gutter="0" wrap="wrap" style="text-align: center;background-color: white;position: relative;height:4em;">
			<flexbox-item :span="3/4" style="padding-left: 3%;">
			<div > <input placeholder="请输入球场名搜索订场/旅游" id="myinput1" v-model="dir"></div>	
			
			<div class="search" @click="showsearch"><img src="../../../static/search.png"></div>
			</flexbox-item>
			
    		<flexbox-item :span="1/5" style="">
    		<div style="text-align:center;color:#2baaed;padding-left: 10%;" @click="showsearch">搜索</div>
    		
    			
    		</flexbox-item>
    		</flexbox>
    	</flexbox-item>
    		
    	</flexbox-item>
    		
    		
    	<flexbox orient="vertical" :gutter="0" style='padding-top: 2%;padding-bottom: 5%;'v-if="showsearch_his==1">
    		<flexbox-item style="background-color: white;margin-top: 1%;width:94%;border-radius:3px;" >
			<div style="padding:2%;border-bottom: 1px gainsboro solid;" @click="showsearch"><img src="../../../static/golfcourseHoleOne.png" style="vertical-align: middle;">&nbsp;<span style="color: #2baaed;">{{dir}}</span>&nbsp;的相关球场</div>
    		</flexbox-item  >
    		
    			
    			
    			
    		<!--搜索内容-相关球场-->
    		
    		
    		<flexbox-item  style="text-align: center;border-radius:3px;background-color: white;height:auto;width:94%;font-size: 1.2em;">
    		
    		<div @click='gotocourt(item)' v-for="item in searchdata">
    		<flexbox orient="vertical" :gutter="0"  >
    			
    			
    		
    		
    		<flexbox-item >
    			
    			<flexbox :gutter="0" wrap="wrap" style="padding:2%;">
    				<flexbox-item :span="3/5"><div style="font-size: 0.8em;"><span style="color: #2baaed;">{{item.shopName}}</span>球场</div></flexbox-item>
    			<flexbox-item :span="2/5"><div style="color: red;float: right;padding-right: 15%;"><span style="font-size: 0.8em;">&#65509;</span>{{item.minPromotePrice}}<span style="font-size: 0.5em;color:black"">起</span></div></flexbox-item>
    			
    			</flexbox>
    		</flexbox-item>
    		
    		<flexbox-item >
    			<div style="border-bottom: 1px gainsboro solid;" >
    			<flexbox :gutter="0" wrap="wrap" style="padding-bottom: 5%;padding-left: 2%;">
    				<flexbox-item :span="1/9"><div style="font-size:0.6em;border: 1px #2baaed solid;text-align: center;border-radius: 0.5em;color: #2baaed;">
    					{{item.tbPdmCourt.holeNumber}}洞
    				</div></flexbox-item>
    			<flexbox-item :span="1/3"><div style="font-size:0.6em;border: 1px #2baaed solid;text-align: center;border-radius: 0.5em;color: #2baaed;margin-left: 8%;">果  僮  车  柜  险</div></flexbox-item>
    			
    			</flexbox>
    			</div>
    		</flexbox-item>
    		
    		
    		
    		
    		
    		
    		</flexbox>
    		</div>
    		
    		</flexbox-item>
    		
    		
    		
    		<flexbox-item style="width:94%;border-radius:3px;background-color: white;margin-top: 3%;border-bottom: 1px gainsboro solid;" @click="showsearch">
			<div style="padding:2%;" @click="showsearch"><img src="../../../static/traveling.png" style="vertical-align: middle;margin-top: -2%;">&nbsp;<span style="color: #2baaed;">{{dir}}</span>&nbsp;相关旅游产品</div>
    		</flexbox-item  >
    		<!--搜索内容-相关产品-->
    		<flexbox-item  style="text-align: center;border-radius:3px;background-color: white;height:auto;width:94%;padding-bottom: 4%;">
    		
    		
    		<p style="padding-top: 5%;">暂无产品</p>
    		
    		
    		
    		
    		</flexbox-item>
    		<flexbox-item style="text-align: center;color: grey;font-size:0.8em;">亲！没有更多了啦~</flexbox-item>
    		</flexbox>
    		
    		<div>
    			<p v-if="showsearch_his==0" style="margin-top: 180%;">您还没有搜索结果</p>
    		</div>
    		</flexbox-item>
    		
    		
    		
    		
    		
    		
    		
		</flexbox>
		
		
	</div>
</template>

<script>
	import {XHeader,Flexbox, FlexboxItem} from 'vux'
	export default{
		components:{
			XHeader,Flexbox, FlexboxItem
		},
		data(){
			return{
			  dir:'',
			  searchdata:[],
			  showsearch_his:"0",
			}
		},
		
		methods:{
			gotocourt(item){
				this.$router.push('/home/courtdetail/'+item.shopId);
			},
			showsearch(){
				var search= document.getElementById("myinput1");
				var cont = search.value;
				
				this.dir=cont;
				var _this = this;
			    

			      this.$http({
            method:'GET',
       
            url:'/restapi/pdm/shop/getShop?search='+cont,
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
          	_this.showsearch_his=1;
            var searchdata = data.data.result;
            _this.searchdata=searchdata;

			      
        },function(error){
        alert("error");
        });
				
			},
			gotohome(){
				this.$router.push('/home');
			}
		},
	}
</script>

<style>
	.coursesearch{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	#myinput1{
	width:100%;
	border:1px #ebebeb solid;
	height: 2em;
	border-radius: 10px;
	font-size: 1em;
	color: black;
	text-align: left;
	text-indent: 2%;
	 outline: none;
	 background-color: #ebebeb;
}
.search{
	 
	 position: absolute;
	 top:35% ;
	 right:23%;
}
#myinput1 input[placeholder] { 
color:black !important; 
padding-left: 2%;
}

</style>
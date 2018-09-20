<template>
	<div class="blockdetail_nav" id='blockdetail_nav'>
		<div >
			<swiper loop :list="baselist" auto style="width:100%;margin:0 auto;" height="9em" dots-class="custom-bottom" dots-position="center"></swiper>
		</div>
		
		<!--包场活动-->
		<div style="">
		<div v-for="(item,index) in bpList">
			
		<flexbox orient="vertical" :gutter="0"  class="blockdetail-box" >
			
			<flexbox-item >
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item >
						<div  ><img src="../../../static/blocktitle.png" style="width: 30%;height: 103%;margin-left: 2%;"></div>
					</flexbox-item>
					
					
				</flexbox>
			</flexbox-item>
			
			<flexbox-item >
				<flexbox orient="vertical" :gutter="0"   >
					<flexbox-item >
						
						<div class="flex-block_blockdetail" v-if="item.bpImg!=null&&item.bpImg!=''"><img :src="item.bpImg"></div>
						<div class="flex-block_blockdetail" v-if="item.bpImg==null||item.bpImg==''"><img src="../../../static/baochang.png"></div>
					</flexbox-item>
			
			
					
					<flexbox-item >
						
					<div style="padding-left: 4%;" :id='index'></div>
					</flexbox-item>
					
			
			<flexbox-item >
				<flexbox wrap="wrap" :gutter="0" style="padding-left: 4%;">
				<flexbox-item ><div style="font-size: 0.8em;color: grey;">活动日期：{{rerdatereal(item.activityDate)}}</div></flexbox-item >
				

				<flexbox-item ><div style="color: red;font-size: 1.1em;float: right;margin-right: 15%;"><span style="font-size: 0.8em;">&#65509;</span>{{item.minPrice}}<span style="color: grey;font-size: 0.6em;">起</span></div></flexbox-item >
				</flexbox>
			</flexbox-item>
					
					
		
		<flexbox-item >
				
			<div style="color:gray;padding-left: 4%;color: darkgray;" >已报名：<span style="color: #2baaed;">{{item.joinNumber}}人</span> <progress :value="item.joinNumber" :max="item.maxJoinNumber" ></progress></div>
	     	<div style="float: right;font-size: 0.9em;border: 1px #2baaed solid; height:2em;line-height:2em;width: 5em;border-radius: 0.5em;color: #2baaed;text-align:center;margin-right: 3%;margin-bottom: 5%;" @click=" gotopurchasedetail(item)">立即报名</div>
		</flexbox-item>
			</flexbox>
		</flexbox-item >
</flexbox>

</div>
</div>
<load-more :show-loading="true" background-color="#fbf9fe" v-if='isshow==true' style='padding-bottom: 10%;margin-top: -0.3%;'></load-more>
<div v-if="reach_bottom==true" style="padding-bottom: 18%;text-align: center;background-color: #ebebeb;color: gray;"><divider>亲！到底了~</divider></div>	


<div v-if="listlength==1" class="block_none">
	<p>暂无包场信息~</p>
</div>		
		
		
		
		
		
		
		
		
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { USERINFO_SIGN } from '../../store/userinfo'
	import { mapState } from 'vuex'
	import {Flexbox, FlexboxItem, Cell,Swiper,XProgress,Divider,LoadMore} from 'vux'
	export default{
		data(){
			return{
				baselist:[],
				
                bpList:[],
                listlength:'',
                page:1,
			    isshow:false,
			    nomorelist:false,
			    reach_bottom:false,
			}
		},
		
	computed: {
  	...mapState({ userinfo: state => state.userinfo }),
  	
  },	
	components:{Flexbox, FlexboxItem, Cell,Swiper,XProgress,Divider,LoadMore},
	mounted(){
		this.detailshuffling();
		this.bpdata();
		window.addEventListener('scroll',this.isbottom,true);
		
	},
	updated(){
		this.writetitle(this.bpList,0,'包场');
	},
		methods:{
			...mapActions([USERINFO_SIGN]),
			isbottom(){
				if(this.$route.name=='乐高包场'){
		  		var scrollTop=document.getElementById('blockdetail_nav').scrollTop;
		  		var offsetHeight=document.getElementById('blockdetail_nav').offsetHeight;
		  		var scrollHeight=document.getElementById('blockdetail_nav').scrollHeight;
				console.log(scrollHeight-scrollTop-offsetHeight);
				if(((scrollHeight-scrollTop-offsetHeight)==5||(scrollHeight-scrollTop-offsetHeight)<5)&&this.nomorelist==false){
					this.isshow=true;
					this.page=this.page+1;
					this.bpdata();
		}
		
		}
  	},
		
			 bpdata:function(){
			    	var _this = this;
			    

			      this.$http({
            method:'GET',
//          url:'/restapi/pdm/bp/closebpList',
             url:'/restapi/pdm/bp/closebpList?page='+this.page,
            
            //使用定义的全局变量 用$get()获取
           
            
        }).then(function(data){
            //赋值给alllist数组,
         if(_this.userinfo.userId==undefined){
           	
           	_this.userLogin(_this.userinfo,_this.USERINFO_SIGN);
           }
			
            var  bpList = data.data.closeBpList;
            if(bpList.length==0){
            	
            	_this.nomorelist=true;
            	_this.reach_bottom=true;
            }
            _this.isshow=false;
            _this.bpList.push.apply(_this.bpList,bpList);
            
           
         if(_this.bpList.length==0){
            	_this.listlength=1;
            }
			      
        },function(error){
          alert("error");
        });
    
    },
			 gotopurchasedetail(item){
				
				
				this.$router.push('/home/blockdetail/'+item.bpId)
			},
			detailshuffling(){
			    	var _this = this;
//			    	/restapi/pdm/bp/bpLbtu
			      this.$http.get('/restapi/pdm/bp/bpLbtu').then(function(res){		    
			       
			       var baselist=res.data.img;
			       for(var i=0;i<baselist.length;i++){
		            	var obj=new Object();
		            	
		            	obj.img=baselist[i];
		            	
		            	_this.baselist.push(obj);
		            }
			      }).catch(function(err) {
			      	alert(2);
			        console.log(err);
			      });
			      },
			rerdatereal(item){
	 	
  	 	
  	 			if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      		var _date=new Date(item.replace(/-/g,'/'));
      		var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var day=dayNames[_date.getDay()];
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
          var _rerdatereal = year+'-'+month+'-'+daytime+"("+day+')';
          return  _rerdatereal;
      		
      	}
      	else{
      		 var _date=new Date(item);
         var month=_date.getMonth()+1;
      		var daytime=_date.getDate();
      		var year=_date.getFullYear();
      		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
      		var day=dayNames[_date.getDay()];
      		if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (daytime >= 0 && daytime <= 9) {
			        daytime= "0" + daytime;
			    }
            var _rerdatereal = year+'-'+month+'-'+daytime+"("+day+')';
          return  _rerdatereal;
      	}
         
  	 	
  	 	

  	 	

      },
		},
	
	}
</script>


	<style lang="less">
@import '~vux/src/styles/1px.less';
.blockdetail_nav{
	background-color: #ebebeb;
	 position: absolute;
	  overflow-y:scroll;
	 overflow-x: hidden;
	 -webkit-overflow-scrolling: touch;
	height:100%;
	width: 100%;
}
.blockdetail-box{
	margin-top:0.4em ;
	
	background-color: white;
	padding-top: 4%;
	
	
}

.flex-block_blockdetail{
  text-align: center;
  color: black;
 /*background-clip: padding-box;*/
 vertical-align: middle;
 padding-top: 2%;
 
}
.flex-block_blockdetail img{
	width:95%;
	height:10em;
	border-radius:5px ;
}

.blockdetail-price{
	color:red;
	text-align: center;
	font-size: 1.1em;
}
.block_none{
	width: 100%;
	height: 100%;
	text-align: center;
	
	background: url('http://120.24.249.13:38080/userfiles/blocknone.png') no-repeat center;
	background-color: white;
}
.block_none p{
	padding-top: 120%;
	color: gainsboro;
	padding-left: 10%;
}
progress {
    width: 40%;
    height: 0.6em;
    border: 1px solid #ebebeb;  
   
    background-color:#ebebeb;
    color:#ebebeb; /*IE10*/
   vertical-align: middle;
}

progress::-moz-progress-bar { background: #0064B4; border-radius:0.6em; }
progress::-webkit-progress-bar { background: #ebebeb; border-radius:0.6em; }
progress::-webkit-progress-value  { background: #2baaed;  border-radius:0.6em;}
</style>